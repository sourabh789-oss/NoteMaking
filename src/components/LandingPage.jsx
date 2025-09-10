import React from 'react'

const LandingPage = ({signIn}) => {
    return (
        <div> <section className='relative px-6  top-10 flex  flex-wrap flex-row-reverse justify-between items-center'>
            <div>
                <img src="https://img.freepik.com/premium-photo/3d-creative-team-brainstorming-vibrant-office-whiteboard-ideas-colorful-postit-notes-digital_980716-839604.jpg?ga=GA1.1.673466269.1724588849&semt=ais_hybrid&w=740&q=80" alt="" className='object-cover rounded-sm ' />
            </div>
            <div>
                <h1 className='text-3xl w-[30rem]  font-serif'><span className='text-red-300 font-semibold font-sans text-5xl'>Notify </span> is an <span className='text-red-300 font-sans '>Authenticated web App </span> where user can Create  private Notes.  Save  Securely here</h1>
                <h2 className='text-sm font-medium text-green-600'>Your Notes are always  Secure. No One can See Your Notes 😄</h2>
            </div>
        </section>
            <button onClick={() => {
                signIn()
            }} className=" bg-blue-600 font-normal cursor-pointer text-base relative bottom-12
          border-none rounded-md px-4 py-2 left-2 hover:left-6 transition-all">sign in With Google</button>
        </div>
    )
}

export default LandingPage