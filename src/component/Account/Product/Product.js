import React, { useState, useEffect, Component } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
function Product(){

    const [getProduct, setProduct] = useState('');    
    const userData = JSON.parse(localStorage.getItem('userlogin'))
    let accessToken = userData.token;
    let config ={
        headers: {
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
    useEffect(() => {
        axios.get('http://localhost/laravel/public/api/user/my-product', config)
        .then(response =>{
            setProduct(response.data.data)
            // console.log(response)
        })

        .catch(function(error){
            console.log(error)
        })
    }, [])

    function renderProduct(){
        // console.log(typeof getProduct.data)
        // console.log(getProduct)
        if(Array.isArray(getProduct) && getProduct.length > 0){
            return  getProduct.map((value,key) =>{
                let imgCheck = JSON.parse(value.image)
                return(
                    <tr key={key}>
                        <td class="cart_description">
                            <p><Link to="">{value.id}</Link></p>
                        </td>
                        <td class="cart_description">
                            <p><Link to="">{value.name}</Link></p>
                        </td>
                        <td class="cart_product"><Link to=""><img src={"http://localhost/laravel/public/upload/user/product/13/" + imgCheck[0]} alt="" width="110px" /></Link></td>
                        <td class="cart_price">
                            <p>{value.price}$</p>
                        </td>
                        <td class="cart_total">
                            <Link to={"/account/edit-product/" + value.id}>Edit</Link>
                        </td>
                        <td class="cart_total">
                            <Link to={"/account/delete-product/" + value.id}><i class="fa fa-times"></i></Link>
                        </td>
                    </tr>
                )
            })
        }

        if(typeof getProduct === 'object' && Object.keys(getProduct).length > 0){
            return  Object.keys(getProduct).map((key, index) => {
                // ten[key]
                let imgCheck2 = JSON.parse(getProduct[key].image)
                return(
                    <tr key={key}>
                        <td class="cart_description">
                            <p><Link to="">{getProduct[key].id}</Link></p>
                        </td>
                        <td class="cart_description">
                            <p><Link to="">{getProduct[key].name}</Link></p>
                        </td>
                        <td class="cart_product">
                            <Link to=""><img src={"http://localhost/laravel/public/upload/user/product/13/" + imgCheck2[0]} alt="" width="110px" /></Link>
                            </td>
                        <td class="cart_price">
                            <p>{getProduct[key].price}$</p>
                        </td>
                        <td class="cart_total">
                            <Link to={"/account/edit-product/" + getProduct[key].id}>Edit</Link>
                        </td>
                        <td class="cart_total">
                            <Link to={"/account/delete-product/" + getProduct[key].id}><i class="fa fa-times"></i></Link>
                        </td>
                    </tr>
                )
            })
        }
    }

    
    return(
        <div className="col-sm-9">
            <div class="table-responsive cart_info">
                <table class="table table-condensed">
                    <thead>
                        <tr class="cart_menu">
                            <td class="description">ID</td>
                            <td class="description">Name</td>
                            <td class="image">Image</td>
                            <td class="price">Price</td>
                            <td class="total">Action</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderProduct()}
                    </tbody>
                    
                </table>
                <Link class="btn btn-default check_out pull-right"  to="/account/add-product">Add Product</Link>
            </div>
    </div>
    )
}
export default Product