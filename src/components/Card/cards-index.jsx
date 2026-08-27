import React from 'react';
import './cards-style.css';

/* Сам компонент. Аналогичен class Card - здесь происходит создание элементов на странице. */
const Card = ({image, text, price}) => { // image, text, price - аргументы пропсов, переданные из App.jsx (cost App).
    const image_style = {
        backgroundImage: `url(${image})` // Изображение товара является фоном подложки.
    };
    return (
        <div className='card'>
            <div className='card__item-image' style={image_style}></div>
            <div className='card__item-price'>{price} ₽</div>
            <div className='card__item-text'>{text}</div>
            <button className='button'>В корзину</button>
        </div> 
    )
}

export default Card;