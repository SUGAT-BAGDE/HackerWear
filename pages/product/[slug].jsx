import { useRouter } from 'next/router'
import { useState } from 'react'
import mongoose from 'mongoose'
import Product from '../../Models/Product'
import Link from 'next/link'
import { toast } from 'react-toastify';

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let product = JSON.parse(JSON.stringify(await Product.findOne({ slug: context.params.slug })))
  let avilableVarients = JSON.parse(JSON.stringify(await Product.find({ title: product.title, category: product.category })))

  let varients = {}

  for (const varient of avilableVarients) {
    if (Object.keys(varients).includes(varient.size.toUpperCase()) && varient.availableQty > 0) {
      varients[varient.size.toUpperCase()][varient.color.toLowerCase()] = varient
    }
    else {
      if (varient.availableQty > 0) {
        varients[varient.size.toUpperCase()] = {}
        varients[varient.size.toUpperCase()][varient.color.toLowerCase()] = varient
      }
    }
  }

  return {
    props: { product, varients, }, // will be passed to the page component as props
  }
}

const Slug = ({ addToCart, product, varients, buyNow }) => {
  const router = useRouter()
  const { slug } = router.query
  const [service, setService] = useState()
  const [pin, setPin] = useState()

  const checkServiceability = async () => {
    let pins = await fetch("/api/pincodes")
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
      setService(true)
      toast.success("Yey! Your pincode is servicable!", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
    }
    else {
      setService(false)
      toast.error("Sorry! We do not deliver to your pincode!", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        progressStyle : {background : "red"}
      })
    }
  }

  const [size, setSize] = useState(product.size)

  const onChangePin = (e) => {
    setPin(e.target.value)
  }

  const handleChange = (e) => {
    if (e.target.name == "size-selection") {
      setSize(e.target.value)
      router.push(`/product/${varients[e.target.value][Object.keys(varients[e.target.value])[0]].slug}`)
    }
  }

  const myAddToCart = () => {
    addToCart(slug, 1, 499, `${product.title} (${product.size.toUpperCase()}, ${product.color.toUpperCase()})`, {})
  }
  const myBuyNow = () => {
    buyNow(slug, 1, 499, `${product.title} (${product.size.toUpperCase()}, ${product.color.toUpperCase()})`, {})
  }

  return <>
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/3 w-full lg:h-auto h-full bg-gray-800 object-contain object-center rounded-xl rounded-t-xl  shadow-black shadow-lg" src={product.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-white text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color.toUpperCase()})</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-[#00ff00]" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-[#00ff00]" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-[#00ff00]" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-[#00ff00]" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-[#00ff00]" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 text-gray-500 space-x-2">
                <a>
                  <svg fill="currentColor" strokeinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a>
                  <svg fill="currentColor" strokeinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a>
                  <svg fill="currentColor" strokeinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{product.desc}</p>
            {Object.keys(varients).length >= 2
              && <>
                {Object.keys(varients[size.toUpperCase()]) != 0
                  &&
                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
                    <div className="flex">
                      <span className="mr-3">Color</span>

                      {Object.keys(varients[size.toUpperCase()]).map((item) => {
                        return (
                          <>
                            {(item.toLocaleLowerCase() == "red") && <Link key={item} href={`/product/${varients[size.toUpperCase()][item].slug}`}><button className="border-2 border-gray-700 bg-[#f00] rounded-full w-6 h-6 focus:outline-none mx-1"></button></Link>}
                            {(item.toLocaleLowerCase() == "green") && <Link key={item} href={`/product/${varients[size.toUpperCase()][item].slug}`}><button className="border-2 border-gray-700 bg-[#0f0] rounded-full w-6 h-6 focus:outline-none mx-1"></button></Link>}
                            {(item.toLocaleLowerCase() == "blue") && <Link key={item} href={`/product/${varients[size.toUpperCase()][item].slug}`}><button className="border-2 border-gray-700 bg-[#00f] rounded-full w-6 h-6 focus:outline-none mx-1"></button></Link>}
                            {(item.toLocaleLowerCase() == "purple") && <Link key={item} href={`/product/${varients[size.toUpperCase()][item].slug}`}><button className="border-2 border-gray-700 bg-purple-700 rounded-full w-6 h-6 focus:outline-none mx-1"></button></Link>}
                            {(item.toLocaleLowerCase() == "yellow") && <Link key={item} href={`/product/${varients[size.toUpperCase()][item].slug}`}><button className="border-2 border-gray-700 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none mx-1"></button></Link>}
                            {(item.toLocaleLowerCase() == "white") && <Link key={item} href={`/product/${varients[size.toUpperCase()][item].slug}`}><button className="border-2 border-gray-700 bg-white rounded-full w-6 h-6 focus:outline-none mx-1"></button></Link>}
                            {(item.toLocaleLowerCase() == "black") && <Link key={item} href={`/product/${varients[size.toUpperCase()][item].slug}`}><button className="border-2 border-gray-700 bg-black rounded-full w-6 h-6 focus:outline-none mx-1"></button></Link>}
                            {(item.toLocaleLowerCase() == "pink") && <Link key={item} href={`/product/${varients[size.toUpperCase()][item].slug}`}><button className="border-2 border-gray-700 bg-pink-600 rounded-full w-6 h-6 focus:outline-none mx-1"></button></Link>}
                          </>
                        )
                      })

                      }



                    </div>

                    <div className="flex ml-6 items-center">
                      <span className="mr-3">Size</span>
                      <div className="relative">
                        <select onChange={handleChange} defaultValue={product.size.toUpperCase()} name="size-selection" className="rounded border border-gray-700 focus:ring-2 focus:ring-[#00ff00] bg-transparent appearance-none py-2 focus:outline-none focus:border-[#00ff00] text-[#5f5f5f] pl-3 pr-10">
                          {Object.keys(varients).map((varient) => {
                            return <option key={varient} value={varient} className={"bg-gray-900 text-[#0f0] outline-0"}>{varient}</option>
                          })

                          }
                        </select>
                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                          <svg fill="none" stroke="currentColor" strokeinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                }</>
            }
            <div className="flex mt-6">
              <span className="title-font font-medium text-2xl text-white">₹ {product.price}</span>
              <button className="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>

            <div className="flex mt-5 space-x-5">
              <button onClick={myBuyNow} className="flex text-slate-900 bg-[#00ff00] border-0 py-2 px-6 focus:outline-none hover:bg-[#00ff00] rounded">Buy Now</button>
              <button onClick={myAddToCart} className="flex text-slate-900 bg-[#00ff00] border-0 py-2 px-6 focus:outline-none hover:bg-[#00ff00] rounded">Add To Cart</button>
            </div>

          </div>
          <div>

            <div className='mt-5 flex space-x-2'>
              <input onChange={onChangePin} type="text" className='rounded border border-gray-700 focus:ring-2 focus:ring-[#00ff00] bg-transparent appearance-none py-1 focus:outline-none focus:border-[#00ff00] text-[#a7a7a7] pl-3 pr-10' placeholder='Enter your pincode' />
              <button onClick={checkServiceability} className='flex text-slate-900 bg-[#00ff00] border-0 py-1 px-4 focus:outline-none rounded'>Check</button>
            </div>
            <div className='mt-2'>
              {(!service && service != null) && <div onClick={checkServiceability} className='flex text-[#ff0000] border-0 py-1 focus:outline-none rounded'>
                Sorry! We do not deliver to this pincode!
              </div>}
              {(service && service != null) && <div onClick={checkServiceability} className='flex text-[#00ff00] border-0 py-1 focus:outline-none rounded'>
                Yey! This pincode is servicable!
              </div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default Slug