import { Link } from 'react-router-dom'
import axios from "axios"
import React, { useState, useEffect } from 'react'
import './style.css'
const HeaderMain = () => {
  const [sent, setSend] = useState(false)

  const handleSend = async () => {
    setSend(true)
    try {
      await axios.post("http://localhost:3001/api/sendmail")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>Econdos</h1>
        </div>
        {!sent ? (
          <div className="btn-header" >
            <button onClick={() => handleSend()}>Sortear Amigo Secreto</button>
          </div>
        ) :
          <p onClick={() => setSend(!true)}>Verifique seu email</p>
        }

        <div className="btn-post">
          <Link to="/friends">
            <button>Cadastra-se</button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default HeaderMain