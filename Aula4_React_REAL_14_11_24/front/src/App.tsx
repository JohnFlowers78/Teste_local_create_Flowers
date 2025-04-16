import React from "react";
import ConsultarCEP from "./components/samples/ConsultarCEP";
import ProdutoLista from "./components/pages/produto/ProdutoLista";
import ProdutoCadastro from "./components/pages/produto/ProdutoCadastro";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProdutoAlterar from "./components/pages/produto/ProdutoAlterar";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div id="app">

      <BrowserRouter>
      
        <Nav />

        <Routes>
          
          <Route path="/" element={<ProdutoLista />} />
          <Route
            path="/pages/produto/listar"
            element={<ProdutoLista />}
          />
          <Route
            path="/pages/produto/cadastrar"
            element={<ProdutoCadastro />}
          />
          <Route
            path="/pages/endereco/consultar"
            element={<ConsultarCEP />}
          />
          <Route
            path="/pages/produto/alterar/:id"
            element={<ProdutoAlterar />}
          />

        </Routes>

        <Footer />

      </BrowserRouter>

    </div>
  );
}

export default App;
