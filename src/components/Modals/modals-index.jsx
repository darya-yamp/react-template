import React, {useState} from 'react';
import {FloatingLabel, Form} from 'react-bootstrap';
import {X, XCircleFill, EyeSlash} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css'
import './modals-style.css';

export default ({isActive, changeActive, api, setToken}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Обработчик события для авторизации - обновление токена при вводе email и пароля
    const handler = e => {
        e.preventDefault();
        api.signin({"email": email, "password": password})
            .then(data => {
                // console.log(data);
                // localStorage.setItem('shop-user', data.token);
                // location.reload();
                localStorage.setItem('shop-user', data.token);
                setToken(data.token);
            })
    }

    return <div className={isActive ? 'popup-wrapper active' : 'popup-wrapper'}>
        <div className='popup'>
            <X className='popup-close' onClick={e => {changeActive(false)}}/>
            <Form onSubmit={handler}>

                <h3 className='form-headline'>Войти в личный кабинет</h3>

                <Form.Group>
                    <Form.Label>Email-адрес:</Form.Label>
                    <Form.Control 
                        className='form-controls' 
                        type='email' 
                        placeholder='' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className='label'>Пароль:</Form.Label>
                    <Form.Control 
                        className='form-controls' 
                        type='password' 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <div className='button-wrapper'>
                    <button className='button-signin' type='submit'>Войти</button>
                    <button className='button-signup'>Регистрация</button>
                </div>

            </Form>

        </div>
    </div>
}                                                                                                                                                                                                                                                                                           