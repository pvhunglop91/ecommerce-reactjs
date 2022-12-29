import React, { useState, useEffect, Component } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Comment from './Comments/Comment';
import ListComment from './Comments/ListComment';
function Detail(){
    let params = useParams();
    const [getData, setData] = useState('');    
    const [getID, setID] = useState('');
    const [getCMC, setCMC] = useState('');
    useEffect(() => {
        axios.get('http://localhost/laravel/public/api/blog/detail/' + params.id)
        .then(response =>{
            setData(response.data.data)
            setID(response.data.data.comment)
        })

        .catch(function(error){
            console.log(error)
        })
    }, [])

    const call = (e) =>{
        setID(getID.concat(e))

    }


    const callARA = (e) =>{
        setCMC(e)
    }
    


    function fetchDetail(){
        if(Object.keys(getData).length > 0){
                return(
                    <div class="single-blog-post">
                        <h3>{getData.title}</h3>
                        <div class="post-meta">
                            <ul>
                                <li><i class="fa fa-user"></i> Mac Doe</li>
                                <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                            </ul>
                        </div>
                        <Link to="">
                            <img src={"http://localhost/laravel/public/upload/Blog/image/" + getData.image} alt="" />
                        </Link>
                        <p>{getData.content}</p>
                        <div class="pager-area">
                            <ul class="pager pull-right">
                                <li><Link to="#">Pre</Link></li>
                                <li><Link to="#">Next</Link></li>
                            </ul>
                        </div>
                    </div>
                )
        }
    }

    return(
        <div class="col-sm-9">
            <div class="blog-post-area">
                <h2 class="title text-center">Latest From our Blog</h2>
                {fetchDetail()}
                {/* <div class="single-blog-post">
                        <h3>Girls Pink T Shirt arrived in store</h3>
                        <div class="post-meta">
                            <ul>
                                <li><i class="fa fa-user"></i> Mac Doe</li>
                                <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                            </ul>
                        </div>
                        <Link to="">
                            <img src="/frontend/images/blog/blog-one.jpg" alt="" />
                        </Link>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p> <br/>

                        <p>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <br/>

                        <p>
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p> <br/>

                        <p>
                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                        </p>
                        <div class="pager-area">
                            <ul class="pager pull-right">
                                <li><Link to="#">Pre</Link></li>
                                <li><Link to="#">Next</Link></li>
                            </ul>
                        </div>
                </div> */}
            </div>

            <div class="rating-area">
                <ul class="ratings">
                    <li class="rate-this">Rate this item:</li>
                    <li>
                        <i class="fa fa-star color"></i>
                        <i class="fa fa-star color"></i>
                        <i class="fa fa-star color"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </li>
                    <li class="color">(6 votes)</li>
                </ul>
                <ul class="tag">
                    <li>TAG:</li>
                    <li><Link class="color" to="">Pink <span>/</span></Link></li>
                    <li><Link class="color" to="">T-Shirt <span>/</span></Link></li>
                    <li><Link class="color" to="">Girls</Link></li>
                </ul>
            </div>

            <div class="socials-share">
               <><Link to=""> <img src="/frontend/images/blog/socials.png" alt="" /></Link></>
            </div>

            <ListComment call={getID} callARA={callARA}/>
            <Comment call={call} callARA={getCMC}/>
            {/* <p>{getMess}</p> */}
        </div>
    );
}
export default Detail;