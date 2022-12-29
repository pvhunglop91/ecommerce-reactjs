import Error from "../../Member/Error";
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Update(){
    const [inputs, setInputs] = useState('');
    const [errors, setErrors] = useState({});
    const [avatar, setAvatar] = useState('');
    const [file, setFile] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const getAcc = JSON.parse(localStorage.getItem("userlogin"))
        setInputs({
            token: getAcc.token,
            username: getAcc.auth.name,
            password: getAcc.password,
            avatar: getAcc.auth.avatar,
            email:getAcc.auth.email,
            phone: getAcc.auth.phone,
            address: getAcc.auth.address,
            country: getAcc.auth.country,
            id: getAcc.auth.id
        })
      }, []);

    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state, [nameInput]:value}))
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
        console.log(inputs)
        e.preventDefault();
        let errorSubmit = {}
        let flag = true;
        let checkImg = file.name
        let checkImgs = true;
        if(file.name != undefined){
            let arrImg = ["png", "jpg", "jpeg", "PNG", "JPG"];
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
            const formData = new FormData();    
            formData.append('name', inputs.username);
            formData.append('email', inputs.email);
            formData.append('password', inputs.password);
            formData.append('phone', inputs.phone);
            formData.append('address', inputs.address);
            formData.append('avatar', avatar);
            formData.append('country', inputs.country);
            let url = 'http://localhost/laravel/public/api/user/update/' + inputs.id
            let token = inputs.token;
            let config ={
                  headers: {
                      'Authorization': 'Bearer '+ token,
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Accept': 'application/json'
                  }
              }

            axios.post(url, formData, config )
                .then (response => {
                    console.log(response)
                    if(response.data.errors){
                        setErrors(response.data.errors);
                    }else{
                        console.log(response)
                        navigate('/')
                    }
            })
        }
    }
    return(
        <div className="col-sm-9 padding-right">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Update Member</div>
                        <div className="card-body">
                            <br/>
                            <Error errors = {errors} />
                            
                            <form enctype="multipart/form-data" onSubmit={handleSubmit}>
                                <input type="hidden" name="_token" value={inputs.token}/>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Full Name (*)</label>
                
                                    <div className="col-md-8">
                                    <input  type="text" value={inputs.username} className="form-control" name="username"  autocomplete="name"
                                        autofocus="" onChange={handleInput}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Email (*)</label>
                
                                    <div className="col-md-8">
                                    <input  type="text" value={inputs.email} className="form-control " name="email"  autocomplete="email"
                                        autofocus="" readOnly  onChange={handleInput}/>
                                    </div>
                                </div>
                                {/* <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Password (*)</label>
                
                                    <div className="col-md-8">
                                    <input  type="password" value={inputs.password}  className="form-control " name="password" 
                                        autocomplete="password" autofocus="" onChange={handleInput}/>
                                    </div>
                                </div> */}
                
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Phone</label>
                
                                    <div className="col-md-8">
                                    <input id="phone" value={inputs.phone} type="text" className="form-control " name="phone"  autocomplete="phone"
                                        autofocus="" onChange={handleInput}/>
                                    </div>
                                </div>
                
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Address</label>
                
                                    <div className="col-md-8">
                                    <input id="address" value={inputs.address} type="text" className="form-control " name="address"  autocomplete="address"
                                        autofocus="" onChange={handleInput}/>
                                    </div>
                                </div>
                                
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Avatar (*)</label>
                
                                    <div className="col-md-8">
                                    <input id="avatar"  type="file"  className="form-control " name="file" onChange={handleInputFile}/>
                                    <br/>
                                    <img src={"http://localhost/laravel/public/upload/user/avatar/" + inputs.avatar} width="100px" height="80px"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Country (*)</label>
                
                                    <div className="col-md-8">
                                    <select name="country" value={inputs.country} className="form-control form-control-line" onChange={handleInput}>
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
                                        Update
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
export default Update;