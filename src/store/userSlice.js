import {createSlice} from "@reduxjs/toolkit";

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
        changeName(state){
            state.name = 'park' // immer.js의 도움으로 return 문을 안쓰고, 이렇게 바로 바꿀 수 있다
        },
        increase(state, action){
            state.age += action.payload // 변경함수에 파라미터(action)를 쓰는법 * 변경함수를 action 이라고 한다.
        }
    }
})

export let { changeName, increase } = user.actions
export default user