import { useState } from "react";
import { Categoria } from "../../../models/Categoria";
import axios from "axios";

function CategoriaCadastro() {

  const [ nome, setNome ] = useState("");

  function enviarCategoria(e: any) {
    e.preventDefault();

    const categoria: Categoria = {
      nome: nome,
    }

    axios
      .post("http://localhost:5020/api/categoria/cadastrar", categoria)
      .then((resposta) => {
        console.log("A Categoria Foi Cadastrada!", resposta.data);
      })
      .catch((erro) => {
        console.log("Erro na tentativa de cadastro.", erro);
      });
  }

  return (
    <div id="cadastrar_categoria" className="container">
      <h1>Cadastrar Categoria</h1>
      <form onSubmit={enviarCategoria}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
           id="nome"
           type="text"
           name="nome"
           required
           onChange={(e: any) => setNome(e.target.value)} />
        </div>
        <button type="submit">Cadastrar Categoria</button>
      </form>
    </div>
  )
}

export default CategoriaCadastro;