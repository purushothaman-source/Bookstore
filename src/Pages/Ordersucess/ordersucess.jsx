import './ordersucess.scss';
import React from 'react';
import Appbar from '../../Components/Appbar/Appbar';
import Order from '../../Assets/order.PNG';
import Order2 from '../../Assets/orderplaced2.png';
import Footer from '../../Components/Footer/footer';

export default class OrderSucess extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                < Appbar />
                <div className="orderbody">
                    <div className="image">
                        <img src={Order} alt="" />
                    </div>
                    <div className="texts">
                        hurray!!! your order is confirmed the order  id is #12345 save the 
                        order id for further communication   
                    </div>
                    <div className="table">
                        <table>
                            <tr>
                                <th>Email us</th>
                                <th>Contact us</th>
                                <th>Address</th>
                            </tr>
                            <tr>
                                <td>admin@bookstore.com</td>
                                <td>#91 9488806205</td>
                                <td>Chennai, Tamilnadu </td>
                            </tr>
                        </table>
                    </div>

                </div>

                     <Footer />
            </div>
        )
    }

}