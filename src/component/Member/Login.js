import React, {useState, useEffect} from "react";
import Error from "./Error";
// import Success from "./Success";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login(props){
    const [inputs, setInputs] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state, [nameInput]:value}))
    }
    function validateEmail($email) {
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errorSubmit = {}
        let flag = true;

        if(!validateEmail(inputs.email)){
            if(inputs.email == undefined){
                errorSubmit.email =  "khong duoc de trong email";
                flag = false;
            }else{
                flag = false;
                errorSubmit.email = "dia chi email khong hop le";
            }
        
        }
        
        if(inputs.password == undefined){
            flag = false;
            errorSubmit.password = "khong duoc de trong password"
        }

        if(!flag){
            setErrors(errorSubmit);
        }        

        if(flag){
            const login = {
                'email': inputs.email,
                'password': inputs.password,
                'level': 0,
              };
              axios.post('http://localhost/laravel/public/api/login',  login )
                .then (response => {
                   if(response.data.errors){
                    setErrors(response.data.errors);
                   }else{
                       const accountLocal = {
                        'email': inputs.email,
                        'password': inputs.password,
                        'level': 0,
                        'auth' : response.data.Auth,
                        'token': response.data.success.token
                       }
                       localStorage.setItem("userlogin", JSON.stringify(accountLocal));
                       navigate('/');
                    //    window.location.reload(true);
                   }
                })
        }
    }
    return(
        <div className="col-sm-9 padding-right">       
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Login Member</div>

                        <div className="card-body">
                        <br/>
                        <Error errors = {errors} />
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name="_token" value="PvgKbH1bqThouKNPzYmmu8I6YarwexqRwwpTtQsZ" />
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                    <div className="col-md-6">
                                        <input id="email" type="email" className="form-control " name="email" autocomplete="email" autofocus="" onChange={handleInput} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label for="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                    <div className="col-md-6">
                                        <input id="password" type="password" className="form-control " name="password" autocomplete="current-password" onChange={handleInput} />
                                    </div>
                                </div>
                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button type="submit" className="btn btn-primary">
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;