import React, { useEffect, useState } from 'react';
import './index.css'
import { GoogleAuthProvider } from 'firebase/auth';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { db, auth } from './hooks/Firebase.config';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import Loader from './components/Loader';
import { motion } from 'motion/react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import View from './components/View'
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", content: "" });
  const [Loaders, setLoaders] = useState(true);
  const navigate = useNavigate();


  //Pagination state here 
  const [CurrentPageState, setCurrentPageState] = useState(1);//intially 1 hi page ha 
  const NotesperPage = 10;//total notes per page show 

  useEffect(() => {
    window.scrollTo({ top: 350, behavior: "smooth" });
  }, [CurrentPageState]);

  useEffect(() => {
    if (!user) {
      setNotes(null);
      setLoading(false);

      return;
    }

    //access our notes data 
    setLoading(true);
    const q = query(collection(db, "notes"), where("uid", "==", user.uid), orderBy("pinned", "desc"),
      orderBy("CreateAt", "desc"));//give the document first according to uid check or pinned document ,createAt doc jo sabse last mein create hogi or pin krega user vo sabse pehle show hogi 

    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,//in our firestore d.id in our database present
        ...d.data()//gives previous data all value which was set when we create the data 
      }))

      setNotes(data);
      setLoading(false);
    }, (err) => {
      console.log(err)
      setLoading(false);
    })

    return () => unsubscribe();//cleanup 


  }, [user])

  //user auth state changed 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);

    }
    )



    return () => unsubscribe();
  }, [])


  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  const signOutNow = async () => {
    return await signOut(auth);


  }


  //form submit handler 
  const createNote = async (e) => {
    e.preventDefault();
    if (!user) {//if user is not signin 
      return;
    }

    const title = form.title;
    const content = form.content;

    if (!title || !content) {
      alert('Please fill all Values');
      return;
    }
    //create the data in database in our document name notes 
    try {
      await addDoc(collection(db, "notes"), {
        uid: user.uid,
        title,
        content,
        pinned: false,
        CreateAt: serverTimestamp()
      });

      setForm({
        title: "",
        content: ""
      })

    } catch (err) {
      console.log(err);
    }


  }

  const removeNote = async (id) => {
    if (!window.confirm("Are you sure want to delete?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "notes", id));

    } catch (err) {
      console.log("Delete Error:", err);
    }
  }

  const togglePin = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "notes", id), {
        pinned: !currentStatus
      })
    }
    catch (err) {
      console.log(err);
    }
  }


  if (Loaders) {
    return <Loader setLoaders={setLoaders} />
  }


  //Pagination show logic
  const indexOfLastNote = CurrentPageState * NotesperPage;
  const indexofStartNote = indexOfLastNote - NotesperPage;

  const TotalPages = notes != null ? Math.ceil(notes.length / NotesperPage) : 0;//we get here total notes ki length means kitne note create hue ha note we get totalpage show how 







  return <motion.div animate={
    {
      opacity: [0, 0.5, 1]
    }
  }

    transition={{
      duration: 1,
      ease: 'linear'
    }}
    className='  min-h-screen   bg-black text-white'>

    <Navbar signOutNow={signOutNow} signIn={signIn} user={user} />


    <Routes>
      <Route path='/'
        element={<div>

          {!user && <LandingPage signIn={signIn} />}

          {user && <h1 className='userWelcome text-center px-6   font-sans text-green-800 text-5xl'>Welcome to NoteMaking </h1>}
          <div

            className='flex justify-center items-center flex-col  gap-7  flex-wrap'>
            {user && <section className='p-6  '>
              <h1 className='text-4xl userWelcome createnote ml-3  mb-2'>Create Your note!</h1>
              <form onSubmit={createNote} className='noteform'>

                <div>
                  <input type="text" className=' text-black border-2  w-96  outline-none focus:border-2  focus:border-sky-600 rounded-md  py-4 px-10' autoFocus required placeholder='Enter title here...' value={form.title} onChange={(e) =>

                    setForm((f) => ({ ...f, title: e.target.value }))



                  } />
                </div>

                <div className='mt-4'>
                  <textarea value={form.content} cols={40} rows={10} className='text-black outline-none w-96 p-4 rounded-md font-medium' placeholder='Write Your note...' onChange={(e) =>
                    setForm((f) => ({ ...f, content: e.target.value }))
                  } ></textarea>
                </div>

                <button type='submit' className='bg-green-600 font-normal text-base  border-none rounded-md px-5 py-2'>Add Note </button>

              </form>


            </section>
            }

            <section className='YourNote'>
              {user &&
                <h2 className='text-5xl text-center  relative bottom-12 left-5 my-5 text-blue-600'>Your Note</h2>
              }
              {
                loading && user ? <p className='text-white'>loading...</p> : <ul className='notesdata'>
                  {
                    notes && notes.slice(indexofStartNote, indexOfLastNote).map((d) => {
                      return <li className='my-2 flex gap-4 bg-white/10 backdrop-blur-lg shadow-lg  rounded-full border p-4 border-white/20 ' key={d.id}>
                        <p className='text-3xl'>
                          {d.title}</p>
                        <button className={`px-3 ml-3 py-1 rounded-md ${d.pinned ? "bg-yellow-300" : "bg-gray-600"}`}
                          onClick={() => {
                            togglePin(d.id, d.pinned)
                          }}
                        >  {d.pinned ? "Unpin ⭐" : "Pin ☆"}</button>

                        <button className='mx-4 bg-blue-600 font-normal text-base  border-none rounded-md px-3 py-1' onClick={() => {
                          navigate('/view', { state: { ID: d.id, Notes: d.content, title: d.title } })
                        }}>View</button>
                        <button className=' mx-4 bg-red-600 font-normal text-base  border-none rounded-md px-3 py-1' onClick={() => { removeNote(d.id) }}>Delete</button>



                      </li>
                    })

                  }


                </ul>
              }

              {/* Pagination buttons show */}
              {
                user && notes && notes.length > NotesperPage && (
                  <div className='flex justify-center gap-2 mt-4 flex-wrap'>

                    <button className='bg-gray-700 px-4 py-2 rounded  disabled:opacity-50' disabled={CurrentPageState == 1}
                      onClick={() => {
                        setCurrentPageState(prev => prev - 1)
                      }}>Previous</button>

                    {
                      Array.from({ length: TotalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page} className={`px-4 py-2 rounded ${CurrentPageState == page ? "bg-blue-600" : "bg-gray-700"}`}
                          onClick={() => { setCurrentPageState(page) }}
                        >
                          {page}   </button>
                      ))
                    }
                    <button className='bg-gray-700 px-4 py-2 rounded disabled:opacity-50' disabled={CurrentPageState == TotalPages}
                      onClick={() => {
                        setCurrentPageState(prev => prev + 1)
                      }}
                    >Next</button>
                  </div>



                )
              }
            </section>
          </div>
        </div>} />

      <Route path='/view' element={<View />} />
    </Routes>

  </motion.div>




}


export default App;

// ...f spread operator which keeps the previous value of f 