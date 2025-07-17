import React from 'react'
import './Spinner.module.css'
import { useState, useEffect } from 'react'
import { Oval } from 'react-loader-spinner'

export default function Spinner() {

  const [data, setData] = useState(0)


  useEffect(() => { }, [])

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        ></Oval>
      </div>
    </>
  )
}
