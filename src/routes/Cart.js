import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {type} from "@testing-library/user-event/dist/type";
import {increase, changeName} from "../store/userSlice";
import {changeCount, deleteItem} from "../store";

function Cart() {

    let state = useSelector((state) => state);
    let user = useSelector((state) => state.user )
    let dispatch = useDispatch();

    return (
        <div>
            <h6>{user.name}의 장바구니</h6>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>
                {
                    state.cart.map((e, i)=>(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{e.name}</td>
                            <td>{e.count}</td>
                            <td>
                                <button onClick={()=>{
                                    dispatch(deleteItem(e.id))
                                }}>삭제</button>
                            </td>
                            <td>
                                <button onClick={()=>{
                                    dispatch(changeCount(e));
                                }}>+</button>
                            </td>
                        </tr>
                    ))
                }


                </tbody>
            </Table>
        </div>
    )
}

const CartBody = () => (
    <tr>
        <td>1</td>
        <td>안녕</td>
        <td>안녕</td>
        <td>안녕</td>
    </tr>
)


export default Cart;