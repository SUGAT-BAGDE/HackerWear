import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import mongoose from 'mongoose'
import Product from '../../Models/Product'

import { ToastContainer, toast } from 'react-toastify'

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let varients = await Product.find({ category: 'mask' })
  let products = {}

  for (let product of varients) {
    if (product.title in products && product.availableQty != 0) {
      if (!products[product.title].color.includes(product.color)) {
        products[product.title].color.push(product.color)
      }
      if (!products[product.title].size.includes(product.size)) {
        products[product.title].size.push(product.size)
      }
    }
    else if (product.availableQty != 0) {
      products[product.title] = JSON.parse(JSON.stringify(product))
      products[product.title].size = [product.size]
      products[product.title].color = [product.color]
    }
  }

  return {
    props: { products }, // will be passed to the page component as props
  }
}

const Masks = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Masks | Hackerwear</title>
      </Head>
      <div className="container px-5 py-24 mx-auto">

        {Object.keys(products).length != 0 ?
          <div className="sm:p-10 grid items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {Object.keys(products).map((product) => {

              return (<Link href={`/product/${products[product].slug}`} key={products[product]._id}>
                <a>
                  <div className="rounded-lg w-auto h-[35rem] bg-[#0e0e0e] shadow-black overflow-hidden shadow-lg flex flex-col">
                    <img className="h-[20rem] w-[20rem] flex m-auto rounded mt-3 object-contain row-span-2" src={products[product].img} alt={products[product].title} />
                    <div className="px-3 py-4">
                      <div className="p-2 flex flex-col row-span-2 justify-center">
                        <h5 className="text-slate-200 text-xl font-medium my-2">{products[product].title}</h5>
                        <p className="text-slate-400 text-base my-1">
                          {products[product].size.map((size) => {
                            return <span className='mx-1' key={size}>{size.toUpperCase()}</span>
                          })}
                        </p>
                        <p className="text-slate-300 my-4 text-left">₹ {products[product].price}</p>
                        <div className="text-slate-400 text-base my-1">
                          {(products[product].color.includes("Blue") || products[product].color.includes("blue") || products[product].color.includes("BLUE")) && <button className="border-2 border-gray-700 bg-[#00f] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                          {(products[product].color.includes("Green") || products[product].color.includes("green") || products[product].color.includes("GREEN")) && <button className="border-2 border-gray-700 bg-[#0f0] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                          {(products[product].color.includes("Purple") || products[product].color.includes("purple") || products[product].color.includes("PURPLE")) && <button className="border-2 border-gray-700 bg-purple-600 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                          {(products[product].color.includes("yellow") || products[product].color.includes("Yellow") || products[product].color.includes("YELLOW")) && <button className="border-2 border-gray-700 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                          {(products[product].color.includes("pink") || products[product].color.includes("Pink") || products[product].color.includes("PINK")) && <button className="border-2 border-gray-700 bg-pink-600 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                          {(products[product].color.includes("white") || products[product].color.includes("White") || products[product].color.includes("WHITE")) && <button className="border-2 border-gray-700 bg-white rounded-full w-6 h-6 focus:outline-none mx-1" />}
                          {(products[product].color.includes("black") || products[product].color.includes("Black") || products[product].color.includes("BLACK")) && <button className="border-2 border-gray-700 bg-black rounded-full w-6 h-6 focus:outline-none mx-1" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>)
            })
            }



          </div> : <div className='text-lg text-center'>Sorry, No Mask Avilable <span className='font-bold text-[#0f0]'>Right Now</span></div>}

      </div>

    </div>
  )
}

export default Masks