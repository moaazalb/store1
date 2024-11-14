import React,{useRef,useEffect}  from "react";
import "./header.css";

import { motion } from "framer-motion";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png"

import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container,Row } from "reactstrap";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const nav__links = [
    {
    path: 'home',
    display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
        },
        {
            path: 'cart',
            display: 'Cart'
            },
]
const Header = () => {

    const headerRef = useRef(null);
    const totalQuantity = useSelector(state=> state.cart.totalQuantity);


   


    

    const menuRef = useRef(null);
    const navigate = useNavigate();
    const {currentUser} = useAuth();


    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', ()=>{
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop
                 > 80){
                    headerRef.current.classList.add('sticky__header')
                 } else{
                    headerRef.current.classList.remove('sticky__header')
                 }
              }); 
            };

         useEffect(()=> {
        stickyHeaderFunc()

        return ()=> window.removeEventListener('scroll', stickyHeaderFunc)
        });
    
    const menuToogle = () => menuRef.current.classList.toggle('active__menu')    

    const navgateToCart = () => {
       navigate('/cart');
    };
    
   
    const profileActRef = useRef(null);
    const toggleProfileAct = () =>  profileActRef.current.classList.toggle('show__profileActions');
    
    const logout = () => {
        signOut(auth).then(()=>{
            toast.success('Logged out')
            navigate("/home")
        }).catch(err=>{
            toast.error(err.message)
        })
    }
    


    return <header className="header" ref={headerRef}>
      <Container>
        <Row>
            <div className="nav__wrapper">
                <div className="logo">
                    <img src={logo} alt="" />
                        <h1>Ecommerce</h1>
                </div>

                  <div className="navigation"ref={menuRef} onClick={menuToogle}>
                    <ul className="menu">
                      {
                        nav__links.map((item , index) => (
                            <li className="nav__item" key={index}>
                            <NavLink to={item.path} className={(navClass)=>
                                navClass.isActive ? 'nav__active' : ''
                                }
                                >
                                    {item.display}
                                </NavLink>
                        </li>
                        ) ) }
                      
                    </ul>
                  </div>
                     
                   <div className="nav__icons">
                    <span className="fav__icon">
                        <i className="ri-heart-line"></i>
                        <span className="badge">2</span>
                    </span>
                    <span className="cart__icon" onClick={navgateToCart}>
                        <i className="ri-shopping-bag-line"></i>
                        <span className="badge">{totalQuantity}</span>
                    </span>

                    <div className="profile">
                        
                        <motion.img
                         whileTap={{scale:1.2}}
                          src={currentUser ? currentUser.photoURL : userIcon}
                           alt=""
                        onClick={toggleProfileAct}
                           />
                           <div 
                           className="profile__actions"  
                           ref={profileActRef}
                           onClick={toggleProfileAct}
                          >
                            {currentUser ? ( 
                                <span onClick={logout}>Logout</span> 
                            ) : (
                                <div className="d-flex align-items-center justify-content-center flex-column"
                               >
                                <Link to="/signup">Signup</Link>
                                <Link to="/login">Login</Link>
                                <Link to="/dashboard">Dashboard</Link>
                                </div>
                            )}
                           
                           </div>
                    </div>
                    <div className="mobile__menu">
                    <span onClick={menuToogle}>
                        <i className="ri-menu-line"></i>
                    </span>
                   </div>
                </div>
            </div>
        </Row>
      </Container>

    </header>
       
    
}

export default Header