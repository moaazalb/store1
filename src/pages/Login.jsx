import React,{useState}  from "react";
import "../styles/login.css";
import Helmet from "../components/Helmet/Helmet"
import { Container,Row,Col,Form,FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { auth } from "../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const signin = async(e)=> {
        e.preventDefault()
        setLoading(true)
        try{
         const userCredential = await signInWithEmailAndPassword(auth,email,password);
         const user = userCredential.user;
         console.log('user',user);

         setLoading(false)
         toast.success('successfully logged in')
         navigate('/checkout')
        
        
        }catch(error){
           setLoading(false)
           toast.error(error.message)
        }
    }

    return (
       <Helmet title='Login'>
             <section>
                <Container>
                    <Row>
                      {
                        loading ? ( <Col lg='12' className="text-center">
                            <h5 className="fw-bold">Loading......</h5></Col>
                        ) : (
                            <Col lg='6' className="m-auto text-center">
                            <h3 className="fw-bold mb-4">Login</h3>
 
                            <Form className="auth__form" onSubmit={signin}>
                              <FormGroup className="form__group">
                                 <input type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                              </FormGroup>
 
                              <FormGroup className="form__group">
                                 <input type="password" placeholder=" Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                              </FormGroup>
 
                              <button type="submit" className="buy__btn auth__btn">Login</button>
                              <p className="text__form" >Don' t have an account? 
                                  <Link to='/signup'> Create an account</Link>
                                  </p>
                            </Form>
                         </Col>
                      )}
                    </Row>
                </Container>
             </section>
       </Helmet>
    )
}
export default Login