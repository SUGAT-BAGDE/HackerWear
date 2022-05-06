import React from 'react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify';

const Forgot = () => {
  return (
    <div className="select-none min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-14 w-auto border-2 border-[#00ff00] rounded-[500px] p-1" src="/icon.png" alt="Workflow"/>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Forgot Password</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={"/login"}><a href="#" className="font-medium text-[#00ff00] hover:text-[#00ff00]"> Login </a></Link>
            </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true"/>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded relative block w-full px-3 py-2 border bg-gray-800 border-gray-700 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#00ff00] focus:border-[#00ff00] focus:z-10 sm:text-sm" placeholder="Email address"/>
              </div>
            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-[#00ff00] hover:bg-[#00ff00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00ff00]">
                Continue
              </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Forgot