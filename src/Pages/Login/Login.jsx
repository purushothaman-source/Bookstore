import React from 'react';
import './Login.scss';
import LoginImage from '../../Assets/loginimage.png';
import { TextField, makeStyles, Button, InputAdornment, Input } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import clsx from 'clsx';
import UserService from '../../Services/UserService';
import { withRouter } from 'react-router';

const service = new UserService();


 class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            login: true,
            email: "",
            password: "",
            emailError: false,
            passwordError: false,
            emailErrormsg: "",
            passwordErrmsg: "",
            visibility: true,
            key: "user"
        })
    }

    changeVisibility = () => {
        this.setState({ visibility: !this.state.visibility });
    }
    validationCheck = () => {
        this.setState({
            emailError: false,
            emailErrormsg: '',
            passwordError: false,
            passwordErrormsg: '',
        })
        var valid = true;



        let patter = "^[0-9a-zA-Z]+([.\\-_+][0-9a-zA-Z]+)*@[a-z0-9A-Z]+.[a-z]{2,4}([.][a-zA-Z]{2,})*$";
        let pattern = new RegExp(patter);
        if (!pattern.test(this.state.email)) {
            this.setState({ emailError: true })
            this.setState({ emailErrormsg: "Invalid Email address" })
            valid = false;
        }
        if (this.state.email.length == 0) {
            this.setState({ emailError: true })
            this.setState({ emailErrormsg: "Choose Email address" })
            valid = false;
        }


        if (this.state.password.length == 0) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrormsg: "Enter a password" })
            valid = false;
        }



        return valid;

    }
    changeState = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    changeLogin = () => {
        console.log("im working");
        this.setState({ login: !this.state.login })
    }
    login = () => {
        if (this.validationCheck()) {
            if (this.state.key == "admin") {
                let data = {
                    "email": this.state.email,
                    "password": this.state.password,
                }
                service.adminlogin(data).then((res) => {
                    localStorage.setItem('token', res.data.result.accessToken);
                    console.log(res);
                    console.log(localStorage.getItem('token'));
                    this.props.history.push('/adminpanel');
                }).catch((error) => {
                    console.log(error);
                })
            }
            else {
                let data = {
                    "email": this.state.email,
                    "password": this.state.password,
                }
                service.userlogin(data).then((res) => {
                    console.log(res);
                    localStorage.setItem('usertoken',res.data.result.accessToken);
                    console.log(localStorage.getItem('usertoken'));
                    this.props.history.push('/userdashboard');
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    }


changeKey = () => {
    if (this.state.key == "user")
        this.setState({ key: "admin" })
    else
        this.setState({ key: "user" })
}

render() {

    return (

        <>
            <TextField id="outlined-basic" label="Email Id" variant="outlined"
                    onChange={this.changeState} name="email"
                    margin='dense' helperText={this.state.emailErrormsg} error={this.state.emailError}
            />
            <div>
                <TextField id="outlined-basic" label="Password" variant="outlined" name="password"
                    margin='dense' helperText={this.state.passwordErrormsg} fullWidth error={this.state.passwordError}
                    type={this.state.visibility ? 'text' : 'password'}
                    onChange={this.changeState}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {this.state.visibility ? <Visibility className="end" onClick={this.changeVisibility} />
                                : <VisibilityOff className="end" onClick={this.changeVisibility} />}
                        </InputAdornment>,
                    }}

                /> {this.state.key == "user" ? <span className="span" onClick={this.changeKey}> Admin login </span> : <span className="span" onClick={this.changeKey}> user login</span>}
            </div>

            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>    <div className="line"></div>OR<div className="line"></div></div>
            <Button variant="contained" color="secondary" onClick={this.login}>Login</Button>
            {/* <div>or</div> */}
            <div className="inlineButtons1">
                <Button variant="contained" className='button1' color="primary">Facebook</Button>
                <Button variant="contained" className='button2' color="default"> Google</Button>
            </div>
        </>

    )
}
}
export default withRouter(Login);
