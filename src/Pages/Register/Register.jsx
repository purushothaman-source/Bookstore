import React from 'react';
import { TextField, makeStyles, Button, InputAdornment, Input } from '@material-ui/core';


export default class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = ({
            login: false,
            fullName: "",
            email: "",
            password: "",
            mobile: "",
            fullNameError: false,
            emailError: false,
            passwordError: false,
            mobileError: false,
            fullNameErrormsg: "",
            emailErrormsg: "",
            passwordErrmsg: "",
            mobileErrmsg: "",
        })
    }

    changeState = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
        console.log(`${this.state.fullName}  ${this.state.email}   ${this.state.password}  ${this.state.mobile}`);
    }


    render(){
        return(
            <><TextField
                                id="outlined-basic"
                                label="Fullname"
                                className="textField"
                                variant="outlined"
                                margin='dense'
                                name="fullName"
                                error={this.state.fullNameError}
                                helperText={this.state.fullNameErrormsg}
                                onChange={(e) => this.changeState(e)}
                            /> <TextField
                                    id="outlined-basic"
                                    label="Email "
                                className="textField"

                                    variant="outlined"
                                    margin='dense'
                                    name="email"
                                    onChange={(e) => this.changeState(e)}
                                    error={this.state.emailError}
                                    helperText={this.state.emailErrormsg}
                                /> <TextField
                                    id="outlined-basic"
                                    label="Password"
                                    className="textField"
                                    variant="outlined"
                                    margin='dense'
                                    name="password"
                                    onChange={(e) => this.changeState(e)}
                                    error={this.state.passwordError}
                                    helperText={this.state.passwordErrormsg}
                                /> <TextField
                                    id="outlined-basic"
                                    label="mobile"
                                    variant="outlined"
                                    margin='dense'
                                    className="textField"
                                    name="mobile"
                                    onChange={(e) => this.changeState(e)}
                                    error={this.state.mobileError}
                                    helperText={this.state.mobileErrormsg}

                                />
                                <Button variant="contained"  onClick={(e)=>this.signUp(e)}>Signup</Button> </>
        
        )
} 
}