import React, {  useState,useEffect } from "react";
import "./Add.css";
// eslint-disable-next-line no-unused-vars
import { assets, url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const Add = ({url}) => {
   useEffect(()=>{
    const token= localStorage.getItem('auth-token');
    if(!token){
     console.log("not auth")
    }
   },[])
  
   const[image,setImage] = useState  (false);
   const [data,setData]= useState({
       name:"",
       description:"",
       price:"",
       category:"Vegetables Seeds"
   })
  const onChangeHandler = (event) =>{
       const name = event.target.name;
       const value = event.target.value;
       setData(data=>({...data,[name]:value}))
  }
 
  const onSubmitHandler = async (event) =>{
     event.preventDefault()
     const fromData = new FormData();
     fromData.append("name",data.name)
     fromData.append("description",data.description)
     fromData.append("price",Number(data.price))
     fromData.append("category",data.category)
     fromData.append("image",image)
     const response = await axios.post(`${url}/api/food/add`,fromData)
     if (response.data.success) {
       setData({
       name:"",
       description:"",
       price:"",
       category:"Vegetables Seeds"
   })
   setImage(false)
   toast.success(response.data.message)
     }
     else{
       toast.error(response.data.message)
     }
  }


  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            accept="image/*"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            id=""
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
             onChange={onChangeHandler}
             value={data.description}
            name="description"
            rows="6"
            id=""
            placeholder="write content here....."
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select  onChange={onChangeHandler} name="category">
              {/* <option value="Vegetables seeds">Vegetables seeds</option> */}
              <option value="Fruits seeds">Fruits seeds</option>
              <option value="Flower seeds">Flower seeds</option>
              <option value="Vegetables seeds">Vegetables seeds</option>
              <option value="Fruits seeds">Fruits seeds</option>
              <option value="Mango Seeds">Mango Seeds</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
               onChange={onChangeHandler}
               value={data.price}
              type="Number"
              name="price"
              placeholder="₹100"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
