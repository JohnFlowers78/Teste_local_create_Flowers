import { Categoria } from "./Categoria";

export interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  criadoEm?: string;
  categoriaId: number;
  categoria?: Categoria;
}