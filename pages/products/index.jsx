import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import Product from "../../Models/Product";
import mongoose from 'mongoose'
import MyProductCard from '../../Components/MyProductCard'

import { toast } from 'react-toastify';

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let varients = await Product.find({})
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

const Products = ({ products }) => {

  return (
    <div>
      <Head>
        <title>Products | Hackerwear</title>
      </Head>
      <div className="container px-5 py-24 mx-auto">

      {Object.keys(products).length != 0 ?
          <div className="sm:p-10 grid items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {Object.keys(products).map((product) => 
              {return <MyProductCard product={products[product]} key={products[product].slug}/>})
            }

          </div> : <div className='text-lg text-center'>Sorry, No Hoodie Avilable <span className='font-bold text-[#0f0]'>Right Now</span></div>
      }

      </div>

    </div>
  )
}

export default Products