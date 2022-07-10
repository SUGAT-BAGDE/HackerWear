import '../styles/globals.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import LoadingBar from 'react-top-loading-bar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const [cart, setCart] = useState({})
  const [subTotal, setTotal] = useState(0)
  const [progress, setProgress] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)

  useEffect(() => {
    try {
      if (localStorage.getItem('cart')) {
        let cartJson = JSON.parse(localStorage.getItem('cart'));
        setCart(cartJson)
        calculateSubTotal(cartJson)
      }
      else {
        setCart({})
      }
    } catch (error) {
      console.error(error)
      localStorage.removeItem('cart')
    }
    router.events.on("routeChangeComplete", () => {
      setProgress(100)
    })
    router.events.on("routeChangeStart", () => {
      setProgress(40)
    })

    const token = localStorage.getItem('token')
    setUser({ value: token })
    if (token) {
      fetch("/api/verify-user",
        {
          headers: { token },
        }).then(a => {
          a.json().then(response => {
            if (response.status == "available") {
              return
            }
            else if (response.status == "unavailable") {
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
              setUser({ value: null })
            }
            else if (response.status == "expired") {
              toast.error("Please log again your account", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                progressStyle: { background: "#f00" }
              })
              setUser({ value: null })
            }
          })
        })
      setKey(Math.random())
    }
  }, [])

  const calculateSubTotal = (mCart) => {
    let mSubTotal = 0
    for (let productId = 0; productId < Object.keys(mCart).length; productId++) {
      let price = mCart[Object.keys(mCart)[productId]].price * mCart[Object.keys(mCart)[productId]].qty
      mSubTotal = mSubTotal + price
    }
    setTotal(mSubTotal)
  }


  const addToCart = (productId, qty, price, name, extras) => {
    let newCart = cart
    if (Object.keys(newCart).includes(productId)) {
      newCart[productId].qty = newCart[productId].qty + qty
    }
    else {
      newCart[productId] = { qty, price, name, extras }
    }
    toast.success(`Added ${name} to Hacking Cart`, {
      position: "top-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    })
    saveCart(newCart)
  }

  const buyNow = (productId, qty, price, name, extras) => {
    let newCart = {}
    newCart[productId] = { qty, price, name, extras }
    setTotal(price)
    saveCart(newCart)
    router.push('/checkout')
  }

  const removeFromCart = (productId) => {
    let newCart = cart;
    delete newCart[productId]
    saveCart(newCart)
  }

  const reduceQtyFromCart = (productId) => {
    if (Object.keys(cart).includes(productId)) {
      let newCart = cart
      newCart[productId].qty = newCart[productId].qty - 1
      if (newCart[productId].qty <= 0) {
        delete newCart[productId]
      }
      saveCart(newCart)
    }
  }

  const increaseQtyToCart = (productId) => {
    if (Object.keys(cart).includes(productId)) {
      let newCart = cart
      newCart[productId].qty = newCart[productId].qty + 1
      if (newCart[productId].qty <= 0) {
        delete newCart[productId]
      }
      saveCart(newCart)
    }
  }

  const clearCart = () => {
    saveCart({})
  }


  const saveCart = (cart) => {
    setCart(cart)
    calculateSubTotal(cart) +
      localStorage.setItem("cart", JSON.stringify(cart))
  }

  const login = (token) => {
    localStorage.setItem('token', token)
    setUser({ value: token })
    router.back()
    setKey(Math.random())
  }

  const logout = () => {
    router.push('/')
    localStorage.removeItem("token")
    setUser({ value: null })
    setKey(Math.random())
    toast.success("Loged Out Successfully!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    })
  }

  return <div className="bg-gray-900 text-white">

    <Head>
      <title>Hackerwear.com - Wear the crypto!</title>
      <meta name="description" content="Hackerwear.com - Wear the crypto!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>


    <LoadingBar
      color='#0f0'
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
      waitingTime={400}
    />

    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      theme="dark"
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      progressStyle={{ background: "#0f0" }}
    />
    <Navbar logout={logout} key={key} user={user} cart={cart} buyNow={buyNow} subTotal={subTotal} addToCart={addToCart} removeFromCart={removeFromCart} increaseQtyToCart={increaseQtyToCart} reduceQtyFromCart={reduceQtyFromCart} clearCart={clearCart} />
    <Component {...pageProps} user={user} login={login} logout={logout} buyNow={buyNow} cart={cart} subTotal={subTotal} addToCart={addToCart} removeFromCart={removeFromCart} increaseQtyToCart={increaseQtyToCart} reduceQtyFromCart={reduceQtyFromCart} clearCart={clearCart} />
    <Footer />
  </div>
}

export default MyApp
