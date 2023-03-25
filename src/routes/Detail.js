/* eslint-disable */
import {useParams} from "react-router-dom";
import styled from 'styled-components'
import {useContext, useEffect, useRef, useState} from "react";
import {Nav} from "react-bootstrap";
import {Context1} from '../App'
import {cartAdd} from "../store";
import {useDispatch, useSelector} from "react-redux";

let YellowBtn = styled.button`
  background: ${props => props.bg};
  color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`

let Box = styled.div`
    background: grey;
    padding: 20px;  
`

let newBtn = styled.button`
`

function Detail(props) {
    let state = useSelector(state => state )

    let {재고} = useContext(Context1)

    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [num, setNum] = useState('');
    let [danger, setDanger] = useState(false);
    let [tab, setTab] = useState(0)
    let [fadeDetail, setFadeDetail] = useState('');
    let dispatch = useDispatch();
    const cartRef = useRef(state.cart);



    useEffect(()=>{

    }, [])

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setAlert(false);}, 3000)
        return () => clearTimeout(timer)
    }, [])



    useEffect(()=>{
        isNaN(num) === true ?
            window.alert('숫자만 입력하세요')
            : null
    }, )

    useEffect(()=>{
        let foo = setTimeout(()=>{
            setFadeDetail('end');
        }, 100);

        return ()=>{
            clearTimeout(foo);
            setFadeDetail('')
        }
    }, [setFadeDetail])

    let {id} = useParams();

    let foundShoes = props.shoes.find(x=>{return x.id == id})



    useEffect(()=>{
        let arr = localStorage.getItem('watched');
        arr = JSON.parse(arr);
        arr.push(foundShoes.id);
        arr = JSON.stringify([...new Set(arr)])
        localStorage.setItem('watched', arr)
    }, [])

    useEffect(()=>{
        cartRef.current = state.cart
    },[state.cart])



    return (
        <div className={`container start ${fadeDetail}`}>
            {console.log('후우2', Array.isArray(cartRef.current))}
            {
                alert === true
                ? <div className={'alert alert-warning'}>3초 이내 구매시 할인</div>
                : null
            }


            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes" + (foundShoes.id + 1) + ".jpg"} width="100%"/>
                </div>
                <div className="col-md-6">

                    <input onChange={(e)=>{
                        setNum(e.target.value);
                    }}></input>
                    <h4 className="pt-5">{foundShoes.title}</h4>
                    <p>{foundShoes.content}</p>
                    <p>{foundShoes.price}원</p>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch((cartAdd(foundShoes)));
                        // for(let i =0 ; i<10000; i++){
                        //     let a = 0;
                        //     a +=1;
                        // }
                        // console.log( state.cart.find(x=>x.id === foundShoes.id))
                        // console.log( state.cart)
                        // window.alert('장바구니에 ' + foundShoes.title + ' 물품이 ' + (state.cart.find(x=>x.id === foundShoes.id).count + 1 ) + '개 담겨있습니다.');

                        setTimeout(()=>{
                            window.alert(`장바구니에 "${foundShoes.title}" 신발이 ${ cartRef.current.find( x => x.id === foundShoes.id).count }개 담겨있습니다.`);
                        },1)

                        // console.log(foundShoes);
                    }}>주문하기</button>
                    <button onClick={()=>{console.log( cartRef.current.find(x=>x.id === foundShoes.id).count)}}>test</button>
                </div>
            </div>


            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab}/>
        </div>
    )
}

function TabContent({tab}){

    let [fade, setFade] = useState('');
    let {재고} = useContext(Context1);

    useEffect(()=>{
        let a = setTimeout(()=>{setFade('end')}, 10)
        return()=>{
            clearTimeout(a)
            setFade('')
        }
    }, [tab])

    return (
        <div className={`start ${fade}`}>
            { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab] }
        </div>
    )
}

export default Detail;