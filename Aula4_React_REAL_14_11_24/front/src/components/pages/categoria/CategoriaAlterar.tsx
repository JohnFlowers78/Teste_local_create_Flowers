import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Categoria } from "../../../models/Categoria";

function CategoriaAlterar() {
  const { categoriaId } = useParams();
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (categoriaId) {
      axios
        .get<Categoria>(
          `http://localhost:5020/api/categoria/buscar/${categoriaId}`
        )
        .then((resposta) => {
          setNome(resposta.data.nome);
        });
    }
  }, []);

  function enviarCategoria(e: any) {
    e.preventDefault();

    const categoria: Categoria = {
      nome: nome,
    };

    axios
      .put(`http://localhost:5020/api/categoria/alterar/${categoriaId}`, categoria)
      .then((resposta) => {
        console.log(resposta.data);
      });
  }

  return (
    <div id="alterar-categoria" className="container">
      <h1>Alterar Categoria</h1>
      <form onSubmit={enviarCategoria}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            required
            onChange={(e: any) => setNome(e.target.value)}
          />
        </div>
        <button type="submit">alterar Categoria</button>
      </form>
    </div>
  );
}

export default CategoriaAlterar;