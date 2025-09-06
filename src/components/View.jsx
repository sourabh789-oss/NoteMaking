import React from 'react'
import { motion } from 'motion/react';
import { useLocation } from 'react-router'
 import { useNavigate } from 'react-router';

const View = ({ }) => {
    const { state } = useLocation();
    const title = state?.title;
    const Notes = state?.Notes;
    const navigate=useNavigate();
    return (
        <motion.div 
            drag dragConstraints={{
                left: 0,
                right: 400,
                bottom: 0,
                top: 100
            }}

            whileDrag={{
                scale: 0.4
            }}


            dragElastic={2}
            dragTransition={{
                bounceStiffness: 5,


            }}
            className='p-6 relative mx-[26rem]  my-12  bg-white/15 border  border-white text-center w-1/3 backdrop-blur-lg shadow-lg rounded-2xl '>
                <div className='cursor-pointer mr-[42rem] relative right-4 bottom-2' onClick={()=>{
                     navigate('/')
                }}><i className="ri-arrow-left-circle-fill text-4xl "></i></div>
            <span className='text-5xl relative bottom-4'>Title:<span className='text-5xl text-cyan-500 font-bold '>{title}</span></span>

            <section className='text-base font-medium  '>
                <textarea type="text" value={Notes} cols={40} rows={10} className='text-black outline-none rounded-md font-medium p-4' readOnly ></textarea>

            </section>

        </motion.div>
    )
}

export default View