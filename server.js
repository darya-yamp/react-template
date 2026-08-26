// API-сервер

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Пути к данным
const PRODUCTS_PATH = path.join(__dirname, 'src', 'assets', 'products.json');
const USERS_PATH = path.join(__dirname, 'users.json');

// Инициализация файла пользователей, если его нет
if (!fs.existsSync(USERS_PATH)) {
  fs.writeFileSync(USERS_PATH, JSON.stringify([
    {
      _id: "user_default_123",
      email: "doglover@test.ru",
      password: "password123",
      name: "Хозяин Собаки",
      about: "Люблю своего пса",
      avatar: "https://react-learning.ru/image-compressed/2.jpg"
    }
  ], null, 2));
}

// Вспомогательные функции для чтения/записи
const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeJSON = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Middleware проверки авторизации по токену в заголовках
const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Ошибка 401: Неавторизован (отсутствует токен)' });
  }
  const token = authHeader.replace('Bearer ', '');
  const users = readJSON(USERS_PATH);
  const user = users.find(u => u._id === token);
  
  if (!user) {
    return res.status(401).json({ message: 'Ошибка 401: Неверный или истекший токен' });
  }
  
  req.user = user;
  next();
};

// --- РУТЫ АВТОРИЗАЦИИ И ПОЛЬЗОВАТЕЛЕЙ ---

// Регистрация: POST http://localhost:3001/signup
app.post('/signup', (req, res) => {
  const { email, password, name = "Новый собаковод", about = "Любитель собак" } = req.body;
  const users = readJSON(USERS_PATH);

  if (users.some(u => u.email === email)) {
    return res.status(409).json({ message: 'Пользователь с таким email уже существует' });
  }

  const newUser = {
    _id: `user_${Date.now()}`,
    email,
    password,
    name,
    about,
    avatar: "https://react-learning.ru/image-compressed/2.jpg"
  };

  users.push(newUser);
  writeJSON(USERS_PATH, users);
  res.status(201).json(newUser);
});

// Авторизация: POST http://localhost:3001/signin
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const users = readJSON(USERS_PATH);
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(400).json({ message: 'Неверный email или пароль' });
  }

  res.json({ token: user._id, data: user });
});

// Данные текущего юзера: GET http://localhost:3001/users/me
app.get('/users/me', checkAuth, (req, res) => {
  res.json(req.user);
});

// Обновление профиля: PATCH http://localhost:3001/users/me
app.patch('/users/me', checkAuth, (req, res) => {
  const { name, about } = req.body;
  const users = readJSON(USERS_PATH);
  const user = users.find(u => u._id === req.user._id);

  if (name) user.name = name;
  if (about) user.about = about;

  writeJSON(USERS_PATH, users);
  res.json(user);
});

// --- РУТЫ ТОВАРОВ ---

// Получение списка товаров: GET http://localhost:3001/products
app.get('/products', checkAuth, (req, res) => {
  const products = readJSON(PRODUCTS_PATH);
  const userId = req.user._id;

  const productsWithLikes = products.map(p => ({
    ...p,
    isFavorite: p.likes ? p.likes.includes(userId) : false
  }));

  res.json(productsWithLikes);
});

// Получение одного товара: GET http://localhost:3001/products/:id
app.get('/products/:id', checkAuth, (req, res) => {
  const products = readJSON(PRODUCTS_PATH);
  const product = products.find(p => p._id === req.params.id || p.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ message: 'Товар не найден' });
  }

  res.json({
    ...product,
    isFavorite: product.likes ? product.likes.includes(req.user._id) : false
  });
});

// Переключение лайка: PUT/DELETE http://localhost:3001/products/likes/:id
app.put('/products/likes/:id', checkAuth, (req, res) => {
  const products = readJSON(PRODUCTS_PATH);
  const product = products.find(p => p._id === req.params.id || p.id === Number(req.params.id));

  if (!product) return res.status(404).json({ message: 'Товар не найден' });

  if (!product.likes) product.likes = [];
  if (!product.likes.includes(req.user._id)) {
    product.likes.push(req.user._id);
  }

  writeJSON(PRODUCTS_PATH, products);
  res.json({ ...product, isFavorite: true });
});

app.delete('/products/likes/:id', checkAuth, (req, res) => {
  const products = readJSON(PRODUCTS_PATH);
  const product = products.find(p => p._id === req.params.id || p.id === Number(req.params.id));

  if (!product) return res.status(404).json({ message: 'Товар не найден' });

  if (product.likes) {
    product.likes = product.likes.filter(id => id !== req.user._id);
  }

  writeJSON(PRODUCTS_PATH, products);
  res.json({ ...product, isFavorite: false });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер API запущен по адресу: http://localhost:${PORT}`);
});