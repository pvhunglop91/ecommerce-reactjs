import Error from "../../Member/Error";
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import $ from 'jquery'
function Edit(){
    let params = useParams();
    const [inputs, setInputs] = useState('');
    // const [getIFP, setIFP] = useState('');
    const [getIFPAL, setIFPAL] = useState({data: null, repos: null});
    const [errors, setErrors] = useState({});
    const [avatar, setAvatar] = useState('');
    const [getC, setC] = useState('');    
    const [getB, setB] = useState('');  
    const [getIMGP, setIMGP] = useState('');
    const [getNameIMG, setNameIMG] = useState([]);

    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userlogin'))
    let accessToken = userData.token;
    let config = {
        headers: {
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    } 
    
    useEffect(() => {

        const fetchData = async () => {
          const respGlobal = await axios(
            'http://localhost/laravel/public/api/user/product/' + params.id, config
          );
          const respRepos = await axios(
            `http://localhost/laravel/public/api/category-brand`
          );
            setIFPAL({ data: respGlobal.data, repos: respRepos.data });
            console.log(respGlobal.data.data)
            setInputs({
                name: respGlobal.data.data.name,
                price: respGlobal.data.data.price,
                id_category: respGlobal.data.data.id_category,
                id_brand: respGlobal.data.data.id_brand,
                status: respGlobal.data.data.status,
                sale: respGlobal.data.data.sale,
                company_profile: respGlobal.data.data.company_profile,
                detail: respGlobal.data.data.detail,
                image: respGlobal.data.data.image
            })
            setIMGP(respGlobal.data.data.image)
            setC(respRepos.data.category)
            setB(respRepos.data.brand) 
            // console.log(respRepos.data)
        };
        fetchData();
        
      }, []);
      
        // console.log(inputs)
        // console.log(getC)
    function renderSale(){
        if(inputs.status == 0){
            return(
                <><label for="email" className="col-md-4 col-form-label text-md-right">% Sale</label><div className="col-md-8">
                    <input type="text" value={inputs.sale} className="form-control " name="sale" onChange={handleInput}
                        autocomplete="password" autofocus="" />
                </div></>
            )
        }
    }

    function renderStatus(){
        if(inputs.status == 0){
            return(
                <select name="status" value="sale"  onChange={handleInput}   className="form-control form-control-line">
                    <option >Please select</option>
                    <option>new</option>
                    <option>sale</option>
                </select>
            )
        }else{
            return(
                <select name="status" value="new"  onChange={handleInput}   className="form-control form-control-line">
                    <option >Please select</option>
                    <option>new</option>
                    <option>sale</option>
                </select>
            )
        }
    }

    const click = (e) =>{

        
        const nameIMG = e.target.value;
        
        if(e.target.checked == true){
            setNameIMG(state => ([...state, nameIMG]))
            
        }else{
            if(getNameIMG.includes(nameIMG) == true){
                Array.from(getNameIMG).map((value, key) =>{
                    getNameIMG.splice(key, 1)
                })
            }
        }
        
    }
    
    function renderIMGP(){
        if(Object.keys(getIMGP).length >0){
            return Object.keys(getIMGP).map((key1, value1) =>{
                return(
                    <div>
                        <img src={"http://localhost/laravel/public/upload/user/product/13/" + getIMGP[key1]} width="70px" height="50px"/>
                        <input type="checkbox" value={getIMGP[key1]} onChange={click} />
                        {/* {isChecked ? console.log("") : console.log("bo chon")} */}
                    </div>
                )
            })
        }        
    }


    function renderCategory(){
        // console.log(getNameIMG)  
        if(Object.keys(getC).length > 0){
            // console.log(inputs.id_category)
            return Object.keys(getC).map((key,value) =>{
             
                return(
                    <option value={getC[key]['id']}>
                        {getC[key].category}
                    </option>
                );
            })
        }
    }


    function renderBrand(){
        if(Object.keys(getB).length > 0){
            return  Object.keys(getB).map((keys,values) =>{
                return(
                    <option value={getB[keys]['id']}>
                    {getB[keys].brand}
                    </option>
                );
            })
        }
    }


    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state, [nameInput]:value}))
    }
    function handleInputFile(e){
        // let filess = e.target.files;
        setAvatar(e.target.files)
        console.log(e.target.files)
    }


    const handleSubmit = (e) => {
        // console.log(inputs.image)
        e.preventDefault();
        let errorSubmit = {}
        let flag = true;
        if(avatar.length != 0){
            let arrImg = ["png", "jpg", "jpeg", "PNG", "JPG"];
            Array.from(avatar).map((value, key) =>{
                let filestrPop = value.name.split(".").pop();
                console.log(filestrPop)
                if(arrImg.includes(filestrPop) == false){
                    errorSubmit.file = "vui long cap nhat lai file"
                    flag = false
                }
                if(value.size > (1024*1024)){
                    errorSubmit.file = "file vuot qua su cho phep"
                    flag = false;
                }
            })
           
        }
        if(avatar.length + (inputs.image.length - getNameIMG.length) > 3){
            flag = false;            
            errorSubmit.file = "so file da lon hon 3";
        }

        if(!flag){
            setErrors(errorSubmit);
        }        

        if(flag){
            const userData = JSON.parse(localStorage.getItem('userlogin'))
            let accessToken = userData.token;
            let url = 'http://localhost/laravel/public/api/user/edit-product/' + params.id;
            let config = {
                headers: {
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            }   
            const formData = new FormData();

            formData.append ('category', inputs.id_category);
            formData.append ('brand', inputs.id_brand);
            formData.append ( 'name', inputs.name);

            if(avatar.length == 0){
                // formData.append('file[]', inputs.image);
                // Object.keys(inputs.image).map((item, i) =>{
                //     formData.append('file[]', inputs.image[item]);
                //     // console.log(avatar[item])
                // });

            }else{
                Object.keys(avatar).map((item, i) =>{
                    formData.append('file[]', avatar[item]);
                });
            };
            
            formData.append('avatarCheckBox[]', getNameIMG);

            formData.append('price', inputs.price);
            if(inputs.status == "sale"){    
                formData.append('status', 0);
            }else{
                formData.append('status', 1);
            };
            if(inputs.status == "sale"){
                formData.append('sale', inputs.sale);
            }
            formData.append('detail', inputs.details);
            formData.append('company', inputs.company);

            axios.post(url, formData, config )
                .then (response => {
                   if(response.data.errors){
                    setErrors(response.data.errors);
                   }else{
                       console.log(response)
                    navigate('/account/my-product');
                   }
                })
                
        }
    }
    return(
        <div className="col-sm-9 padding-right">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Update Product</div>
                    <div className="card-body">
                        <br/>
                        <Error errors = {errors} />
                        
                        <form enctype="multipart/form-data" onSubmit={handleSubmit}>
                            {/* <input type="hidden" name="_token" value="PvgKbH1bqThouKNPzYmmu8I6YarwexqRwwpTtQsZ"/> */}
                            <div className="form-group row">
                                <label for="email" className="col-md-4 col-form-label text-md-right">Name</label>
            
                                <div className="col-md-8">
                                <input  type="text" className="form-control" name="name" onChange={handleInput} value={inputs.name}
                                    autofocus=""/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="email" className="col-md-4 col-form-label text-md-right">Price</label>
            
                                <div className="col-md-8">
                                <input  type="text" className="form-control " name="price" onChange={handleInput} value={inputs.price}
                                    autofocus=""/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="email" className="col-md-4 col-form-label text-md-right">Category</label>
            
                                <div className="col-md-8">
                                <select value={inputs.id_category} name="id_category" onChange={handleInput}  className="form-control form-control-line">
                                    <option >Please select</option>
                                    {renderCategory()}
                                </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="email" className="col-md-4 col-form-label text-md-right">Brand</label>
            
                                <div className="col-md-8">
                                <select value={inputs.id_brand} name="id_brand" onChange={handleInput} className="form-control form-control-line">
                                    <option >Please select</option>
                                    {renderBrand()}
                                </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="email" className="col-md-4 col-form-label text-md-right">Status</label>
            
                                <div className="col-md-8">
                                    {renderStatus()}
                                </div>
                            </div>
                            <div className="form-group row">
                                {renderSale()}
                            </div>  
            
                            <div className="form-group row">
                                <label for="email"  className="col-md-4 col-form-label text-md-right">Company profile</label>
            
                                <div className="col-md-8">
                                <input type="text" onChange={handleInput} className="form-control " name="company" value={inputs.company_profile}  autocomplete="phone" autofocus=""/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="email" className="col-md-4 col-form-label text-md-right">Image</label>
            
                                <div className="col-md-8">
                                <input  type="file" onChange={handleInputFile} className="form-control " name="image"  multiple/>
                                {renderIMGP()}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="email" className="col-md-4 col-form-label text-md-right">Details</label>
            
                                <div className="col-md-8">
                                <input type="text" onChange={handleInput} className="form-control " name="details" value={inputs.detail}  autocomplete="address"
                                    autofocus=""/>
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
export default Edit;