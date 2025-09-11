import React, { useState } from 'react'
import { motion } from 'motion/react';
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router';
import { db, auth } from '../hooks/Firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
const View = ({ }) => {
    const { state } = useLocation();
    const title = state?.title;
    const Notes = state?.Notes;
    const id = state?.ID;
    const [edit, isEdit] = useState(false);
    const [notedata, setnotedata] = useState(Notes);
    const navigate = useNavigate();


    async function SaveData(id) {

        if (!edit) {
            alert(`There is no Changes Please edit or change the data then save`);
            return;
        }

        try {
            await updateDoc(doc(db, "notes", id), {
                content: notedata
            })
            isEdit(false);//now automatic edit option again disable until user click nahi krega fir se edit par 

        }
        catch (error) {
            console.log("Update Doc error:", error);
        }
    }



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
            className='view p-6 relative mx-[26rem]  my-12  bg-white/15 border  border-white text-center w-1/3 backdrop-blur-lg shadow-lg rounded-2xl '>
            <div className='cursor-pointer mr-[42rem] relative right-4 bottom-2' onClick={() => {
                navigate('/')
            }}><i className="ri-arrow-left-circle-fill text-4xl "></i></div>
            <span className='text-5xl relative bottom-4'>Title:<span className='text-5xl text-cyan-500 font-bold '>{title}</span></span>

            <section className=' text-base font-medium  '>
                <textarea type="text"

                    value={notedata}
                    onChange={(e) => {
                        setnotedata(e.target.value);
                    }}

                    readOnly={!edit}


                    cols={40} rows={10} className={`textpart text-black outline-none rounded-md font-medium p-4 ${!edit ? "bg-gray-200 cursor-not-allowed" : "bg-white cursor-text"}`}></textarea>

            </section>

            <div className='editandsavebtn flex justify-between items-center'>
                <button onClick={() => {
                    isEdit(!edit)
                }} className='px-4 rounded-md py-1 bg-green-500 font-bold text-white'>{edit ? "Cancel" : "Edit"}</button>
                <button className='px-4 rounded-md py-1 bg-blue-700 font-bold text-white' onClick={() => {
                    SaveData(id);
                }}>Save</button>
            </div>

        </motion.div>
    )
}

export default View