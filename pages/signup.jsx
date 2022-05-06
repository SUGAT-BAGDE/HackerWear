import React, { useState } from 'react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleChange = e => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmail("")
    setName("")
    setPassword("")
    let a = await fetch("/api/signup", {method: "POST", headers : {"Content-Type": "application/json"}, body : JSON.stringify({email, name , password})})
    let data = await a.json()
    if (a.status == 500 ){
      toast.error(data.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        progressStyle:{background:"#f00"}
      })
      return
    }
    else{
      toast.success(data.message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
    }
  }

  return (
    <div className="min-h-full select-none flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-14 w-auto border-2 border-[#00ff00] rounded-[500px] p-1" src="/icon.png" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign up to an account </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href={"/login"}><a href="#" className="font-medium text-[#00ff00] hover:text-[#00ff00]"> Login </a></Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Your Name</label>
              <input onChange={handleChange} value={name} type="text" id="name" name="name" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-800 border-gray-700 placeholder-gray-500 text-[#31d631] rounded-t-md focus:outline-none focus:ring-[#00ff00] focus:border-[#00ff00] focus:z-10 sm:text-sm" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input onChange={handleChange} value={email} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-800 border-gray-700 placeholder-gray-500 text-[#31d631] focus:outline-none focus:ring-[#00ff00] focus:border-[#00ff00] focus:z-10 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input onChange={handleChange} value={password} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none bg-gray-800 relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-[#31d631] rounded-b-md focus:outline-none focus:ring-[#00ff00] focus:border-[#00ff00] focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div>
            <button type="submit" disabled={name == "" || email == "" || password == "" || name == null || email == null || password == null} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-[#00ff00] hover:bg-[#00ff00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00ff00] disabled:opacity-50 transition-opacity">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup