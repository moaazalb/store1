import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommmonSection from "../components/UI/CommonSection";
import { Container,Row,Col } from "reactstrap";
import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";




const Cart = () => {

    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.totalAmount);


    return (
       <Helmet title='Cart'>
        <CommmonSection title='Shopping Cart' />
        <section>
            <Container>
                <Row>
                    <Col lg='9'>
                    {
                      cartItems.length === 0 ? ( <h2 className="fs-4 text-center">No item added to the cart</h2>
                      ) : (
                        <table className="table bordered">
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th >Delete</th>
                        </tr>
                        </thead>

                        <tbody>
                          {
                            cartItems.map((item,index) => (
                             <Tr item={item} key={index}/>
                            ))
                          }
                        </tbody>
                    </table>

                    )}
                 
                    </Col>
                    
                    <Col lg='3'>
                       <div>
                          <h6 className="d-flex align-items-center justify-content-between">Subtotal:</h6>
                          <span className="fs-4 fw--bold">${totalAmount}</span>
                       </div>
                       <p>taxes and shipping will calculate in checkout</p>
                       <div>
                        <button className="buy__btn w-100"><Link to='/shop'>Continue Shopping</Link></button>
                       </div>
                       <button className="buy__btn w-100 mt-3"><Link to='/checkout'>Checkout</Link></button>
                    </Col>
                </Row>
            </Container>
        </section>
       </Helmet>
    )
}

const Tr = ({item}) => {
    const dispatch = useDispatch();
    const deleteproduct = () => {
        dispatch(cartActions.deleteItem(item.id))
    }
    return(
      <tr>
    <td><img src={item.imgUrl} alt="" /></td>
    <td>{item.productName}</td>
    <td>{item.price}</td>
    <td>{item.quantity}</td>
    <td><motion.i 
    onClick={deleteproduct}
    whileTap={{scale:1.2}} 
    class="ri-delete-bin-line"></motion.i></td>
   </tr>  
    );
};

export default Cart