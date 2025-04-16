import { useEffect, useState } from "react";
import { Categoria } from "../../../models/Categoria";
import axios from "axios";
import { Produto } from "../../../models/Produto";

function ProdutoCadastro() {

  const [ categorias, setCategorias ] = useState<Categoria[]>([]);
  const [ nome, setNome ] = useState("");
  const [ descricao, setDescricao ] = useState("");
  const [ quantidade, setQuantidade ] = useState("");
  const [ preco, setPreco ] = useState("");
  const [ categoriaId, setCategoriaId ] = useState(0);

  useEffect(() => {
    axios
      .get<Categoria[]>("http://localhost:5020/api/categoria/listar")
      .then((resposta) => {
        setCategorias(resposta.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  });

  function enviarProduto(e: any) {
    e.preventDefault();

    const produto: Produto = {
      nome: nome,
      descricao: descricao,
      quantidade: Number(quantidade),
      preco: Number(preco),
      categoriaId: categoriaId,
    }

    axios
      .post("http://localhost:5020/api/produto/cadastrar", produto)
      .then((resposta) => {
        console.log("O Produto Foi Cadastrado!", resposta.data);
      })
      .catch((erro) => {
        console.log("Erro na tentativa de cadastro.", erro);
      });
  }

  return (
    <div id="cadastrar_produto" className="container">
      <h1>Cadastrar Produto</h1>
      <form onSubmit={enviarProduto}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
           id="nome"
           type="text"
           name="nome"
           required
           onChange={(e: any) => setNome(e.target.value)} />
        </div>
        <div>
          <label htmlFor="quantidade">Quantidade</label>
          <input
           id="quantidade"
            type="text"
             name="quantidade"
              onChange={(e: any) => setQuantidade(e.target.value)} />
        </div>
        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
           id="descricao"
            type="text"
             name="quantidade"
              onChange={(e: any) => setQuantidade(e.target.value)} />
        </div>
        <div>
          <label htmlFor="preco">Preço unit.</label>
          <input
           id="preco"
            type="text"
             name="preco"
              onChange={(e: any) => setPreco(e.target.value)} />
        </div>
        <button type="submit">Cadastrar Produto</button>
      </form>
    </div>
  )
}

export default ProdutoCadastro;