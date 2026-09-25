import React, {useState, useEffect} from 'react';
import Product from './pages/Product.jsx';
import Catalog from './pages/Catalog';
import Header from './components/Header/header-index';
import Footer from './components/Footer/footer-index';
import Modal from './components/Modals/modals-index';
import Api from './api.js';

/* Аналогичен ReactDOM.render() - здесь описаны данные. */

const App = () => {
    const [data, setData] = useState([]); // Каталог без фильтрации
    const [goods, setGoods] = useState([]); // Каталог с фильтрацией
    const [token, setToken] = useState(localStorage.getItem('shopUser'));
    const [popupActive, changePopupActive] = useState(false);
    const [api, setApi] = useState(new Api(token));

    // Запуск Api - запросов к серверу:
    useEffect(() => {
        console.log('User is changed');
        setApi(new Api(token));
    }, [token])

    /* Старое отображение каталога при авторизации:
    useEffect(() =>{
        // Запрос каталога с товарами с сервера
        fetch('http://localhost:3001/products', {
            headers: {
                'Authorization': `Bearer ${token}` // По токену пользователя
            }
        })
            .then(response => response.json())
            .then(data => {
                setGoods(data);
                setData(data);
            });
    }, []);
    */

    // Отображение каталога при авторизации:
    useEffect(() => {
        if (token) {
            api.getProducts()
                .then(data => {
                    setGoods(data);
                    setData(data);
                });

            // console.log('Данные с сервера:', data);

            api.showProfile()
                .then(data => {
                    console.log("Пользователь", data);
            })
        }
    }, [token])

    return <>
            <div className='wrapper'>
                    <Header products={data} update={setGoods} openPopup={changePopupActive} user={!!token} setToken={setToken}/>
                    <Catalog goods={goods}/>
                    {/* <Product/> */}
                    <Footer/>
            </div>
            {!token && <Modal isActive={popupActive} changeActive={changePopupActive} setToken={setToken}/>}
    </>
}

export default App;