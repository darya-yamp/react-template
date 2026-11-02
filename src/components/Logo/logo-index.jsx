import React from 'react';
import {Link} from 'react-router-dom';
import './logo-style.css';
import logo from './logo-images/bone-solid-full.svg'

// Компонент. Аналогичен class Card - сюда передаются данные, здесь мы описываем положение элементов с этими данными на странице.
export default () => {
    return <Link className='logo' to=''>
        <div>Petshop</div>
    </Link>
}