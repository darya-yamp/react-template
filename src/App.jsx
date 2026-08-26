import React, {useState, useEffect} from 'react';
import Catalog from './pages/Catalog';
import Header from './components/Header/header-index';
import Footer from './components/Footer/footer-index';

/* Аналогичен ReactDOM.render() - здесь описаны данные. */

const App = () => {
    const [goods, setGoods] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('shopUser'));

    // Отображение каталога при авторизации:
    useEffect(() =>{
        // Запрос каталога с товарами с сервера
        fetch('http://localhost:3001/products', {
            headers: {
                'Authorization': `Bearer ${token}` // По токену пользователя
            }
        })
            .then(response => response.json())
            .then(data => setGoods(data));
    }, []);

    console.log(token);

    return <>
            <div className='wrapper'>
                    <Header products={goods} update={setGoods}/>
                    <Catalog goods={goods}/>
                    <Footer/>
            </div>
    </>
}

export default App;