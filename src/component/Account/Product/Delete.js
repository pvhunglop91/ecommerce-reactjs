import axios from 'axios';
import {useParams, useNavigate } from 'react-router-dom';
function Delete(){
    let params = useParams();
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userlogin'))
    let accessToken = userData.token;
    let url = 'http://localhost/laravel/public/api/user/delete-product/' + params.id;
    let config = {
        headers: {
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }   
    axios.get(url, config)
    .then (response => {
        window.location.href = "http://localhost:3000/account/my-product"
     })

}
export default Delete;