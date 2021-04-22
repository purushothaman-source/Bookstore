import React from 'react';
import Appbar from '../../Components/Appbar/Appbar';
import './DashboardAdmin.scss';
import { TextField, makeStyles, Button, InputAdornment, Input } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '../../Components/Dialog/dialog';
import UserService from '../../Services/UserService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';


const service = new UserService();

export default class DashboardAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            _books: [],
            search: "",
            key: "add",
            updateBook:[]
        }
    }
    addBook = () => {
        this.setState({ key : "add"})
        this.setState({ open: !this.state.open })
    }
    searchMethod = (value) => {
        this.setState({ search: value })
    }

    upd = () => {
        let token = localStorage.getItem('token');
        service.getAllBooks().then((res) => {
            console.log(res);
            var boo = JSON.stringify(res.data.result);
            this.setState({ _books: res.data.result });
            // console.log(`books ${this.state._books}`);
        }).catch((err) => {
            console.log(err);
        })
    }
    handleClose =()=>{
        this.setState({ open: !this.state.open });        
    }
    update = (book)=>{
        this.setState({ key : "update"})        
        this.setState({ updateBook : book})
        this.setState({ open: !this.state.open })        
    }
    componentDidMount() {
        let token = localStorage.getItem('token');
        service.getAllBooks().then((res) => {
            console.log(res);
            var boo = JSON.stringify(res.data.result);
            this.setState({ _books: res.data.result });
        }).catch((err) => {
            console.log(err);
        })
    }
    delete = (deleteid) => {
        service.deleteBook(deleteid).then((res) => {
            console.log(res);
            console.log("Deleted Successfully");
            this.componentDidMount();
        }).catch((err) => {
            console.log(err);
            console.log("Delete unsuccess");
        })

    }

    render() {
        return (
            <>
                < Appbar search={this.searchMethod} />
                <div className="admincontent">
                    <TableContainer >
                        <Table className="" aria-label="simple table">
                            <TableHead className="tablehead">
                                <TableRow>
                                    <TableCell>BookName</TableCell>
                                    <TableCell align="right">Author</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Price&nbsp;(Rs)</TableCell>
                                    <TableCell align="right">DiscountPrice&nbsp;(Rs)</TableCell>
                                    <TableCell align="center" colspan="2">Actions</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state._books.filter(book => {
                                    if (this.state.search == "") {
                                        return book;
                                    }
                                    else if (book.bookName.toLowerCase().includes(this.state.search.toLowerCase())) {
                                        return book;
                                    }
                                }).map((book, index) => (
                                    <TableRow key={index} className={index % 2 != 0 ? "odd" : "even"} >
                                        <TableCell component="th" scope="row">
                                            {book.bookName}
                                        </TableCell>
                                        <TableCell align="right">{book.author}</TableCell>
                                        <TableCell align="right">{book.description}</TableCell>
                                        <TableCell align="right">{book.quantity}</TableCell>
                                        <TableCell align="right">{book.price}</TableCell>
                                        <TableCell align="right">{book.discountPrice}</TableCell>
                                        <TableCell align="right"><EditOutlinedIcon onClick={()=>this.update(book)} /></TableCell>
                                        <TableCell align="right"><DeleteOutlineIcon onClick={() => this.delete(book._id)} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button variant="contained" className="button" onClick={this.addBook}>
                        <AddIcon />
                    </Button>
                    < Dialog open={this.state.open}  update={this.upd} service={this.state.key}
                    updateBook={this.state.updateBook} aria-labelledby="form-dialog-title" onClose={this.handleClose}/>
                </div>
            </>
        )
    }
}