import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import './style.css'
import More from '../../images/more.svg'
import HeaderMain from "../../components/HeaderMain/"

const List = () => {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/api/friends")
      .then((res) => {
        setFriends(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const deleteFriend = (id) => {
    axios.delete(`http://localhost:3001/api/friends/${id}`)
    setFriends(friends.filter(friend => friend.id !== id))
  }

  return (
    <div>
      <HeaderMain />
      <main>
        <div className="cards">
          {friends.map((friend, key) => {
            return (
              <div className="card" key={key}>
                <header>
                  <h2>{friend.name}</h2>
                  <img src={More} alt="Mais" />
                </header>

                <div className="row"></div>

                <p>{friend.email}</p>

                <div className="btns">
                  <div className="btn-edit">
                    <Link to={{ pathname: `/edit/${friend.id}` }}>
                      <button>Edit</button>
                    </Link>
                  </div>
                  <div className="btn-delete">
                    <button onClick={() => deleteFriend(friend.id)}>Delete</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default List