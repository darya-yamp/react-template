import React, {useState} from 'react';
import {FloatingLabel, Form} from 'react-bootstrap';
import {X, XCircleFill, EyeSlash} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css'
import './modals-style.css';

export default () => {
    return <div className='popup-wrapper'>
        <div className='popup'>
            <X className='popup-close'/>
            <Form>
                <h3 className='form-headline'>Войти в личный кабинет</h3>
                <Form.Group>
                    <Form.Label>Email-адрес:</Form.Label>
                    <Form.Control className='form-controls' type='email' placeholder=''></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Пароль:</Form.Label>
                    <Form.Control className='form-controls' type='password'></Form.Control> 
                </Form.Group>
                <div className='button-wrapper'>
                    <button className='button-signin' type='submit'>Войти</button>
                    <button className='button-signup'>Регистрация</button>
                </div>
            </Form>
        </div>
    </div>
}                                                                                                                                                                                                                                                                                           