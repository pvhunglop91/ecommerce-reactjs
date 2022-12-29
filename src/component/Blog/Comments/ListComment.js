import { Link } from "react-router-dom";
import React, { useState, useEffect, Component } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
function ListComment(props){

    const getI = (e) => {
        props.callARA(e.target.id)
    }




    function renderComment(){
        if(Object.keys(props.call).length > 0){
            return props.call.map((value, key) => {
                if(value.id_comment == 0){
                    return(
                    <>
                        <li class="media" key={key}>
                            <Link class="pull-left" to="#">
                                <img class="media-object" src={"http://localhost/laravel/public/upload/user/avatar/" + value.image_user} alt="" />
                            </Link>
                            <div class="media-body">
                                <ul class="sinlge-post-meta">
                                    <li><i class="fa fa-user"></i>{value.name_user}</li>
                                    <li><i class="fa fa-clock-o"></i> {value.updated_at}</li>
                                    <li><i class="fa fa-calendar"></i> {value.updated_at}</li>
                                </ul>
                                <p>{value.comment}</p>
                                <a class="btn btn-primary" href={"#" + value.id_user} id={value.id_user} onClick={getI}><i class="fa fa-reply"></i> Replay</a>
                            </div>
                        </li>
                        {
                            props.call.map((index,keys) =>{
                                if(index.id_comment == value.id_user){
                                    return(
                                        <li class="media second-media" keys={keys}>
                                        <Link class="pull-left" to="#">
                                            <img class="media-object" src={"http://localhost/laravel/public/upload/user/avatar/" + index.image_user} alt="" />
                                        </Link>
                                        <div class="media-body">
                                            <ul class="sinlge-post-meta">
                                                <li><i class="fa fa-user"></i>{index.name_user}</li>
                                                <li><i class="fa fa-clock-o"></i> {index.updated_at}</li>
                                                <li><i class="fa fa-calendar"></i> {index.updated_at}</li>
                                            </ul>
                                            <p>{index.comment}</p>
                                            <a class="btn btn-primary" href={"#" + index.id_user} id={index.id_user}><i class="fa fa-reply"></i>Replay</a>
                                        </div>
                                </li>
                                    )
                                }
                            })
                        }
                    </>
                    );
                }
            })
        }
    }


    return(
        <div class="response-area">
        <h2>3 RESPONSES</h2>
        <ul class="media-list">
            {renderComment()}
        </ul>					
    </div>
    )
}
export default ListComment;