import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Название класса (Card) должно совпадать с названием компонента в методе map.
// Так React понимает, откуда нужно брать данные, из какого объекта.
// Когда он проходится по строке 7 - находит нужный объект с компонентами.
// Далее, в строке 13, через this берет данные из объекта.

class Card extends React.Component {
		render() {
				return (
						<div className='card'>
								<div className='like'>{this.props.emoji}</div>
								<h6>{this.props.text}</h6>
						</div>
				);
		}
}
// this - это ссылка на объект, который создается при чтении emotions.map.

const emotions = [
  {emoji: '🥮', description: 'Cake'},
  {emoji: '🥑', description: 'Avocado'},
  {emoji: '☕', description: 'Coffee'},
  {emoji: '🍩', description: 'Donut'}
];

ReactDOM.render(
<>
    <h1>Hello from <span className='red'>React</span></h1>
    <div className='wrapper'>
      {/* <div className='card'>🥮</div>
      <div className='card'>🥑</div>
      <div className='card'>☕</div>
      <div className='card'>🍩</div>
      <Card emoji='🥮' text='Cake'/>
      <Card emoji='🥑' text='Avocado'/>
      <Card emoji='☕' text='Coffee'/>
      <Card emoji='🍩' text='Donut'/> */}
      {emotions.map(e => <Card emoji={e.emoji} text={e.description} key={e.emoji}/>)}
    </div>
  </>,
  document.querySelector('#root')
);

// Как это работает?
// Сами данные мы описываем в ReactDOM.render() — то, что нужно отобразить.
// Потом передаем их в функцию render в class Card и говорим, что именно нужно создать в том месте на странице, 
// которое мы указали в ReactDOM.render() - document.querySelector('#root') (в div id=root).
// И функция render() в class Card создает эти карточки.