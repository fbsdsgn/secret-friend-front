import axios from "axios"
import React, { useState, useEffect } from 'react'
import * as yup from "yup";

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory, useParams } from "react-router-dom"

import Header from '../../components/Header/'


const validationPost = yup.object().shape({
  title: yup.string().required("O título é obrigatório").max(40, "O título precisa ter menos de 40 caracteres"),
  description: yup.string().required("A descrição é obrigatório").max(150, "A descrição precisa ter menos de 150 caracteres"),
  content: yup.string().required("O conteúdo é obrigatório").max(500, "O conteúdo precisa ter pelo menos 500 caracteres")
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

  const addPost = data => axios.put(`http://localhost:3001/friends/${id}`, data)
    .then(() => {
      history.push("/")
    })
    .catch(err => {
      console.log(err)
    })
  useEffect(() => {
    axios.get(`http://localhost:3001/friends/${id}`)
      .then((res) => {
        reset(res.data)
      })
  }, [])

  return (
    <div>
      <Header />
      <main>
        <div className="card-post">
          <h1>Cadastrar Amigos</h1>
          <div className="row-post">
          </div>
          <div className="card-body-post">

            <form onSubmit={handleSubmit(addPost)}>
              <div className="fields">
                <label>Titulo</label>
                <input type="text" name="title" {...register("title")} />
                <p className="error-message">{errors.title?.message}</p>
              </div>

              <div className="fields">
                <label>Descrição</label>
                <input type="text" name="description" {...register("description")} />
                <p className="error-message">{errors.description?.message}</p>
              </div>

              <div className="fields">
                <label>Conteúdo</label>
                <textarea type="text" name="content" {...register("content")} />
                <p className="error-message">{errors.content?.message}</p>
              </div>

              <div className="btn-post">
                <button type="submit">Enviar</button>
              </div>
            </form>
          </div>
        </div >

      </main >
    </div>
  )
}

export default Edit