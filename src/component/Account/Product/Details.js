import React, {useState, useEffect} from "react";
import axios from 'axios';

import {
    PopupboxManager,
    PopupboxContainer
  } from 'react-popupbox';
import { useNavigate, useParams } from 'react-router-dom';
function Details(){
    let params = useParams();
    const [getDetail, setDetail] = useState('');    
    const [getIMGD, setIMGD] = useState('');
    const [getChange, setChange] = useState('');
    useEffect(() => {
        axios.get('http://localhost/laravel/public/api/product/detail/'+ params.id)
        .then(response =>{
            setDetail(response.data.data)
            setIMGD(JSON.parse(response.data.data.image))
        })

        .catch(function(error){
            console.log(error)
        })
    }, [])
    function ChangeImg(e){
        setChange(e.target.name)
    }
    function openPopupbox() {
        // console.log(getZoom)
        const content = getChange ? <img id="img_main" src={"http://localhost/laravel/public/upload/user/product/13/" + getChange} name={getChange} /> : <img id="img_main" src={"http://localhost/laravel/public/upload/user/product/13/" + getIMGD[1]} name={getIMGD[1]} />
        PopupboxManager.open({
          content,
          config: {
            titleBar: {
              enable: true,
            },
            fadeIn: true,
            fadeInSpeed: 500
          }
        })
      }



    function renderImageProduct(){
        if(Object.keys(getIMGD).length > 0){
            return Object.keys(getIMGD).map((key, value) =>{
                return(
                    <a><img className="choose" src={"http://localhost/laravel/public/upload/user/product/13/small_" + getIMGD[key]} alt="" name={getIMGD[key]}  onClick={ChangeImg}/></a>
                )
            })
        }
    }
    return(
        <div className="col-sm-9 padding-right">
            <div className="col-md-12 padding-right">
                <div className="product-details">
                    <div className="col-sm-5">
                        <img src="http://localhost/laravel/public/upload/icon/sale.png" className="newarrival" alt="" />
                        <div className="view-product">
                            {getChange ? <img id="img_main" src={"http://localhost/laravel/public/upload/user/product/13/larger_" + getChange} name={getChange} /> : <img id="img_main" src={"http://localhost/laravel/public/upload/user/product/13/larger_" + getIMGD[1]} name={getIMGD[1]} />}
                            <a id="img_zoom" onClick={openPopupbox}><h3>ZOOM</h3></a>      

                        </div>
                        <div id="similar-product" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="item active">
                                    {renderImageProduct()}
                                </div>
                            </div>
                            <a className="left item-control" href="#similar-product" data-slide="prev">
                                <i className="fa fa-angle-left"></i>
                            </a>
                            <a className="right item-control" href="#similar-product" data-slide="next">
                                <i className="fa fa-angle-right"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div class="product-information">
                            <h2>Name: {getDetail.name}</h2>
                            <p>Product ID : {getDetail.id} </p>
                            <span>
                                <span>{getDetail.price}$</span>
                            </span>
                            <br/>
                            <span>
                                <span>Sale: {getDetail.sale}$</span>
                            </span>
                            <br/>
                            <p><b>Availability:</b> In Stock</p>
                            <p><b>Condition:</b> 99,99%</p>
                            <p><b>Category: </b>{getDetail.id_category}</p>
                            <p><b>Brand: </b>{getDetail.id_brand}</p>
                            <button type="button" class="btn btn-fefault cart mgr-0">
                                    <i class="fa fa-shopping-cart"></i>
                                    Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <PopupboxContainer />
        </div>
        
    );
}

export default Details;