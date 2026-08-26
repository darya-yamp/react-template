import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav } from 'react-bootstrap';

const links1= [
    {name: 'Каталог', href: '#'},
    {name: 'Акции', href: '#'},
    {name: 'Новости', href: '#'},
    {name: 'Отзывы', href: '#'}
];

const links2 = [
    {name: 'Оплата и доставка', href: '#'},
    {name: 'Часто спрашивают', href: '#'},
    {name: 'Обратная связь', href: '#'},
    {name: 'Контакты', href: '#'}
];

const icons = [
    {name: 'telegram', iconImage: 'tg', href: 'https://web.telegram.org/'},
    {name: 'whatsapp', iconImage: 'wa', href: 'https://web.whatsapp.com/'},
    {name: 'viber', iconImage: 'vb', href: 'https://www.viber.com/ru/'},
    {name: 'instagram', iconImage: 'inst', href: 'https://www.instagram.com/'},
    {name: 'vk', iconImage: 'vk', href: 'https://ya.ru'}
];

const contacts = {
    title: 'Мы на связи',
    phone: '8 (999) 00-00-00',
    phoneLink: 'tel:+7999000000',
    email: 'hello@dogfood.ru',
    emailLink: 'mailto:info@example.com'
};

const logo_style = {
    fontSize: '28px',
    lineHeight: 1,
    padding: 0,
    margin: 0,
    display: 'inline-block'
};

const Footer = () => {
    return (
        <footer className='py-4'>
            <Container className='footer-container'>
                <Row className='gy-3 align-items-start'>
                    {/* Лого */}
                    <Col md={3} xs={12}>
                        <a className='navbar-brand fw-bold' style={logo_style} href="#">Petshop</a>
                    </Col>

                    {/* Ссылки */}
                    <Col md={6} xs={12}>
                        <Row>
                            <Col md={6} xs={12}>
                                <Nav className='flex-column gap-1'>
                                    {links1.map((e) => (
                                        <a className='link' href={e.href} key={e.name}>{e.name}</a>
                                    ))}
                                </Nav>
                            </Col>
                            <Col md={6} xs={12}>
                                <Nav className='flex-column gap-1'>
                                    {links2.map((e) => (
                                        <a className='link' href={e.href} key={e.name}>{e.name}</a>
                                    ))}
                                </Nav> 
                            </Col>
                        </Row>
                    </Col>

                    {/* Контакты */}
                    <Col md={3} xs={12}>
                        <h5 className='contacts-title'>{contacts.title}</h5>
                        <div className='d-flex flex-column gap-1'>
                            <a className='contacts-phone' href={contacts.phoneLink}>{contacts.phone}</a>
                            <a className='contacts-email' href={contacts.emailLink}>{contacts.email}</a>
                        </div>
                        {/* Соцсети */}
                        <Nav className='gap-2 mt-2'>
                            {icons.map((e) => (
                            <a className='text-decoration-none' href={e.href} key={e.name}>{e.iconImage}</a>    
                            ))}
                        </Nav>
                    </Col>

                </Row>
            </Container>
        </footer>
    );
};

export default Footer;