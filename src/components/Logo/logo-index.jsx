import React from 'react';
import './logo-style.css';
import logo from './logo-images/bone-solid-full.svg'

// Компонент. Аналогичен class Card - сюда передаются данные, здесь мы описываем положение элементов с этими данными на странице.
export default () => {
    return <a className='logo' href=''>
        <div>Petshop</div>
    </a>
}