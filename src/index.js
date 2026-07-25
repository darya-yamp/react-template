import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

ReactDOM.render(
<>
    <h1>Hello from <span className='red'>React</span></h1>
    <div className='wrapper'>
      <div className='card'>🥮</div>
      <div className='card'>🥑</div>
      <div className='card'>☕</div>
      <div className='card'>🍩</div>
    </div>
  </>,
  document.querySelector('#root')
);