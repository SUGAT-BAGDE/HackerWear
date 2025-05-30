import Link from 'next/link'

const MyProductCard = ({ product }) => {
    return (
        <Link href={`/product/${product.slug}`}>

            <a>
            <div class="max-w-sm bg-white sm:h-[36rem] rounded-lg shadow-sm dark:bg-gray-800">
                <Link href={`/product/${product.slug}`}>
                    <img class="rounded-t-lg h-3/5 w-full" src={product.img} alt={product.title} />
                </Link>
                        <div className="p-5 flex flex-col row-span-2 justify-center">
                            <h5 className="text-slate-200 text-xl font-medium my-2 h-12">{product.title}</h5>

{/*                             <div className='flex flex-row mt-1'> */}
                                <p className="text-slate-400 text-base my-1 w-[85%]">
                                    {product.size.map((size) => {
                                        return <span className='mx-1' key={size}>{size.toUpperCase()}</span>
                                    })}
                                </p>
                                <div className="flex text-slate-400 text-base my-1 justify-end w-[15%]">
                                    {(product.color.includes("Blue") || product.color.includes("blue") || product.color.includes("BLUE")) && <button className="border-2 border-gray-700 bg-[#00f] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                    {(product.color.includes("Green") || product.color.includes("green") || product.color.includes("GREEN")) && <button className="border-2 border-gray-700 bg-[#0f0] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                    {(product.color.includes("Purple") || product.color.includes("purple") || product.color.includes("PURPLE")) && <button className="border-2 border-gray-700 bg-purple-600 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                    {(product.color.includes("yellow") || product.color.includes("Yellow") || product.color.includes("YELLOW")) && <button className="border-2 border-gray-700 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                    {(product.color.includes("pink") || product.color.includes("Pink") || product.color.includes("PINK")) && <button className="border-2 border-gray-700 bg-pink-600 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                    {(product.color.includes("white") || product.color.includes("White") || product.color.includes("WHITE")) && <button className="border-2 border-gray-700 bg-white rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                    {(product.color.includes("black") || product.color.includes("Black") || product.color.includes("BLACK")) && <button className="border-2 border-gray-700 bg-black rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                    {(product.color.includes("red") || product.color.includes("Red") || product.color.includes("RED")) && <button className="border-2 border-gray-700 bg-[#f00] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                                </div>
{/*                             </div> */}
                            <p className="text-slate-300 my-4 text-center font-bold">₹ {product.price}</p>
                        </div>
            </div>

            </a>
        </Link>
    )
}

export default MyProductCard
