import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

import React, { Component } from 'react';
import UserService from '../../Services/UserService';

const service = new UserService();


class bookstore extends EventEmitter {
    constructor() {
        super();
        this.books = [];
    }
    storeBooks = (books) => {
        this.books = books;
        return this.books;
    }
    getBooks = () => {
        return this.books;
    }

    addToCart = (productid) => {
        console.log("im calles");
        let data = {
            isCart: true
        }
        service.addtocart(productid, data).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        this.emit("change");
    }

    handleActions(action) {
        switch (action.type) {
            case "ADD_BOOKS_TO_CART": {
                this.addToCart(action.id);
            }
                break;
            case "DELETE_BOOK": {

            }
                break;
            case "GET_BOOKS": {

            }
                break;
            default:
                break;
        }
    }

}

const Bookstore = new bookstore;

dispatcher.register(Bookstore.handleActions.bind(Bookstore));

export default Bookstore;