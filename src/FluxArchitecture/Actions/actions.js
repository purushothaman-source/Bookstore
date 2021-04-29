import dispatcher from "../dispatcher";

export function addToCart(id) {
    dispatcher.dispatch({
        type:"ADD_BOOKS_TO_CART",
        id
    })    
}

export function deleteCartItems(id) {
    dispatcher.dispatch({
        type:"DELETE_CartITEMS",
        id
    })    
}



