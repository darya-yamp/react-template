import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowRight } from "react-bootstrap-icons";
import './main-style.css';

export default () => {
    return <Container className="main__container">
        <Row>
            <Col xs={12} md={6} className="text-container">
                <h1>Всё для ухода<br/>за собакой</h1>
                <p>Гипоаллергенная косметика, био-пакеты для прогулок и игрушки — с доставкой по всей России.</p>
                <a href="" className="button">Каталог <ArrowRight/></a>
            </Col>
            <Col xs={12} md={6}>
                <div className="main__image" style={{backgroundImage: `url(https://cdn.insales-shop.ru/r/Y4YWfK1iFlE/rs:fit:1000:0:1/q:100/plain/images/products/1/4649/941855273/paw_foam2.png@webp)`}}></div>
            </Col>
        </Row>
    </Container>
}