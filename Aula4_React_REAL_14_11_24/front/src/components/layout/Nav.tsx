import { Link } from "react-router-dom";
import "./nav.css";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pages/produto/cadastrar"> Cadastrar Produto </Link>
        </li>
        <li>
          <Link to="/pages/produto/listar"> Listar Produtos </Link>
        </li>
        <li>
          <Link to="/pages/categoria/listar"> Detalhes das Categorias </Link>
        </li>
        <li>
          <Link to="/pages/endereco/consultar">
            Consultar Endereço
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
