import React from "react";
import Card from '../components/Card/cards-index';

// Аналогичен ReactDOM.render() - здесь описаны данные.
// goods хранит массив, отсортированный по слову поиска с помощью filter.

export default ({goods}) => {
    return <div className='cards-container'>
            {/* <Card/> */}
            {goods.map((e, i) => <Card
                key={i} 
                image = {e.picture} 
                text = {e.name}
                price = {e.price}
            />)}
        </div>
}