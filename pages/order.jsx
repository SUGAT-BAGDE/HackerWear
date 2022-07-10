import React from 'react'
import mongoose from 'mongoose';
import Order from '../Models/Order';
import Product from '../Models/Product';
import Error from 'next/error';

// import { toast, ToastContainer } from 'react-toastify';

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  try {
    let order = JSON.parse(JSON.stringify(await Order.findById(context.query.orderId)))
    let products = JSON.parse(JSON.stringify(order.products))
    order.products = []
    for (const product of products) {
      let { price, title, size, color, slug, img } = JSON.parse(JSON.stringify(await Product.findOne({ slug: product.productId })))
      order.products.push({ title, size, color, price: (price * product.quantity), qty: product.quantity, slug, img })
    }

    return {
      props: { order }, // will be passed to the page component as props
    }
  }
  catch (err) {
    return {
      props: { order: null },
    }
  }
}
import Link from 'next/link'

const MyProductCard = ({ product }) => {
    return (
        <Link href={`/product/${product.slug}`}>
            <a>
                <div className="rounded-lg w-auto h-full bg-[#0e0e0e] shadow-black overflow-hidden shadow-lg flex flex-col">
                    <img className="h-[20rem] w-[20rem] flex m-auto rounded mt-3 object-contain row-span-2" src={product.img} alt={product.title} />
                    <div className="px-3 py-4">
                        <div className="p-2 flex flex-col row-span-2 justify-center">
                            <h5 className="text-slate-200 text-xl font-medium my-2">{product.title}</h5>
                            <p className="text-slate-400 text-base my-1">
                                <span className='mx-1'>{product.size.toUpperCase()}</span>
                            </p>
                            <p className="text-slate-400 text-base my-1">
                                <span className='mx-1'>Quantity : {product.qty}</span>
                            </p>
                            <p className="text-slate-400 text-base my-1">
                                <span className='mx-1'>Total : ₹{product.price}</span>
                            </p>
                            <p className="text-slate-300 my-4 text-left">₹ {product.price}</p>
                            <div className="text-slate-400 text-base my-1">
                                {(product.color == "Blue" || product.color == "blue" || product.color == "BLUE") && <button className="border-2 border-gray-700 bg-[#00f] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                {(product.color == "Green" || product.color == "green" || product.color == "GREEN") && <button className="border-2 border-gray-700 bg-[#0f0] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                {(product.color == "Purple" || product.color == "purple" || product.color == "PURPLE") && <button className="border-2 border-gray-700 bg-purple-600 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                {(product.color == "Yellow" || product.color == "yellow" || product.color == "YELLOW") && <button className="border-2 border-gray-700 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                {(product.color == "Pink" || product.color == "pink" || product.color == "PINK") && <button className="border-2 border-gray-700 bg-pink-600 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                {(product.color == "White" || product.color == "ehite" || product.color == "WHITE") && <button className="border-2 border-gray-700 bg-white rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                {(product.color == "Black" || product.color == "black" || product.color == "BLACK") && <button className="border-2 border-gray-700 bg-black rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                {(product.color == "Red" || product.color == "red" || product.color == "RED") && <button className="border-2 border-gray-700 bg-[#f00] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

const OrderPage = ({ order }) => {

  if (order == null) {
    return <Error statusCode={404} />
  }

  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">HACKERWEAR.COM</h2>
              <h1 className="text-white text-3xl title-font font-medium mb-4">Order Id : #{JSON.stringify(order._id).substr(1, 15)}...</h1>
              <div className="mb-4 flex">
                <div className="w-3/5 flex-grow flex items-center text-[#00ff00] border-b-2 border-gray-800 py-2 text-lg px-1">Item Description</div>
                <div className="w-1/5 flex-grow flex items-center justify-center text-[#00ff00] border-b-2 border-gray-800 py-2 text-lg px-1">Quantity</div>
                <div className="w-1/5 flex-grow flex items-center justify-end    text-[#00ff00] border-b-2 border-gray-800 py-2 text-lg px-1">Total</div>
              </div>
              {order.products.map((product) => {
                return (
                  <div className="flex border-gray-800 py-2" key={product.slug}>
                    <div className="w-3/5 flex-grow flex items-center text-gray-300">{product.title} ({product.color.toUpperCase()}/{product.size.toUpperCase()})</div>
                    <div className="w-1/5 flex-grow flex items-center justify-center text-white">{product.qty}</div>
                    <div className="w-1/5 flex-grow flex items-center justify-end text-white">₹ {product.price}</div>
                  </div>
                )
              })}

              <div className="pt-3 mt-6 space-y-2 border-t-2 border-gray-800">
                <h1 className="text-white text-2xl title-font font-medium ">Details</h1>
                <div className="flex border-gray-800 py-1">
                  <div className="w-1/5 flex-grow flex items-center text-[#00ff00]">Subtotal</div>
                  <div className="w-1/10 flex-grow flex items-center text-[#00ff00]">:</div>
                  <div className="w-4/5 flex-grow flex items-center justify-end text-white">₹ {order.amount}</div>
                </div>
                <div className="flex border-gray-800 py-1">
                  <div className="w-1/5 flex-grow flex items-center text-[#00ff00]">Address</div>
                  <div className="w-1/10 flex-grow flex items-center text-[#00ff00]">:</div>
                  <div className="w-4/5 flex-grow flex items-center justify-end text-white">{order.address}</div>
                </div>
                <div className="flex border-gray-800 py-1">
                  <div className="w-1/5 flex-grow flex items-center text-[#00ff00]">Pincode</div>
                  <div className="w-1/10 flex-grow flex items-center text-[#00ff00]">:</div>
                  <div className="w-4/5 flex-grow flex items-center justify-end text-white">{order.pinCode}</div>
                </div>
                <div className="flex border-gray-800 py-1">
                  <div className="w-1/5 flex-grow flex items-center text-[#00ff00]">Status</div>
                  <div className="w-1/10 flex-grow flex items-center text-[#00ff00]">:</div>
                  <div className="w-4/5 flex-grow flex items-center justify-end text-white">{order.status}</div>
                </div>
              </div>
            </div>
            {/* <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/icon.png" /> */}
            {/* <Image alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" /> */}
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-2xl" src={"/home.png"} />
          </div>
        </div>
      </section>
        <section className="container px-5 py-24 mx-auto">

          <div className="sm:p-10 grid items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

              {Object.keys(order.products).map((product) => 
                {return <MyProductCard product={order.products[product]} key={order.products[product]}/>})
              }

            </div>
        </section>

    </div>
  )
}

export default OrderPage