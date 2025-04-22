import { useEffect, useState } from "react";
import { Categoria } from "../../../models/Categoria";
import styles from "./CategoriaLista.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function CategoriaLista() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    fetch("http://localhost:5020/api/categoria/listar")
      .then((resposta) => {
        return resposta.json();
      })
      .then((categorias) => {
        setCategorias(categorias);
      });
  });

  function deletar(categoriaId: string) {
    axios
      .delete(`http://localhost:5020/api/categoria/deletar/${categoriaId}`)
      .then((resposta) => {
        console.log(resposta.data);
      });
  }

  return (
    <div className="container">
      <h1>
        Lista de Categorias   /   
        <Link to={`/pages/categoria/cadastrar`}>
            Cadastrar Nova Categoria
        </Link>
      </h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Alterar</th>
            <th>Deletar</th>  
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.categoriaId}>
              <td>{categoria.categoriaId}</td>
              <td>{categoria.nome}</td>
              <td>
                <Link to={`/pages/categoria/alterar/${categoria.categoriaId}`}>
                  Alterar
                </Link>
              </td>
              <td>
                <button onClick={() => deletar(categoria.categoriaId!)}>
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriaLista;
