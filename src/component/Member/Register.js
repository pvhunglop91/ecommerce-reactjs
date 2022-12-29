import Error from "./Error";
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Register(props){
    // const [state, setState] = useState({})
    const [inputs, setInputs] = useState('');
    const [errors, setErrors] = useState({});
    const [avatar, setAvatar] = useState('');
    const [file, setFile] = useState('');
    const navigate = useNavigate();
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state, [nameInput]:value}))

    }
    // kiem tra email hop le hay khong
    function validateEmail($email) {
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
    }

    function handleInputFile(e){
        let filess = e.target.files;
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
            setFile(filess[0])
        };
        reader.readAsDataURL(filess[0]);


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errorSubmit = {}
        let flag = true;
        if(inputs.name == undefined){
            flag = false;
            errorSubmit.name = "khong duoc de trong name"
        }

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
        if(inputs.phone == undefined){
            flag = false;
            errorSubmit.phone = "khong duoc de trong phone"
        }

        if(inputs.address == undefined){
            flag = false;
            errorSubmit.address = "khong duoc de trong address"
        }

        if(inputs.country == undefined){
            flag = false;
            errorSubmit.country = "khong duoc de trong country"
        }

        if(file.name == undefined){
            flag = false;
            errorSubmit.file = "Vui long tai avt len";
        }

        // alert(file.name)
        // alert(file.name)
        let checkImg = file.name
        let checkImgs = true;
        if(file.name != undefined){
            let arrImg = ["png", "jpg", "jpeg", "PNG", "JPG"];
            // let checkImg = file['name']
            let filestrPop = checkImg.split(".").pop();
            for(let i = 0; i < arrImg.length; i++){
                if(filestrPop == arrImg[i]){
                    checkImgs = true
                    break;
                }else{
                    checkImgs = false;
                }
            }
            if(file['size'] > (1024*1024)){
                errorSubmit.file = "dung luong anh vuot qua su cho phep"
                flag = false;
            }

            if(!checkImgs){
                errorSubmit.file = "day khong phai la anh"
                flag = false
            }
        }

        if(!flag){
            setErrors(errorSubmit);
        }        

        if(flag){


            const register = {
                'name': inputs.name,
                'email': inputs.email,
                'password': inputs.password,
                'phone': inputs.phone,
                'address': inputs.address,
                'avatar': avatar,   
                'level': 0,
                'country': inputs.country
              };
              
              axios.post('http://localhost/laravel/public/api/register',  register )
                .then (response => {
                   if(response.data.errors){
                    setErrors(response.data.errors);
                   }else{
                    navigate('/login');
                   }
                })
                
        }
    }
    return(
        <div className="col-sm-9 padding-right">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Register Member</div>
                        <div className="card-body">
                            <br/>
                            <Error errors = {errors} />
                            
                            <form enctype="multipart/form-data" onSubmit={handleSubmit}>
                                <input type="hidden" name="_token" value="PvgKbH1bqThouKNPzYmmu8I6YarwexqRwwpTtQsZ"/>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Full Name (*)</label>
                
                                    <div className="col-md-8">
                                    <input  type="text" className="form-control" name="name"  autocomplete="name"
                                        autofocus="" onChange={handleInput}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Email (*)</label>
                
                                    <div className="col-md-8">
                                    <input  type="text" className="form-control " name="email"  autocomplete="email"
                                        autofocus="" onChange={handleInput}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Password (*)</label>
                
                                    <div className="col-md-8">
                                    <input  type="password" className="form-control " name="password" 
                                        autocomplete="password" autofocus="" onChange={handleInput}/>
                                    </div>
                                </div>
                
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Phone</label>
                
                                    <div className="col-md-8">
                                    <input id="phone" type="text" className="form-control " name="phone"  autocomplete="phone"
                                        autofocus="" onChange={handleInput}/>
                                    </div>
                                </div>
                
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Address</label>
                
                                    <div className="col-md-8">
                                    <input id="address" type="text" className="form-control " name="address"  autocomplete="address"
                                        autofocus="" onChange={handleInput}/>
                                    </div>
                                </div>
                                
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Avatar (*)</label>
                
                                    <div className="col-md-8">
                                    <input id="avatar" type="file" className="form-control " name="file" onChange={handleInputFile}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Country (*)</label>
                
                                    <div className="col-md-8">
                                    <select name="country" className="form-control form-control-line" onChange={handleInput}>
                                        <option >Please select</option>
                
                
                                        <option>
                                        Viet Nam
                                        </option>
                                        <option >
                                        USA
                                        </option>
                                        <option>
                                        French
                                        </option>
                                    </select>
                                    </div>
                                </div>
                
                
                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        Register
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
export default Register;