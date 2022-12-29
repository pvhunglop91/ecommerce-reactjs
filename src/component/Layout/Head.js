import { Link } from "react-router-dom";
import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {useLocation} from "react-router-dom"
function Head(){
    const navigate = useNavigate();
    let check = 1;
    const location = useLocation()
    let params2 = location.pathname;
    function renderLogin(){
        let localLogin = localStorage.getItem("userlogin");
        if(localLogin != null){
            check = 2;
            return (
                <><li><Link to="/account/update"><i className="fa fa-user"></i> Account</Link></li><li><Link to="/login"  id="logout" onClick={function Logout(){localStorage.clear();}} ><i className="fa fa-lock"></i> Logout</Link></li></>
            )
        }else{
            return (
                <><li><Link to="/login"><i className="fa fa-lock"></i> Login</Link></li><li class="nav-item"><Link class="nav-link" to="/register"><i class="fa fa-user"></i> Register</Link></li></>
            )
        }
    }


    useEffect(()=>{
        if(params2.includes("account")==true && check == 1){
            navigate('/login')
        }
    },[])
    


    return(
        <><header id="header">
            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="contactinfo">
                                <ul className="nav nav-pills">
                                    <li><Link to=""><i className="fa fa-phone"></i> +2 95 01 88 821</Link></li>
                                    <li><Link to=""><i className="fa fa-envelope"></i> info@domain.com</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="social-icons pull-right">
                                <ul className="nav navbar-nav">
                                    <li><Link to=""><i className="fa fa-facebook"></i></Link></li>
                                    <li><Link to=""><i className="fa fa-twitter"></i></Link></li>
                                    <li><Link to=""><i className="fa fa-linkedin"></i></Link></li>
                                    <li><Link to=""><i className="fa fa-dribbble"></i></Link></li>
                                    <li><Link to=""><i className="fa fa-google-plus"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 clearfix">
                            <div className="logo pull-left">
                                <Link to="/"><img src="/frontend/images/home/logo.png" alt="" /></Link>
                            </div>
                            <div className="btn-group pull-right clearfix">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        USA
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link to="">Canada</Link></li>
                                        <li><Link to="">UK</Link></li>
                                    </ul>
                                </div>

                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        DOLLAR
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link to="">Canadian Dollar</Link></li>
                                        <li><Link to="">Pound</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 clearfix">
                            <div className="shop-menu clearfix pull-right">
                                <ul className="nav navbar-nav">
                                    {/* <li><Link to=""><i className="fa fa-user"></i> Account</Link></li> */}
                                    {/* <li><Link to=""><i className="fa fa-star"></i> Wishlist</Link></li>
    <li><Link to="checkout.html"><i className="fa fa-crosshairs"></i> Checkout</Link></li> */}
                                    <li><Link to="/cart"><i className="fa fa-shopping-cart"></i> Cart</Link></li>
                                    {renderLogin()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li><Link to="/">Home</Link></li>
                                    <li className="dropdown"><Link to="#">Shop<i className="fa fa-angle-down"></i></Link>
                                        <ul role="menu" className="sub-menu">
                                            <li><Link to="shop.html">Products</Link></li>
                                            <li><Link to="product-details.html">Product Details</Link></li>
                                            <li><Link to="checkout.html">Checkout</Link></li>
                                            <li><Link to="cart.html">Cart</Link></li>
                                            <li><Link to="login.html">Login</Link></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown"><Link to="#" className="active">Blog<i className="fa fa-angle-down"></i></Link>
                                        <ul role="menu" className="sub-menu">
                                            <li><Link to="/blog/list">Blog List</Link></li>
                                            <li><Link to="/blog/detail/4" className="active">Blog Single</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="404.html">404</Link></li>
                                    <li><Link to="contact-us.html">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="search_box pull-right">
                                <input type="text" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        {/* <section id="slider">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <div id="slider-carousel" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#slider-carousel" data-slide-to="0" class="active"></li>
                                    <li data-target="#slider-carousel" data-slide-to="1"></li>
                                    <li data-target="#slider-carousel" data-slide-to="2"></li>
                                </ol>

                                <div class="carousel-inner">
                                    <div class="item active">
                                        <div class="col-sm-6">
                                            <h1><span>E</span>-SHOPPER</h1>
                                            <h2>Free E-Commerce Template</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            <button type="button" class="btn btn-default get">Get it now</button>
                                        </div>
                                        <div class="col-sm-6">
                                            <img src="frontend/images/home/girl1.jpg" class="girl img-responsive" alt="" />
                                            <img src="frontend/images/home/pricing.png" class="pricing" alt="" />
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="col-sm-6">
                                            <h1><span>E</span>-SHOPPER</h1>
                                            <h2>100% Responsive Design</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            <button type="button" class="btn btn-default get">Get it now</button>
                                        </div>
                                        <div class="col-sm-6">
                                            <img src="frontend/images/home/girl2.jpg" class="girl img-responsive" alt="" />
                                            <img src="frontend/images/home/pricing.png" class="pricing" alt="" />
                                        </div>
                                    </div>

                                    <div class="item">
                                        <div class="col-sm-6">
                                            <h1><span>E</span>-SHOPPER</h1>
                                            <h2>Free Ecommerce Template</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            <button type="button" class="btn btn-default get">Get it now</button>
                                        </div>
                                        <div class="col-sm-6">
                                            <img src="frontend/images/home/girl3.jpg" class="girl img-responsive" alt="" />
                                            <img src="frontend/images/home/pricing.png" class="pricing" alt="" />
                                        </div>
                                    </div>

                                </div>

                                <a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="prev">
                                    <i class="fa fa-angle-left"></i>
                                </a>
                                <a href="#slider-carousel" class="right control-carousel hidden-xs" data-slide="next">
                                    <i class="fa fa-angle-right"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
        </section> */}
        </>
    );
}
export default Head;