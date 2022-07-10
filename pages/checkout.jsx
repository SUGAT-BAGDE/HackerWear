import React, { useState, useEffect } from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineDelete, AiFillWallet } from 'react-icons/ai'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Checkout = (props) => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')  
  const router = useRouter()

  useEffect(async() => {
    let a = await fetch("/api/verify-user",
      {
        headers: { token : props.user.value },
      })
    let response = await a.json()
    if (response.status == "available") {
      setEmail(response.email)
      setName(response.name)
    }
    else if (response.status == "unavailable") {
      router.push("/login")
      toast.error("Please log into your account", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        progressStyle: { background: "#f00" }
      })
    }

  }, [])  

  const handleChange = async e => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      if (e.target.value.length > 6){
        return
      }
      setPincode(e.target.value)
      if (e.target.value.length == 6){
        let pins = await fetch("/api/pincodes")
        let pinJson = await pins.json()
        if (Object.keys(pinJson).includes(e.target.value)){
          setState(pinJson[e.target.value][1])
          setCity(pinJson[e.target.value][0])
        }
        else{
          setState("")
          setCity("")
        }
      }
      else if (e.target.value > 6) {
        setState("")
        setCity("")
        setPincode(e.target.value)
        return
      }
    }
  }

  const handlePay = async () => {
    let productsInCart = []
    for (let index = 0; index < Object.keys(props.cart).length; index++) {
      const prodSlug = Object.keys(props.cart)[index];
      productsInCart.push({productId:prodSlug, quantity:props.cart[prodSlug].qty})
    }
    let a = await fetch("/api/new-order",
    {
      method: "POST",
      headers: { "Content-Type": "application/json",  token : props.user.value  },
      body: JSON.stringify({ products : productsInCart, pincode, address, phone: phone })
    })
    let response = await a.json()
    if (response.success) {
      router.push(`/order?orderId=${response.orderId}`)
      toast.success(response.message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
      props.clearCart()
    }
    else {
      toast.error(response.message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        progressStyle: { background: "#f00" }
      })
    }
  }

  return (
    <div className='container px-8 m-auto'>
      <h1 className='text-center font-bold text-3xl my-8 text-[#0f0]'>Checkout</h1>
      <h2 className='px-2 font-bold text-xl text-[#0f0]'>1. Delivery Details</h2>
      <div className="mx-auto flex my-4 flex-wrap">
        <div className="px-2 w-full sm:w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00] text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-full sm:w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
            <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00] text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='px-2 w-full'>
          <div className="mb-4">
            <label htmlFor="address" className="leading-7 text-sm text-gray-400">Address</label>
            <textarea onChange={handleChange} value={address} name="address" cols="30" rows="2" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00] text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" ></textarea>
          </div>
        </div>
        <div className="px-2 w-full sm:w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-400">Phone</label>
            <input onChange={handleChange} value={phone} type="text" name="phone" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00] text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-full sm:w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-400">Pincode</label>
            <input onChange={handleChange} value={pincode} type="text" name="pincode" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00] text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-full sm:w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-400">City</label>
            <input onChange={handleChange} value={city} type="text" name="city" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00] text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-full sm:w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-400">State</label>
            <input onChange={handleChange} value={state} type="text" name="state" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00] text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <h2 className='px-2 font-bold text-xl text-[#0f0]'>1. Hacking Cart Review</h2>
      <div className="mx-auto flex my-4 flex-wrap">

        {Object.keys(props.cart).length == 0 && <div className='pl-8 select-none space-y-2 py-2 flex flex-col w-full bg-gray-800 rounded-lg text-center'>Add something to cart to cheakout</div>}
        {Object.keys(props.cart).length != 0 &&
          <ol className="list-decimal pl-8 select-none space-y-2 py-2 flex flex-col w-full bg-gray-800 rounded-lg">

            {
              Object.keys(props.cart).map((key) => {
                return (
                  <li key={key} className="w-full">
                    <span>
                      <div className='flex'>
                        <h3 className='w-full text-md flex items-center'>{props.cart[key].name}</h3>
                        <div className='w-1/5 flex items-center justify-center'>
                          <div className='w-3/6 flex items-center space-x-2 justify-center'>
                            <div onClick={() => props.reduceQtyFromCart(key)} className='w-1/4 cursor-pointer'>
                              <AiOutlineMinusCircle className='text-2xl' />
                            </div>
                            <div className='w-2/4 text-xl mx-3 text-center'>{props.cart[key].qty}</div>
                            <div onClick={() => props.increaseQtyToCart(key)} className='w-1/4 cursor-pointer' >
                              <AiOutlinePlusCircle className='text-2xl' />
                            </div>
                          </div>
                          <div className='w-2/6 flex items-center justify-center text-2xl cursor-pointer'>
                            <AiOutlineDelete className='text-xl cursor-pointer' name='delete' onClick={(e) => props.removeFromCart(key)} />
                          </div>
                        </div>
                      </div>
                    </span>
                  </li>
                )
              })
            }
          </ol>}

        {Object.keys(props.cart).length != 0 && <div className='mt-3 mx-auto w-full text-gray-300 border-0 text-lg font-bold px-3 focus:outline-none text-md'>Subtotal : ₹ {props.subTotal}</div>}
      </div>

      {Object.keys(props.cart).length == 0 || name.length == '' || email == '' || address == '' || phone == '' || city == '' || state == '' || pincode == '' && <div className='my-6 px-3'>You cannot cheakout without filling details or if cart is empty</div>}
      <button disabled={Object.keys(props.cart).length == 0 || name.length == '' || email == '' || address == '' || phone == '' || city == '' || state == '' || pincode == ''} className="flex justify-center items-center space-x-2 text-gray-900 bg-[#00ff00] border-0 my-6 mx-2 py-2 px-4 focus:outline-none hover:bg-[#00ff00] rounded disabled:blur-sm" onClick={handlePay}><AiFillWallet className='text-xl' /><span>Pay ₹ {props.subTotal}</span></button>
    </div>
  )
}

export default Checkout