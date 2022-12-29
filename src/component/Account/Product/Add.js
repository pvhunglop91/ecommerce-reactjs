import React, { useState, useEffect, Component } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Error from '../../Member/Error';
function Add(){

    const [getC, setC] = useState('');    
    const [getB, setB] = useState('');
    const [errors, setErrors] = useState({});
    const [avatar, setAvatar] = useState('');
    const [inputs, setInputs] = useState('');
    const navigate = useNavigate();
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state, [nameInput]:value}))

    }
    useEffect(() => {
        axios.get('http://localhost/laravel/public/api/category-brand')
        .then(response =>{
            setC(response.data.category)
            setB(response.data.brand)
        })

        .catch(function(error){
            console.log(error)
        })
    }, [])

    function renderCategory(){
        if(Object.keys(getC).length > 0){
            return getC.map((value,key) =>{
                return(
                    <option key={key}>
                    {value.category}
                    </option>
                );
            })
        }
    }

    function renderSale(){
        if(inputs.status == "sale"){
            return(
                <><label for="email" className="col-md-4 col-form-label text-md-right">% Sale</label><div className="col-md-8">
                    <input type="text" className="form-control " name="sale" onChange={handleInput}
                        autocomplete="password" autofocus="" />
                </div></>
            )
        }
    }

    
    function renderBrand(){
        if(Object.keys(getB).length > 0){
            return getB.map((value,key) =>{
                return(
                    <option key={key}>
                    {value.brand}
                    </option>
                );
            })
        }
    }

    function handleInputFile(e){
        // let filess = e.target.files;
        setAvatar(e.target.files)
    }

    // console.log(avatar)
    const handleSubmit = (e) => {
        e.preventDefault();
        let errorSubmit = {}
        let flag = true;
        if(inputs.name == undefined){
            flag = false;
            errorSubmit.name = "khong duoc de trong name"
        }
        
        if(inputs.price == undefined){
            flag = false;
            errorSubmit.price = "khong duoc de trong price"
        }
        if(inputs.category == undefined){
            flag = false;
            errorSubmit.category = "khong duoc de trong category"
        }

        if(inputs.brand == undefined){
            flag = false;
            errorSubmit.brand = "khong duoc de trong brand"
        }

        if(inputs.details == undefined){
            flag = false;
            errorSubmit.details = "khong duoc de trong details"
        }

        if(inputs.company == undefined){
            flag = false;
            errorSubmit.company = "khong duoc de trong company"
        }

        if(inputs.status == undefined){
            flag = false;
            errorSubmit.status = "khong duoc de trong status"
        }
        //  console.log(Array.from(avatar))
        if(avatar.length == 0){
            flag = false;            
            errorSubmit.file = "Vui long tai anh len";
        }

        if(avatar.length > 3){
            flag = false;            
            errorSubmit.file = "so luong hinh anh da lon hon 3";
        }

        if(avatar.length != 0){
            let arrImg = ["png", "jpg", "jpeg", "PNG", "JPG"];
            Array.from(avatar).map((value, key) =>{
                let filestrPop = value.name.split(".").pop();
                if(arrImg.includes(filestrPop) == false){
                    errorSubmit.file = "vui long cap nhat lai file"
                    flag = false
                }
                if(value.size > (1024*1024)){
                    errorSubmit.file = "dung luong anh vuot qua su cho phep"
                    flag = false;
                }
            })
           
        }

        if(!flag){
            setErrors(errorSubmit);
        }        

        if(flag){
            const userData = JSON.parse(localStorage.getItem('userlogin'))
            let accessToken = userData.token;
            let url = 'http://localhost/laravel/public/api/user/add-product';
            let config = {
                headers: {
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            }   



            const formData = new FormData();
            getC.map((index2, k) =>{
                if(inputs.category == index2.category){
                    formData.append ('category', index2.id);
                }
            });
            getB.map((index1, j) =>{
                if(inputs.brand == index1.brand){
                    formData.append ('brand', index1.id);
                }
            });
            formData.append ( 'name', inputs.name);
            Object.keys(avatar).map((item, i) =>{
                formData.append('file[]', avatar[item]);
            });

            formData.append('price', inputs.price);
            formData.append('status', inputs.status);

            if(inputs.status == "sale"){    
                formData.append('status', 0);
                formData.append('sale', inputs.sale);
            }else{
                formData.append('status', 1);
            };

            // if(inputs.status == "sale"){
            // }
            
            formData.append('detail', inputs.details);
            formData.append('company', inputs.company);

              
              axios.post(url, formData, config )
                .then (response => {
                   if(response.data.errors){
                    setErrors(response.data.errors);
                   }else{
                    navigate('/account/my-product');
                    // console.log(response)
                   }
                })
                
        }
    }

    return(
        <div className="col-sm-9 padding-right">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Create Product</div>
                        <div className="card-body">
                            <br/>
                            <Error errors = {errors} />
                            
                            <form enctype="multipart/form-data" onSubmit={handleSubmit}>
                                <input type="hidden" name="_token" value="PvgKbH1bqThouKNPzYmmu8I6YarwexqRwwpTtQsZ"/>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Name</label>
                
                                    <div className="col-md-8">
                                    <input  type="text" className="form-control" name="name"  onChange={handleInput}
                                        autofocus=""/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Price</label>
                
                                    <div className="col-md-8">
                                    <input  type="text" className="form-control " name="price"  onChange={handleInput}
                                        autofocus=""/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Category</label>
                
                                    <div className="col-md-8">
                                    <select name="category" className="form-control form-control-line" onChange={handleInput}>
                                        <option >Please select</option>
                                        {renderCategory()}
                                    </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Brand</label>
                
                                    <div className="col-md-8">
                                    <select name="brand" className="form-control form-control-line" onChange={handleInput}>
                                        <option >Please select</option>

                                        {renderBrand()}
                                    </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Status</label>
                
                                    <div className="col-md-8">
                                    <select name="status" className="form-control form-control-line" onChange={handleInput}>
                                        <option >Please select</option>
                                        <option>new</option>
                                        <option>sale</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    {renderSale()}
                                </div>  
                
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Company profile</label>
                
                                    <div className="col-md-8">
                                    <input type="text" className="form-control " name="company"  autocomplete="phone" autofocus="" onChange={handleInput}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Image</label>
                
                                    <div className="col-md-8">
                                    <input  type="file" className="form-control " name="image" onChange={handleInputFile} multiple/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right">Details</label>
                
                                    <div className="col-md-8">
                                    <input type="text" className="form-control " name="details"  autocomplete="address" onChange={handleInput}
                                        autofocus=""/>
                                    </div>
                                </div>
                                

                
                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        Upload
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

export default Add