import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineClose, AiOutlineDelete, AiOutlineLogin, AiOutlineEnter } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'

const Navbar = (props) => {
  const ref = useRef()
  const { logout } = props
  const [showMenu, setshowMenu] = useState(false)

  const handleCart = () => {
    if (ref.current.classList.contains("shoppingCart") && ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full")
      ref.current.classList.add("translate-x-0")
    }
    else if (ref.current.classList.contains("shoppingCart") && ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0")
      ref.current.classList.add("translate-x-full")
    }
  }

  return (
    <div className='bg-gray-900 flex flex-col md:flex-row md:justify-start justify-center items-center text-white'>
      <Link href={'/'}><a>
        <div className='space-x-2 py-2 px-2 flex justify-center items-center mx-5 text-[#00ff00]'>
          <Image src="/icon.png" alt="" width={40} height={40} className="inline" />
          <span className='font-black'>Hacker Wear</span>
        </div>
      </a>
      </Link>
      <nav className='nav'>
        <ul className='flex items-center space-x-2 font-bold md:text-xl'>
          <li><Link href={'/products/tshirts'}><a>T-shirts</a></Link></li>
          <li><Link href={'/products/hoodies'}><a>Hoodies</a></Link></li>
          <li><Link href={'/products/masks'}><a>Masks</a></Link></li>
          <li><Link href={'/products/mugs'}><a>Mugs</a></Link></li>
          <li><Link href={'/products/stickers'}><a>Stickers</a></Link></li>
        </ul>
      </nav>
      <div className='cart flex absolute space-x-2 right-0 top-3 mx-5'>
        {/* {props.user.value && <AiOutlineEnter className='text-xl md:text-3xl cursor-pointer' onClick={()=>{setshowMenu(!showMenu)}} />} */}
        {props.user.value!=null && <FaUserCircle className='text-xl md:text-3xl cursor-pointer' onClick={()=>{setshowMenu(!showMenu)}} onMouseEnter={() => setshowMenu(true)}
    onMouseLeave={() => setshowMenu(false)} />}
        {!props.user.value && <Link href={"/login"}><div className='flex items-center space-x-1 justify-center cursor-pointer'><AiOutlineLogin className='text-xl md:text-3xl' /><span>Login</span></div></Link>}
        {props.user.value && <AiOutlineShoppingCart className='text-xl md:text-3xl cursor-pointer' onClick={handleCart} />}
      </div>
      {showMenu &&
        <div className='absolute right-14 top-11 bg-slate-800 p-2 space-y-1 rounded-lg z-10' onMouseEnter={() => setshowMenu(true)} onMouseLeave={() => setshowMenu(false)}>
          <Link href={"/account"}><div className='hover:bg-black p-1.5 rounded-lg px-3' onClick={() => setshowMenu(false)}>Account</div></Link>
          <Link href={"/orders"}><div className='hover:bg-black p-1.5 rounded-lg px-3' onClick={() => setshowMenu(false)}>Orders</div></Link>
          <a onClick={logout}><div className='hover:bg-black p-1.5 rounded-lg px-3'>Logout</div></a>
        </div>
      }

      {props.user.value &&
        <div ref={ref} className='shoppingCart min-w-[17rem] select-none flex flex-col justify-center fixed transform transition-transform right-0 top-0 bg-gray-800 p-5 z-50 h-full translate-x-full'>
          <span className='absolute right-3 top-3 text-2xl cursor-pointer' onClick={handleCart}><AiOutlineClose /></span>
          <div className='h-full'>

            <h2 className='text-xl text-center my-5 selection:text-[#00ff00] text-[#00ff00] px-2'>Hacking Cart</h2>

            {Object.keys(props.cart).length == 0 && <div className='h-full flex justify-center items-center'>Add something to cart to Cheakout</div>}
            {Object.keys(props.cart).length != 0 &&
              <ol className="list-decimal pl-8">

                {
                  Object.keys(props.cart).map((key) => {
                    return (
                      <li key={key}>
                        <span>
                          <div className='flex'>

                            <h3 className='w-2/3 text-md mr-2 flex items-center'>{props.cart[key].name}</h3>
                            <div className='w-1/3  flex items-center justify-center'>
                              <div className='w-3/5 flex items-center justify-center'>
                                <div onClick={() => props.reduceQtyFromCart(key)} className='w-1/4 cursor-pointer m-1'>
                                  <AiOutlineMinusCircle className='text-2xl' />
                                </div>
                                <div className='w-2/4 text-xl mx-1 text-center'>{props.cart[key].qty}</div>
                                <div onClick={() => props.increaseQtyToCart(key)} className='w-1/4 cursor-pointer m-1' >
                                  <AiOutlinePlusCircle className='text-2xl' />
                                </div>
                              </div>
                              <div className='w-2/5 flex ml-2 items-center justify-center text-2xl cursor-pointer'>
                                <AiOutlineDelete className='text-xl cursor-pointer' onClick={() => props.removeFromCart(key)} />
                              </div>
                            </div>
                          </div>
                        </span>
                      </li>
                    )
                  })
                }
              </ol>
            }

          </div>
          {Object.keys(props.cart).length != 0 &&

            <div className='flex flex-col mt-5 select-none'>
              <div className='my-1 mx-auto w-full text-center text-gray-300 border-0 px-8 focus:outline-none text-md'>Total : ₹ {props.subTotal}</div>
              <Link href={"/checkout"}><button onClick={handleCart} className='my-1 mx-auto w-full text-center text-gray-800 bg-[#00ff00] md:bg-[#07e207] border-0 py-1 px-8 focus:outline-none hover:md:bg-[#00ff00] rounded text-lg'>Check Out</button></Link>
              <button onClick={props.clearCart} className='my-1 mx-auto w-full text-center text-gray-800 bg-[#00ff00] md:bg-[#07e207] border-0 py-1 px-8 focus:outline-none hover:md:bg-[#00ff00] rounded text-lg'>Clear Cart</button>
            </div>
          }

        </div>
      }
    </div>

  )
}

export default Navbar