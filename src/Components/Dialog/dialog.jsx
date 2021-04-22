import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './Dialog.scss';
import { TextField, makeStyles, Button, InputAdornment, Input } from '@material-ui/core';
import UserService from '../../Services/UserService';

const service = new UserService();


export default class Dialogbox extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = ({
            "bookName": "",
            "author": "",
            "description": "",
            "quantity": "",
            "price": "",
            "discountPrice": "",
            "bookNameErr": false,
            "authorErr": false,
            "descriptionErr": false,
            "quantityErr": false,
            "priceErr": false,
            "discountPriceErr": false,
            "bookNameErrMsg": "",
            "authorErrMsg": "",
            "descriptionErrMsg": "",
            "quantityErrMsg": "",
            "priceErrMsg": "",
            "discountPriceErrMsg": "",
        })
        
    }
    update =(e)=>{
        e.stopPropagation();
        console.log("im cdm");

        if(this.props.service == "update"){
            console.log("im cdm");
            this.setState({bookName:this.props.updateBook.bookName,
                author:this.props.updateBook.author,
                description:this.props.updateBook.description,
                quantity:this.props.updateBook.quantity,
                price:this.props.updateBook.price,
                discountPrice:this.props.updateBook.discountPrice,
            });
        }
    }
   
    
    validationCheck = () => {
        this.setState({
            close: false,
            "bookNameErr": false,
            "authorErr": false,
            "descriptionErr": false,
            "quantityErr": false,
            "priceErr": false,
            "discountPriceErr": false,
            "bookNameErrMsg": "",
            "authorErrMsg": "",
            "descriptionErrMsg": "",
            "quantityErrMsg": "",
            "priceErrMsg": "",
            "discountPriceErrMsg": ""
        })
        var valid = true;
        if (this.state.bookName.length == 0) {
            this.setState({ bookNameErr: true })
            this.setState({ bookNameErrMsg: "Enter Book name " })
            valid = false;
        }

        if (this.state.author.length == 0) {
            this.setState({ authorErr: true })
            this.setState({ authorErrMsg: "Enter Author name " })
            valid = false;
        }

        if (this.state.description.length == 0) {
            this.setState({ descriptionErr: true })
            this.setState({ descriptionErrMsg: "Enter Book description" })
            valid = false;
        }
        if (this.state.quantity.length == !(Number)) {
            this.setState({ quantityErr: true })
            this.setState({ quantityErrMsg: "Enter valid quantity" })
            valid = false;
        }
        if (this.state.quantity.length == 0) {
            this.setState({ quantityErr: true })
            this.setState({ quantityErrMsg: "Enter quantity" })
            valid = false;
        }
        if (this.state.price.length == 0) {
            this.setState({ priceErr: true })
            this.setState({ priceErrMsg: "Enter Book Price" })
            valid = false;
        }
        if (this.state.discountPrice.length == 0) {
            this.setState({ discountPriceErr: true })
            this.setState({ discountPriceErrMsg: "Enter Book discount Price" })
            valid = false;
        }

        let patter = "^[0-9a-zA-Z]+([.\\-_+][0-9a-zA-Z]+)*@[a-z0-9A-Z]+.[a-z]{2,4}([.][a-zA-Z]{2,})*$";
        return valid;

    }

    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
        console.log(this.state.bookName);
    }
    handleClose = () => {
        console.log("im working");
        this.setState({ close: true })
    };
    submit = () => {
        if (this.validationCheck()) {
            let data = {
                "bookName": this.state.bookName,
                "author": this.state.author,
                "description": this.state.description,
                "quantity": this.state.quantity,
                "price": this.state.price,
                "discountPrice": this.state.discountPrice
            }
            let token = localStorage.getItem('token');
            if (this.props.service == "add") {
                service.addBook(data, token).then((result) => {
                    console.log(result);
                    this.props.update();
                    this.props.onClose();
                }).catch((err) => {
                    console.log(err);
                })
            }
            if (this.props.service == "update") {
                service.updateBook(data, this.props.updateBook._id).then((result) => {
                    console.log(result);
                    this.props.update();
                    this.props.onClose();
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }
    render() { 
                
         
        return (
            <>
                <Dialog open={this.props.open}  onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <div className="dialog">
                        <div className="heading" onLoad={(e)=>this.update(e)}>Enter Book Details</div>
                        <><TextField
                            id="outlined-basic"
                            label="bookName"
                            className="textField"
                            variant="outlined"
                            margin='dense'
                            name="bookName"
                            defaultValue={this.props.service == "update" ? this.props.updateBook.bookName : null}
                            onChange={(e) => this.onChange(e)}
                            error={this.state.bookNameErr}
                            helperText={this.state.bookNameErrMsg}
                        /> <TextField
                                id="outlined-basic"
                                label="author "
                                className="textField"
                                defaultValue={this.props.service == "update" ? this.props.updateBook.author : null}
                                variant="outlined"
                                margin='dense'
                                name="author"
                                onChange={(e) => this.onChange(e)}
                                error={this.state.authorErr}
                                helperText={this.state.authorErrMsg}
                            /> <TextField
                                id="outlined-basic"
                                label="description"
                                className="textField"
                                variant="outlined"
                                margin='dense'
                                name="description"
                                onChange={(e) => this.onChange(e)}
                                error={this.state.descriptionErr}
                                helperText={this.state.descriptionErrMsg}
                                defaultValue={this.props.service == "update" ? this.props.updateBook.description : null}

                            />
                            <TextField
                                id="outlined-basic"
                                label="quantity"
                                variant="outlined"
                                margin='dense'
                                className="textField"
                                name="quantity"
                                onChange={(e) => this.onChange(e)}
                                error={this.state.quantityErr}
                                helperText={this.state.quantityErrMsg}
                                defaultValue={this.props.service == "update" ? this.props.updateBook.quantity : null}
                            />
                            <TextField
                                id="outlined-basic"
                                label="price"
                                variant="outlined"
                                margin='dense'
                                className="textField"
                                name="price"
                                onChange={(e) => this.onChange(e)}
                                error={this.state.priceErr}
                                helperText={this.state.priceErrMsg}
                                defaultValue={this.props.service == "update" ? this.props.updateBook.price : null}

                            />
                            <TextField
                                id="outlined-basic"
                                label="discountPrice"
                                variant="outlined"
                                margin='dense'
                                className="textField"
                                name="discountPrice"
                                onChange={(e) => this.onChange(e)}
                                error={this.state.discountPriceErr}
                                helperText={this.state.discountPriceErrMsg}
                                defaultValue={this.props.service == "update" ? this.props.updateBook.discountPrice : null}
                            />

                            {this.props.service == "add" ?
                                <Button variant="contained" className="button" onClick={this.submit}>Submit</Button> :
                                <Button variant="contained" className="button" onClick={this.submit}>Update</Button>}
                            <Button variant="contained" onClick={()=>this.props.onClose()}>cancel</Button>
                        </>
                    </div>
                </Dialog>
            </>
        )
    }
}