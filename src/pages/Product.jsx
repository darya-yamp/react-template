import React, {useState} from 'react';
import products from '../assets/products.json';
import { Container, Row, Col, Figure, Table, Button, ButtonGroup, Alert } from 'react-bootstrap';
import { Truck } from 'react-bootstrap-icons';

export default () => {
        let product = products[0];
        const [count, setCount] = useState(0);
        const alertStyle = {
            border: 'none'
        }
		return <Container>
			<Row>
                <Col xs={12}>
                    <h1>{product.name}</h1>
                </Col>
                <Col xs={12} md={9}>
                    <Figure>
                        <Figure.Image src={product.picture}/>
                    </Figure>
                </Col>
                <Col xs={12} md={3}>
                    {product.discount && <small><del>{product.price} ₽</del></small>}
                    <div><strong className={product.discount ? 'text-danger' : 'text-dark'}>{Math.ceil(product.price * ((100 - product.discount) / 100))} ₽</strong></div>
                    <Container>
                        <Row>
                            <Col md={6}>
                            <ButtonGroup>
                                <Button variant='light' disabled={!count} onClick={e => setCount(count - 1)}>-</Button>
                                <Button variant='light' disabled>{count}</Button>
                                <Button variant='light' onClick={e => setCount(count + 1)}>+</Button>
                            </ButtonGroup>
                            </Col>
                            <Col md={6}>
                                <ButtonGroup>
                                    <Button variant='warning'>В корзину</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <Alert variant='secondary' className='mt-3' style={alertStyle}>
                            <Row>
                                <Col md={1}>
                                    <Truck/>
                                </Col>
                                <Col>
                                    <small>Доставка по всему миру!</small>
                                </Col>
                            </Row>
                        </Alert>
                    </Container>
                </Col>
                <Col xs={12}>
                    <h2>Описание</h2>
                    <p>{product.description}</p>
                </Col>
                <Col xs={12}>
                    <h2>Характеристики</h2>
                    <Table>
                        <tbody>
                            <tr>
                                <th>Размер</th>
                                <td>{product.size} см</td>
                            </tr>
                            <tr>
                                <th>Цвет</th>
                                <td>{product.color}</td>
                            </tr>
                            <tr>
                                <th>Вес</th>
                                <td>{product.weight} г.</td>
                            </tr>
                            <tr>
                                <th>Польза</th>
                                <td>{product.value}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col xs={12}>
                    <h2>Отзывы</h2>
                </Col>
            </Row>
		</Container>
}