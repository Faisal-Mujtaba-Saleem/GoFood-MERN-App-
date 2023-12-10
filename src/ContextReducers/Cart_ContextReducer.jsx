import React, { createContext, useReducer } from 'react'

export const CartStateContext = createContext();
export const CartDispatchContext = createContext();

const initialState = [];

export const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case "ADD":
            return [...state, { ...payload }];

        case "REMOVE":
            return state.filter((cartItem) => { return cartItem.id !== payload.id });

        case "UPDATE":
            let newState = [...state];
            newState.find((cartItem, index) => {
                if (cartItem.id === payload.id) {
                    newState[index] = { ...cartItem, foodQty: parseInt(cartItem.foodQty) + parseInt(payload.foodQty), foodPrice: parseInt(cartItem.foodPrice) + parseInt(payload.foodPrice) }
                    return cartItem;
                }
            })
            return newState;

        case "DROP":
            return [];

        default:
            return state
    }
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export default CartProvider;