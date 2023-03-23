import {configureStore, createSlice} from '@reduxjs/toolkit'
import user from './store/userSlice'


// test master branch
let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        changeCount(state, action) {

            state.forEach( e => {
                // e.id === action.payload.id && (e.count += 1)
                if ( e.id === action.payload.id ) { e.count ++ }
                console.log('changeCount 결과 : ' + JSON.stringify(e))
            })
            // map은 왜 안될까..? state를 log 해보니 proxy(Array) 라 뜬다. 이게 뭐지..?
            // 다시 해보니 map도 된다. 근데 => 에 warning 노란밑줄이 뜬다.
            // 검색해보니 map에 return이 없어서 그렇단다. map 자리에 그대로 forEach 쓰면 된단다.

            // for (let i = 0; i < state.length; i++) {
            //     if (state[i].id === action.payload.id) {
            //         state[i].count += 1
            //     }
            // }
        },

        cartAdd(state, action) {
            let cartShoes = action.payload;
            let temp = {id : null, name : null, count : null};
            temp.id = cartShoes.id;
            temp.name = cartShoes.title;
            temp.count = 1;

            let foundState = state.find(e => e.id === temp.id)
            foundState ? state[state.indexOf(foundState)].count += 1
                : state.push(temp);

            // if ( foundState ) {
            //     state[state.indexOf(foundState)].count += 1
            // } else {
            //     state.push(temp)
            // }

            console.log('cartAdd 결과 : ' + JSON.stringify(state))
        },

        deleteItem(state, action) {
            let i = state.findIndex((e)=> e.id === action.payload );
            state.splice(i, 1);
        }
    }
})

export let {changeCount, cartAdd, deleteItem} = cart.actions

export default configureStore({
    reducer : {
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer
    }
})