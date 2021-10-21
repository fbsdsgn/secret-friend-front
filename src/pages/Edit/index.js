import axios from "axios"
import React, { useState, useEffect } from 'react'
import * as yup from "yup";

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory, useParams } from "react-router-dom"

import Header from '../../components/Header'


const validationPost = yup.object().shape({
  name: yup.string().required("O nome é obrigatório").max(40, "O nome precisa ter menos de 40 caracteres"),
  email: yup.string().email("Formato de email incorreto").required("O email é obrigatório")
})

const Edit = () => {

  const { id } = useParams()

  const history = useHistory()

  const { register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationPost)
  })

  const editFriend = data => axios.put(`http://localhost:3001/api/friends/${id}`, data)
    .then(() => {
      history.push("/")
    })
    .catch(err => {
      console.log(err)
    })
  useEffect(() => {
    axios.get(`http://localhost:3001/api/friends/${id}`)
      .then((res) => {
        reset(res.data)
      })
  }, [])

  return (
    <div>
      <Header />
      <main>
        <div className="card-post">
          <h1>Editar Informação</h1>  
          <div className="row-post">
          </div>
          <div className="card-body-post">

            <form onSubmit={handleSubmit(editFriend)}>
              <div className="fields">
                <label>Nome</label>
                <input type="text" name="name" {...register("name")} />
                <p className="error-message">{errors.name?.message}</p>
              </div>

              <div className="fields">
                <label>Email</label>
                <input type="text" name="email" {...register("email")} />
                <p className="error-message">{errors.email?.message}</p>
              </div>

              <div className="btn-post">
                <button type="submit">Atualizar Cadastro</button>
              </div>
            </form>
          </div>
        </div >

      </main >
    </div>
  )
}

export default Edit