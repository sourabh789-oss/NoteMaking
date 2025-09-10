import React from 'react'

const Navbar = ({signIn,signOutNow,user}) => {
  return (
   <div className='navbar sticky top-1  h-fit   z-50 bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl border border-white/20   flex justify-between items-center w-full px-8 py-4   '>
      <h1 className='text-5xl text-red-300 cursor-pointer' onClick={() => { navigate('/') }}>Notify</h1>
      {
        user ?
          <div>
            <div className='flex'>
              <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/user-avatar/png/11.png?d=50x50" className='cursor-pointer' title={user.displayName} alt="User_Profile"></img>
              <button className='bg-blue-700  font-normal text-base  border-none rounded-md px-5 py-0 ml-2' onClick={() => { signOutNow() }}>Logout</button>
            </div>
          </div> : <button onClick={() => {
            signIn()
          }} className=" bg-blue-600 font-normal text-base  border-none rounded-md px-3 py-1">sign in With Google</button>
      }
    </div>
  )
}

export default Navbar