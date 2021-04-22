import React from 'react';
import Appbar from '../../Components/Appbar/Appbar';
import './Userpanel.scss'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import UserService from '../../Services/UserService';
import Dont from "../../Assets/don't.png";
import Reactbook from '../../Assets/React.png';
import { TextField, makeStyles, Button, InputAdornment, Input } from '@material-ui/core';


const service = new UserService();

class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            age: "",
            _books: [],
            _cartBooks:[]
        })
    }
    handleChange = (event) => {
        this.setState({ age: event.target.value });
    };
    componentDidMount() {
        let token = localStorage.getItem('token');
        service.getAllBooks().then((res) => {
            console.log(res);
            this.setState({ _books: res.data.result });
        }).catch((err) => {
            console.log(err);
        })
        service.getCartItems().then((res) => {
            console.log(res);
            this.setState({ _cartBooks: res.data.result });
        }).catch((err) => {
            console.log(err);
        })
    }
    addToCart =(productid)=>{
        let data = {
            isCart : true
        }
           service.addtocart(productid,data).then((res)=>{
               console.log(res);
           }).catch((err)=>{
               console.log(err);
           })
    }
    addToWishlist =(productid)=>{
        service.addtowishlist(productid).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
 }
 checkItemsinCart = (bookname)=>{
     let check = true;
       this.state._cartBooks.map((val)=>{
           if(val.product_id.bookName == bookname){
               check = false
            }
         })
       return check;
 }

    render() {
        return (
            <>
                < Appbar />
                <div className="usercontent">
                    <div className="inlineheader">
                        <div className="headers">
                            Books
                   </div>
                        <div className="select">
                            <FormControl variant="outlined" >
                                <InputLabel id="demo-simple-select-filled-label">sortbyrelevance</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={this.state.age}
                                    onChange={this.handleChange}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Price : low to high</MenuItem>
                                    <MenuItem value={20}>Price : high to low</MenuItem>
                                    <MenuItem value={30}>Newest Arrivals</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="books">                    {this.state._books.map((book, index) => {

                        return <div className="showbooks">
                            <div className="bookimage">
                                <img src={index % 2 == 0 ? Dont : Reactbook} alt="" />
                            </div>
                            <div className="content">
                                <div className="bookname">{book.bookName}</div>
                                <div className="author">by{book.author}</div>
                                <div className="price">Rs.{book.price}</div>

                                <div className="inlinebuttons">
               {this.checkItemsinCart(book.bookName) ? <><Button variant="contained" className='addtobag' onClick={()=>this.addToCart(book._id) }color="primary">AddtoBag</Button>
                <Button variant="contained" className='wishlist' color="default" onClick={()=>this.addToWishlist(book._id)}>Wishlist </Button></>
            :  <Button variant="contained" fullWidth  className="addedtobag">Added to bag</Button> }
                </div>
                                </div>
                                </div>
                    })
                    }
                    </div>

                </div>
            </>
        )
    }
}
export default UserDashboard;