import React from "react";
import "../styles/checkout.css";
import { Container,Row,Col,Form,FormGroup} from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommmonSection from "../components/UI/CommonSection";
import { useSelector } from "react-redux";
const Checkout = () => {

   const totalQty = useSelector((state)=> state.cart.totalQuantity);
   const totalAmount = useSelector((state)=> state.cart.totalAmount);
    return (
       <Helmet title='Checkout'>
        <CommmonSection title='Checkout'/>
        <section>
            <Container>
                <Row>
                    <Col lg='8'>
                       <h6 className="mb-4 fw-bold">Billing Information</h6>
                      <Form className="billing__form ">
                        <FormGroup>
                            <input className="form__length"  type="text" placeholder="Enter your name" />
                        </FormGroup>

                        <FormGroup>
                            <input className="form__length"  type="email" placeholder="Enter your email" />
                        </FormGroup>

                        <FormGroup>
                            <input className="form__length"  type="phone number" placeholder="Phone number" />
                        </FormGroup>
                        
                        
                        <FormGroup>
                            <input className="form__length"  type="text" placeholder="Street address" />
                        </FormGroup>

                        
                        <FormGroup>
                            <input className="form__length" type="text" placeholder="Postal code" />
                        </FormGroup>

                        <FormGroup>
                            <input className="form__length" type="text" placeholder="Country" />
                        </FormGroup>
                      </Form>
                    </Col>
                    <Col lg='4'>
                       <div className="checkout__cart ">
                        <h6>Total Qty: <span>{totalQty} items</span></h6>
                        <h6>Subtotal: <span>${totalAmount}</span></h6>
                        <h6>
                            <span>Shipping: <br />Free shipping</span> <span>$0</span>
                            </h6>
                        <h4>Total Cost: <span>${totalAmount}</span></h4>
                        <button className=" auth__btn w-100" >Place on order</button>
                       </div>
                      
                    </Col>
                </Row>
            </Container>
        </section>
       </Helmet>
     
    )
}

export default Checkout