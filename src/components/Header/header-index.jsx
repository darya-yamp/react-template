import React, {useState} from 'react';
import './header-style.css';
import Logo from '../Logo/logo-index';
import {ReactComponent as FavIcon} from '../Header/images/heart-solid-full.svg';
import {ReactComponent as UserIcon} from '../Header/images/user-solid-full.svg';
import {ReactComponent as CartIcon} from '../Header/images/bag-shopping-solid-full.svg';

// Компонент.
export default ({products, update}) => {
		const [text, changeText] = useState(''); // Первоначальное значение состояния.
        const [count, setCount] = useState(0); // Хук для обновления счетчика кол-ва найденных товаров.
        // Обработчик события - состояние. Обязательно имеют атрибут value и onChange. Строятся на каждый тег input/textArea/select/checkbox. 
        const handler = e => {
		    changeText(e.target.value);
            // Поиск по массиву с товарами:
		    const result = products.filter((element => element.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1));
		    setCount(result.length); // Вызываем функцию setCount, чтобы передать в счетчик count количество найденных товаров.
            
            if (!text) {
                update(products);
            } else {
                update(result);
            }
        }
        // Аналогичен class Card - сюда передаются данные, здесь происходит создание элементов на странице.
		return  <>
            <header>
                <Logo/>
                <input type='search' name='search' value={text} onChange={handler}/>
                {/* value связывает значение переменной text с вводом пользователя. */}
                <nav className='navigation'>
                    <a href='' className='header-buttons'>Личный кабинет</a>
                    <a href='' className='header-buttons'>Избранное</a>
                    <a href='' className='header-buttons'>Корзина</a>
                </nav>
            </header>
            <div className='navigation-text'>
                {text ? `По запросу ${text} найдено ${count} товаров` : 'Каталог товаров'}
            </div>
        </>
}

// Все, что мы передали в скобках changeText (e.target.value), автоматически становится новым значением переменной text:
// 1. функция onChange нужна только для того, чтобы изменять значение переменной text. Ей присваивается обработчик;
// 2. в обработчике onChange происходит присвоение значения переменной text.

// Атрибут value={text} дает возможность управлять инпутом: очистить ввод кнопкой, задать подсказку (placeholder).