import React from 'react';
import LoginImage from '../../Assets/loginimage.png';
import { TextField, makeStyles, Button, InputAdornment, Input } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import UserService from '../../Services/UserService';

const service = new UserService();


export default class AdminLogin extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            visibility:true,
            email:"",
            password:""
        }
    }
    changeState =(e)=>{
        let name = e.target.name;
        let value = e.target.value;
         this.setState({[name]:value});
    }
    changeVisibility = () => {
        this.setState({ visibility: !this.state.visibility });
    }
    login =()=>{
        let data ={
            "email":this.state.email,
            "password":this.state.password,
        }
        service.adminlogin(data).then((res) => {
            localStorage.setItem('token',res.data.result.accessToken);
            console.log(res);
            console.log(localStorage.getItem('token'));
            this.props.history.push('/dashboardadmin');
        }).catch((error) => {
            console.log(error);
        })
    }
    render(){
        return(
        <>
        <div className="fullbody">
        <div className="imagebody">
                <img src={LoginImage} style={{ borderRadius: '50%', width: '215px', height: '215px' }} alt="" />
                         <div className="online"> ONLINE BOOK SHOPPING</div></div>
                    <div className="form">
                       <div className="inlinelinks"> <div >Login</div> 
                        <div >Signup</div></div>
                        <TextField id="outlined-basic" label="Email Id" variant="outlined"
                    margin='dense' helperText='Enter Email' name="email" onChange={(e)=>this.changeState(e)}
                />
                <div>
                <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>this.changeState(e)}
                    margin='dense' helperText='Enter Password' fullWidth name="password"
                    type={this.state.visibility ? 'text' :'password'}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {this.state.visibility ? <Visibility className="end" onClick={this.changeVisibility} />
                                : <VisibilityOff className="end" onClick={this.changeVisibility} />}
                        </InputAdornment>,
                    }}
                   
                /><span className="span">Forgetpassword?</span>
                </div>
               
               <div style={{textAlign:'center',display:'flex',flexDirection:'row',justifyContent:'center'}}>    <div className="line"></div>OR<div className="line"></div></div>
                <Button variant="contained" color="secondary" onClick={this.login}>Login</Button>
                {/* <div>or</div> */}
                <div className="inlineButtons1">
                    <Button variant="contained" className='button1' color="primary">Facebook</Button>
                    <Button variant="contained" className='button2' color="default"> Google</Button>
                </div>
                        </div>
                        </div>
        </>)
    }
}