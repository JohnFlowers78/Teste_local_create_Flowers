﻿namespace API.Models;

public class Produto
{
    //C# - Contrutor da classe
    public Produto()
    {
        CriadoEm = DateTime.Now;
    }
    //C# - Atributo com get e set
    public int ProdutoId { get; set; }
    public string? Nome { get; set; }
    public string? Descricao { get; set; }
    public double Preco { get; set; }
    public int Quantidade { get; set; }
    public DateTime CriadoEm { get; set; }
    public Categoria? Categoria { get; set; }
    public int CategoriaId { get; set; }

    //JAVA - Atributo com get e set
    // private double preco;
    // public double getPreco()
    // {
    //     return preco;
    // }
    // public void setPreco(double preco)
    // {
    //     this.preco = preco * 3;
    // }
}
