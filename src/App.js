/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import {Button, Container, Nav, Navbar, Row, Col, Alert, CardGroup, Card} from 'react-bootstrap';
import bg from './img/bg.png'
import {createContext, lazy, useEffect, useState, Suspense} from "react";
import data from './data'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
// import Detail from "./routes/Detail";
// import Cart from './routes/Cart'
import axios from "axios";
import styled from "styled-components";

const Detail = lazy(() => import("./routes/Detail"));
const Cart = lazy(() => import("./routes/Cart"));

import {useQuery} from "@tanstack/react-query";

export let Context1 = createContext();

function App() {

    useEffect(()=>{
        if (localStorage.getItem('watched') === null){
            localStorage.setItem('watched', JSON.stringify([]))
        }
    },[])

//테스트2
    let [shoes, setShoes] = useState(data);

    let [count, setCount] = useState(0);
    // let count = 0;
    let [loading, setLoading] = useState(false);
    let [재고] = useState([10, 11, 12]);
    let navigate = useNavigate();

    let result = useQuery(['작명'], () => axios.get('https://codingapple1.github.io/userdata.json').then(a => {
        console.log('요청됨')
        return a.data
    }),
        {staleTime : 2000}
    )

    useEffect(()=>{
        console.log('클릭 후 : ' + count);
        if (count > 2) {
            window.alert('상품이 더 없습니다.')
        }
        else {
            setLoading(true);
            axios.get('https://codingapple1.github.io/shop/data' + (count+1) + '.json')
                .then((result)=>{
                    let copy = [...shoes, ...result.data];
                    setShoes(copy);
                    setLoading(false);
                })
                .catch(()=>{
                    console.log('실패함ㅅㄱ')
                    console.log('실패 : ' + count);
                    setLoading(false);
                })
        }
    }, [count])


    return (
        <div className="App">

            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand>ShoeShop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
                        <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
                    </Nav>
                    <Nav className={'ms-auto'}>
                        { result.isLoading && '로딩중' }
                        { result.error && '에러남' }
                        { result.data && result.data.name }
                    </Nav>

                </Container>
            </Navbar>

            {/*<div style={{height: '5%'}}>*/}
                <CardGroup style={{width : '10px'}}>
                    {
                        localStorage.getItem('watched') === null
                        ? null
                        : JSON.parse(localStorage.getItem('watched')).map( (e, i) => {
                            return (
                                <Card key={i} style={{ width: '100px' }}>
                                    <Card.Img variant="top" src={"https://codingapple1.github.io/shop/shoes" + (Number(e)+1) + ".jpg"}/>
                                </Card>
                            )
                        })
                    }
                </CardGroup>
            {/*</div>*/}
            <Suspense fallback={<div>로딩 중...</div>}>
            <Routes>
                <Route path='/' element={
                    <>
                        <div className="main-bg"></div>
                            <Container className="container">
                                <Row className="row">
                                    { shoes.map((a, i) => {
                                        return (<ItemCard style="width : 30%" className={'col-4'}
                                                          key={i} shoes={a} navigate={navigate}/>)
                                    })}
                                </Row>
                            </Container>

                        <button onClick={()=>{
                            setCount(count+1);
                            // count += 1;
                        }}>물품 더보기</button>{' '}{count}

                        {
                         loading === true ?
                             <Alert key={'info'} variant={'info'}>로딩 중...</Alert>
                             : null
                        }
                    </>
                }/>
                <Route path='/detail/:id' element={
                    <Context1.Provider value={ { 재고, shoes } }>
                        <Detail shoes={shoes}/>
                    </Context1.Provider>

                }/>
                <Route path={'/cart'} element={ <Cart/> } />
            </Routes>
            </Suspense>

        </div>
    );
}

let Box = styled.div`
    background: grey;
    padding: 20px;  
`

function EventPage(){
    return(
        <div>
            <h4>오늘의 이벤트</h4>
            <Outlet/>
        </div>
    )
}

function About(){
    return(
        <div>
            <h4>회사정보임</h4>
            <Outlet></Outlet>
        </div>
    )
}


const ItemCard = (props) => {
    return (
        <Col className='col-4'>
            <img style={{cursor:'pointer'}} onClick={()=>{props.navigate('/detail/' + props.shoes.id)}} src={"https://codingapple1.github.io/shop/shoes" + (props.shoes.id + 1) + ".jpg"} width='80%'/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.price}</p>
        </Col>
    )
}

export default App;
