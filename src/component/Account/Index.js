import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from "./App";
import Account from "./Member/Update";
import Product from "./Product/Product";
// import Account from './Member/Update'
import Add from "./Product/Add";
import Edit from "./Product/Edit";
import Delete from "./Product/Delete";
function Index(){
    // alert(Route)
    return(
        <App>
            <Routes>
                <Route path='/update' element={<Account/>}/>
                <Route path='/my-product' element={<Product/>}/>
                <Route path='/add-product' element={<Add/>}/>
                <Route path='/edit-product/:id' element={<Edit />} />
                <Route path='/delete-product/:id' element={<Delete />} />
            </Routes>
        </App>
    );
}

export default Index
