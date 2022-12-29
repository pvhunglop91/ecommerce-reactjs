import React, { useState, useEffect, Component } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
function Home(){
    const [getProduct, setProduct] = useState('');    

    useEffect(() => {
        axios.get('http://localhost/laravel/public/api/product')
        .then(response =>{
            setProduct(response.data)
        })

        .catch(function(error){
            console.log(error)
        })
    }, [])
    function renderProduct(){
        console.log(getProduct)
        if(Object.keys(getProduct).length > 0){
            return getProduct.data.map((value, key) => {
                let imgCheck = JSON.parse(value.image)
                // console.log(JSON.parse(value.image))
                return(
                    <div className="col-sm-4">
                        <div className="product-image-wrapper" key={key}>
                            <div id="1" className="single-products">
                                    <div className="productinfo text-center">
                                        <img src={"http://localhost/laravel/public/upload/user/product/13/"+imgCheck[0]} alt="" />
                                        <h2>{value.name}</h2>
                                        <sricke>{value.price} $</sricke>
                                        <p>On Sale: {value.sale? value.sale +"$" : value.price + "$"}</p>
                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</Link>
                                    </div>
                                    <div className="product-overlay">
                                        <div className="overlay-content">
                                        <h2>{value.name}</h2>
                                        <p>{value.sale ? value.sale + "$" : value.price + "$"}</p>
                                            <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</Link>
                                        </div>
                                    </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                    <li><Link to={"/detail-product/" + value.id}><i className="fa fa-plus-square"></i>Product Details</Link></li>
                                    <li><Link to="#"><i className="fa fa-plus-square"></i>Add to Compare</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    return(
        <div className="col-sm-9 padding-right">
        <div className="features_items">
            <h2 className="title text-center">Features Items</h2>
            {renderProduct()}
        </div>
        
    </div>
    );
}

export default Home;