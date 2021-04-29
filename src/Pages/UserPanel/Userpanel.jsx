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
import Paginations from "@material-ui/lab/Pagination";
import Bookstore from '../../FluxArchitecture/store/bookstore';
import {addToCart, deleteCartItems} from '../../FluxArchitecture/Actions/actions';

const service = new UserService();

class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            age: "",
            _books:[],
            _cartBooks: [],
            postsPerPage:"12",
            currentPage:"1",
        })
    }
    handleChange = (event) => {
        this.setState({ age: event.target.value });
    };
    componentDidMount(){
        console.log("cdm");
        var books=[];
        service.getAllBooks().then((res) => {
        books = res.data.result;
        console.log("api success");
        var boo = Bookstore.storeBooks(books);
        this.setState({_books : boo});   
        }).catch((err) => {
        console.log(err);
        })   
        
        // Bookstore.on("change",this.getBooks);
        let token = localStorage.getItem('token');
        service.getCartItems().then((res) => {
            console.log(res);
            this.setState({ _cartBooks: res.data.result });
        }).catch((err) => {
            console.log(err);
        })
    }
    componentWillMount(){
        Bookstore.on("change",this.getBooks)
    }
    componentWillUnmount(){
        Bookstore.removeListener("change",this.getBooks);
    }
    getBooks=()=>{       
        console.log("rerender");
     this.setState({
         _books:Bookstore.getBooks(),
     })
    }
    addToCart1 = (productid) => {
        addToCart(productid);
        // let data = {
        //     isCart: true
        // }
        // service.addtocart(productid, data).then((res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     console.log(err);
        // })

    }
    addToWishlist = (productid) => {
        service.addtowishlist(productid).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
    checkItemsinCart = (bookname) => {
        let check = true;
        this.state._cartBooks.map((val) => {
            if (val.product_id.bookName == bookname) {
                check = false
            }
        })
        return check;
    }
    changepage = (e,newpage) => {
        console.log("imvdn");
        console.log(e.target.value);
        this.setState({currentPage:newpage});
    };





    render() {
        const LastBook = this.state.currentPage * this.state.postsPerPage;
        const FirstBook = LastBook - this.state.postsPerPage;
        console.log(this.state._books);
        console.log('vfvc',this.state._books);
        const currentBooks = this.state._books.slice(FirstBook, LastBook);
        return (
            <>
                < Appbar show={true} />
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
                    <div className="books">                    {currentBooks.map((book, index) => {

                        return <div className="showbooks">
                            <div className="bookimage">
                                <img src={index % 2 == 0 ? Dont : Reactbook} alt="" />
                            </div>
                            <div className="content">
                                <div className="bookname">{book.bookName}</div>
                                <div className="author">by{book.author}</div>
                                <div className="price">Rs.{book.price}</div>

                                <div className="inlinebuttons">
                                    {this.checkItemsinCart(book.bookName) ? <><Button variant="contained" className='addtobag' onClick={() => this.addToCart1(book._id)} color="primary">AddtoBag</Button>
                                        <Button variant="contained" className='wishlist' color="default" onClick={() => this.addToWishlist(book._id)}>Wishlist </Button></>
                                        : <Button variant="contained" fullWidth className="addedtobag">Added to bag</Button>}
                                </div>
                            </div>
                        </div>
                    })
                    }
                   
                    </div>
                    <div className="paginationBlock">
      <Paginations
        count={Math.floor(this.state._books.length / this.state.postsPerPage + 1)}
        variant="outlined"
        shape="rounded"
        onChange={this.changepage}
      />
    </div>

                </div>
            </>
        )
    }
}
export default UserDashboard;