import React from 'react'
import Link from 'next/link'

const MyProductCard = ({ product }) => {
    return (
        <Link href={`/product/${product.slug}`}>
            <a>
                <div className="rounded-lg w-auto h-[35rem] bg-[#0e0e0e] shadow-black overflow-hidden shadow-lg flex flex-col">
                    <img className="h-[20rem] w-[20rem] flex m-auto rounded mt-3 object-contain row-span-2" src={product.img} alt={product.title} />
                    <div className="px-3 py-4">
                        <div className="p-2 flex flex-col row-span-2 justify-center">
                            <h5 className="text-slate-200 text-xl font-medium my-2">{product.title}</h5>
                            <p className="text-slate-400 text-base my-1">
                                {product.size.map((size) => {
                                    return <span className='mx-1' key={size}>{size.toUpperCase()}</span>
                                })}
                            </p>
                            <p className="text-slate-300 my-4 text-left">₹ {product.price}</p>
                            <div className="text-slate-400 text-base my-1">
                                {(product.color.includes("Blue") || product.color.includes("blue") || product.color.includes("BLUE")) && <button className="border-2 border-gray-700 bg-[#00f] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                {(product.color.includes("Green") || product.color.includes("green") || product.color.includes("GREEN")) && <button className="border-2 border-gray-700 bg-[#0f0] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                {(product.color.includes("Purple") || product.color.includes("purple") || product.color.includes("PURPLE")) && <button className="border-2 border-gray-700 bg-purple-600 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                {(product.color.includes("yellow") || product.color.includes("Yellow") || product.color.includes("YELLOW")) && <button className="border-2 border-gray-700 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                {(product.color.includes("pink") || product.color.includes("Pink") || product.color.includes("PINK")) && <button className="border-2 border-gray-700 bg-pink-600 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                {(product.color.includes("white") || product.color.includes("White") || product.color.includes("WHITE")) && <button className="border-2 border-gray-700 bg-white rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                {(product.color.includes("black") || product.color.includes("Black") || product.color.includes("BLACK")) && <button className="border-2 border-gray-700 bg-black rounded-full w-6 h-6 focus:outline-none mx-1" />}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default MyProductCard