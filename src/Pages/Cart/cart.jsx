import React from 'react';
import Appbar from '../../Components/Appbar/Appbar';
import './cart.scss';
import UserService from '../../Services/UserService';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import RemoveCircleOutlineTwoToneIcon from '@material-ui/icons/RemoveCircleOutlineTwoTone';
import { TextField, makeStyles, Button, InputAdornment, Input } from '@material-ui/core';
import Dont from "../../Assets/don't.png";



const service = new UserService();

class CartItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            _cartbooks: [],
            name: "",
            phno: "",
            pincode: "",
            locality: "",
            address: "",
            city: "",
            state: "",
            show: false,
            showOs: false,
            reload:true
        })
    }
    componentDidMount() {
        service.getCartItems().then((res) => {
            console.log(res);
            this.setState({ _cartbooks: res.data.result });
            console.log(JSON.stringify(this.state._cartbooks));
        })
    }
    order = () => {
        let store = [];
        this.state._cartbooks.map((val) => {
            let arr = {
                "product_id": val.product_id._id,
                "product_name": val.product_id.bookName,
                "product_quantity":val.quantityToBuy,
                "product_price":val.product_id.price
            };
            store.push(arr);
        })

        let data = {
            orders: store,
        };
        service.order(data).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
      this.state._cartbooks.map((val)=>{
        this.removeCartId(val._id);
      })
    }
    increment = (productid, quantity) => {
        let data = {
            "quantityToBuy": quantity + 1
        }
        console.log(data, productid);
        service.cartIncrementDecrement(data, productid).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
    changeStates = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }
    decrement = (productid, quantity) => {
        let data = {
            quantityToBuy: quantity - 1
        }
        service.cartIncrementDecrement(data, productid).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
    submitUserDetails = () => {
        let data = {
            "addressType": "Home",
            "fullAddress": `${this.state.name},${this.state.address},${this.state.locality},${this.state.pincode},${this.state.phno}`,
            "city": this.state.city,
            "state": this.state.state
        }
        service.userDetails(data).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        this.setState({ showOs: true });
    }
    showCD = () => {
        this.setState({ show: true });
    }
    removeCartId =(id)=>{
        service.removeCartItem(id).then((res)=>{
            console.log(res);
            this.setState({reload : !this.state.reload})
           this.componentDidMount();
        }).catch((err)=>{
            console.log(err);
        })
    }
    render() {
        return (<>
            <Appbar />
            <div className="cartcontent">
                <div className="cartitems box">
                    <div className="mycart"> My Cart({this.state._cartbooks.length})</div>

                    {this.state._cartbooks.map((val, index) => {
                        return (<div className="part1">
                            <div className="container">  <div>
                                <img src={Dont} alt="" />
                            </div>
                                <div className="items">
                                    <div>{val.product_id.bookName}</div>
                                    <div className="author"> by{val.product_id.author}</div>
                                    <div className="price">Rs.{val.product_id.price}</div>
                                    <div className="inlineicons">
                                        <AddCircleOutlineTwoToneIcon style={{ opacity: 0.4 }} onClick={() => this.increment(val.product_id._id, val.quantityToBuy)} />
                                        <div className="quantity">{val.quantityToBuy}</div>
                                        <RemoveCircleOutlineTwoToneIcon style={{ opacity: 0.4 }} onClick={() => this.decrement(val.product_id._id, val.quantityToBuy)} />
                                        <div className="remove" onClick={()=>this.removeCartId(val._id)}>Remove</div>

                                    </div>
                                </div></div>
                            {this.state._cartbooks.length - 1 == index
                                ? this.state.show ? null : <Button variant="contained" color="primary" onClick={this.showCD}>
                                    Place Order</Button> : null}
                        </div>)

                    })
                    }
                </div>
                <div className="customerdetails box">
                    <div>Customer Details</div>
                    {this.state.show ? <>     <div className="addressfield">
                        <TextField id="outlined-basic" label="Name" variant="outlined"
                            name="name"
                            margin='dense' onChange={this.changeStates}
                        />
                        <TextField id="outlined-basic" label="Phone number" variant="outlined"
                            name="phno"
                            margin='dense' onChange={this.changeStates}
                        /><TextField id="outlined-basic" label="Pin Code" variant="outlined"
                            name="pincode"
                            margin='dense' onChange={this.changeStates}
                        /><TextField id="outlined-basic" label="Locality" variant="outlined"
                            name="locality"
                            margin='dense' onChange={this.changeStates}
                        />
                        <TextField id="outlined-basic" label="address" variant="outlined"
                            name="address" fullWidth className="address"
                            margin="dense" onChange={this.changeStates}
                        /><TextField id="outlined-basic" label="city/town" variant="outlined"
                            name="city"
                            margin='dense' onChange={this.changeStates}
                        />
                        <TextField id="outlined-basic" label="state" variant="outlined"
                            name="state"
                            margin='dense' onChange={this.changeStates}
                        />

                    </div>
                        {this.state.showOs ? null : <Button variant="contained" onClick={this.submitUserDetails}>Continue</Button>} </>
                        : null}</div>

                <div className="cartitems box">
                    <div className="mycart"> Ordersummary</div>
                    {this.state.showOs ?
                        <> {this.state._cartbooks.map((val, index) => {
                            return (<div className="part1">
                                <div className="container">  <div>
                                    <img src={Dont} alt="" />
                                </div>
                                    <div className="items">
                                        <div>{val.product_id.bookName}</div>
                                        <div className="author"> by{val.product_id.author}</div>
                                        <div className="price">Rs.{val.product_id.price}</div>
                                        {/* <div className="inlineicons">
                                        <AddCircleOutlineTwoToneIcon style={{ opacity: 0.4 }} onClick={() => this.increment(val.product_id._id, val.quantityToBuy)} />
                                        <div className="quantity">{val.quantityToBuy}</div>
                                        <RemoveCircleOutlineTwoToneIcon style={{ opacity: 0.4 }} onClick={() => this.decrement(val.product_id._id, val.quantityToBuy)} />
                                        <div className="remove">Remove</div>
                                  
                                    </div> */}
                                    </div></div>
                                {this.state._cartbooks.length - 1 == index
                                    ? <Button variant="contained" color="primary" onClick={this.order}>
                                        CHECKOUT </Button> : null}
                            </div>)

                        })
                        } </> : null}
                </div>

            </div>
        </>)
    }
}
export default CartItems;