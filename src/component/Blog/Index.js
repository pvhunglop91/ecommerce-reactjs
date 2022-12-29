import React, { useState, useEffect, Component } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
function Index(){
    const [getItem, setItem] = useState('');    

    useEffect(() => {
        axios.get('http://localhost/laravel/public/api/blog')
        .then(response =>{
            setItem(response.data.blog)
        })

        .catch(function(error){
            console.log(error)
        })
    }, [])

    // const handlePageChange = (pageNumber) => {
    // }

    function fetchData(){
        if(Object.keys(getItem).length > 0){
            return getItem.data.map((value, key) => {
                return(
                    <div key={key} className="single-blog-post">
                        <h3>{value.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user"></i> Mac Doe</li>
                                <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                            </ul>
                            <span>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-o"></i>
                            </span>
                        </div>
                        <Link to="">
                            <img src={"http://localhost/laravel/public/upload/Blog/image/"+value.image} alt=""/>
                        </Link>
                        <p>{value.description}</p>
                        <Link  className="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
                </div>
                )
            })
        }
    }
    return(
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {fetchData()}
                <div className="pagination-area">
                    <ul className="pagination">
                        <li><Link to="" className="active">1</Link></li>
                        <li><Link to="">2</Link></li>
                        <li><Link to="">3</Link></li>
                        <li><Link to=""><i className="fa fa-angle-double-right"></i></Link></li>
                    </ul>
			</div>
        </div>
    </div>
    );
}

export default Index;