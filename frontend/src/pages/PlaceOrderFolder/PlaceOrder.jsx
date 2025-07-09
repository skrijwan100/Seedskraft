import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { handleError, handleSuccess } from "../../components/ErrorMessage";
import { useNavigate } from 'react-router';
const PlaceOrder = () => {
const naviget=useNavigate()
  const { getTotalCartAmount, token, food_list, cartItems, url,setCartItems } = useContext(StoreContext);
  useEffect(() => {
    console.log(food_list)
  }, [])
  const [data, setData] = useState({
    fristname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)

      }

    })
    console.log(orderItems)
    // console.log(orderItems[0].name)
    //  console.log(amount)
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/order/create-order`
    const response = await axios.post(url, {
      amount: getTotalCartAmount() + 10,
    })
    const { orderId, amount, currency } = response.data;
    console.log(orderId, amount, currency)
    const option = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // from Razorpay Dashboard
      amount: amount,
      currency: currency,
      name: 'Undefined',
      description: 'Test Transaction',
      order_id: orderId,
      callback_url: import.meta.env.VITE_CALLBACK_URL,
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

        // Send to backend for verification
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/verify-payment`, {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        });
        if (res.data.status) {
          handleSuccess('Payment successful !');
          try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/addorder`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                 token: localStorage.getItem('token')
              },
              body: JSON.stringify({
                items: orderItems[0].name,
                quantity: orderItems[0].quantity,
                amount: getTotalCartAmount() + 10,
                address: data,
                payment: true
              })
            });
            const result = await res.json();
            console.log("Add Order Response:", result)
            setCartItems(" ")
             naviget('/userorder')
          } catch (error) {
            console.error("Error calling addorder API:", error);
          }
        }
        else {
          handleError("Payment not done.")
        }
        // You can verify payment here by sending info to the backend
      },
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    }
    try {
      const rzp = new window.Razorpay(option);
      rzp.open();
    } catch (error) {
      console.error('Payment Error:', error);
    }
  }


  return (
    <div>
      <form onSubmit={placeOrder} action="" className="place-order">
        <div className="place-order-left">
          <p className="title">Deliver Information</p>
          <div className="multi-fields">
            <input required name='fristname' onChange={onChangeHandler} value={data.fristname} type="text" placeholder="Frist Name" />
            <input required name='lastname' onChange={onChangeHandler} value={data.lastname} type="text" placeholder="Last Name" />
          </div>
          <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
          <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
          <div className="multi-fields">
            <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
            <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
          </div>
          <div className="multi-fields">
            <input required name="pincode" onChange={onChangeHandler} value={data.pincode} type="Number" placeholder="PIN code" />
            <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
          </div>
          <input required type="PhoneNUmber" name="phone" onChange={onChangeHandler} value={data.phone} id="" placeholder="Phone Number" />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 10}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</b>
              </div>

            </div>
            <button type="submit"> PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
