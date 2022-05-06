import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Orders = ({}) => {
  const router = useRouter()
  const [orders, setOrders] = useState([])

  useEffect(async () => {
    let a = await fetch("/api/get-all-orders",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", token: localStorage.getItem('token') },
      })
    let response = await a.json()
    if (!response.success){
      router.push("/login")
      return
    }
    setOrders(response.orders)
  }, [])


  return (
    <div className='container p-5 select-none'>

      { orders.length!=0 && <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left :text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-[#0f0]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Products Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Subtotal
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>

            {orders.map((order) => {
              return (
                <Link href={`/order?orderId=${order._id}`} key={order._id}><tr className="border-b bg-gray-800 border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                    #{order._id.substr(0, 20)}...
                  </th>
                  <td className="px-6 py-4">
                    {order.address.substr(0, 20)}...
                  </td>
                  <td className="px-6 py-4">
                    {order.products.length}
                  </td>
                  <td className="px-6 py-4">
                  ₹ {order.amount}
                  </td>
                  <td className="px-6 py-4">
                   {order.status}
                  </td>
                </tr></Link>)
            })}


          </tbody>
        </table>
      </div>}

      {orders.length==0 && <div className='h-[50vh] flex justify-center items-center text-2xl font-bold text-[#0f0]'>You Have Not Ordered Anything Yet!</div>}

    </div>
  )
}

export default Orders