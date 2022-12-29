import { useParams, useLocation, useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
function Comment(props){
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [getAR, setAR] = useState('');
    let params = useParams();
    const handleComment = (e) =>{
        setComment(e.target.value);
        setAR(e.target.id);
    }
    const userData = JSON.parse(localStorage.getItem('userlogin'))
    let url = 'http://localhost/laravel/public/api/blog/comment/' + params.id
    let accessToken = userData.token;
    let config ={
        headers: {
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }

    const handleSubmitComment = () =>{
        if(userData != undefined){
            if(comment){
                const formData = new FormData();
                formData.append ('id_blog', params.id);
                formData.append('id_user', userData.auth.id);
                if(getAR){
                    formData.append ('id_comment', getAR);
                }else{
                    formData.append ('id_comment', 0);
                }
                formData.append ( 'comment', comment);
                formData.append('image_user', userData.auth.avatar);
                formData.append('name_user', userData.auth.name);
        
                axios.post(url, formData, config)
                .then(response => {
                    props.call(response.data.data)
                    // console.log(response.data.data)
                })
            }
            
        }else{
            navigate('/login')
        }


    }
        return(
            <div class="replay-box">
            <div class="row">
                <div class="col-sm-12">
                    <h2>Leave a replay</h2>
                    <div class="text-area">
                        <div class="blank-arrow">
                            <label>Your Comment</label>
                        </div>
                        <span>*</span>
                        <textarea id={props.callARA} name="message" rows="11" onChange={handleComment}></textarea>
                        <button class="btn btn-primary" onClick={handleSubmitComment} to="">Post comment</button>
                    </div>
                </div>
            </div>
        </div>
        )
}
export default Comment;