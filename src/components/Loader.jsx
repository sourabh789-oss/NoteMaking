import { motion } from 'motion/react'
import React, { useEffect } from 'react'

const Loader = ({ setLoaders }) => {



  useEffect(() => {

    const timer = 
      setTimeout(() => {
        setLoaders(false);
      }, 2000)
    


    return () => clearTimeout(timer);


  }, [setLoaders])

  return (
    

    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className=" transition-all  flex items-end gap-[0.3rem]  ">
        <motion.div animate={
          {
            scale:[1,1.2,1],
            y: [0, -10, 0]
          }

        }
          transition={{
            delay:0,
            duration: 0.6,
            ease: "easeInOut",
            repeat: Infinity

          }}
          className="circ"></motion.div>
        <motion.div
          animate={
            {scale:[1,1.2,1],
              y: [0, -10, 0]
            }

          }
          transition={{
            delay:0.1,
            duration: 0.6,
            ease: "easeInOut",
            repeat:Infinity

          }}
          className="circ"></motion.div>
        <motion.div
          animate={
            {scale:[1,1.2,1],
              y: [0, -10, 0]
            }

          }
          transition={{
             delay:0.2,
            duration:0.6,
            ease: "easeInOut",
            repeat: Infinity

          }}
          className="circ"></motion.div>
        <motion.div
          animate={
            {scale:[1,1.2,1],
              y: [0, -10, 0]
            }

          }
          transition={{
             delay:0.3,
            duration:0.6,
            ease: "easeInOut",
            repeat: Infinity

          }}
          className="circ"></motion.div>
        <motion.div
          animate={
            {
               scale:[1,1.2,1],
              y: [0, ,-10, 0]
            }

          }
          transition={{
            delay:0.4,
            duration: 0.6,
            ease: "easeInOut",
            repeat: Infinity

          }}
          className="circ"></motion.div>
      </div>
    </div>
  )
}

export default Loader