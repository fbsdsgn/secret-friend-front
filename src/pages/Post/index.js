import axios from "axios"
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from "react-router-dom"

import Header from '../../components/Header'

import './style.css'

const validationPost = yup.object().shape({
  name: yup.string().required("O título é obrigatório").max(40, "O Nome precisa ter menos de 40 caracteres"),
  email: yup.string().email("Formato de Email Inválido").required("O email é obrigatório")
})


const Post = () => {
  const history = useHistory()

  const { register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationPost)
  })

  const addFriend = (data) => axios.post("http://localhost:3001/api/friends", data)
    .then((res) => {
      console.log(res.data)
      history.push("/")

    }).catch(err => {
      console.log(err)
    })

  return (
    <div>
      <Header />
      <main>
        <div className="card-post">
          <h1>Cadastro</h1>

          <div className="row-post">
          </div>
          <div className="card-body-post">

            <form onSubmit={handleSubmit(addFriend)}>
              <div className="fields">
                <label>Nome</label>
                <input type="text" name="name" placeholder="Insira o Seu nome" {...register("name")} />
                <p className="error-message">{errors.name?.message}</p>
              </div>

              <div className="fields">
                <label>Email</label>
                <input type="text" name="email" placeholder="Insira o seu email" {...register("email")} />
                <p className="error-message">{errors.email?.message}</p>
              </div>

              <div className="btn-post">
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </div>
        </div >

      </main >
    </div >
  )

}

export default Post