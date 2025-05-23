//Testar as APIs
// - Rest Client - Extensão do VS Code
// - Postman
// - Insomnia
//MINIMAL APIs - C# - Minimal APIs

using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

List<Produto> produtos =
[
    new Produto() { Nome = "Notebook", Preco = 5000, Quantidade = 54 },
    new Produto() { Nome = "Desktop", Preco = 3500, Quantidade = 150 },
    new Produto() { Nome = "Monitor", Preco = 1200, Quantidade = 15 },
    new Produto() { Nome = "Caixa de Som", Preco = 650, Quantidade = 70 },
];

//EndPoints - Funcionalidades
//Request - Configurar a URL e o método/verbo HTTP
//Reponse - Retornar os dados (json/xml) e códigos de status HTTP
app.MapGet("/", () => "API de Produtos");

//GET: /api/categoria/listar
app.MapGet("/api/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound();
});

//POST: /api/categoria/cadastrar
app.MapPost("/api/categoria/cadastrar", ([FromBody] Categoria categoria,
    [FromServices] AppDataContext ctx) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

app.MapGet("/api/categoria/buscar/{categoriaId}", ([FromRoute] int categoriaId,
 [FromServices] AppDataContext ctx) => 
 {
    Categoria? categoria = ctx.Categorias.Find(categoriaId);
    if (categoria == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(categoria);
 });

app.MapPut("api/categoria/alterar/{categoriaId}", ([FromRoute] int categoriaId, 
[FromBody] Categoria categoriaAlterada, [FromServices] AppDataContext ctx) => 
{
    Categoria? categoria = ctx.Categorias.Find(categoriaId);
    if (categoria == null){
        return Results.NotFound();
    }
    categoria.Nome = categoriaAlterada.Nome;
    ctx.Categorias.Update(categoria);
    ctx.SaveChanges();
    return Results.Ok(categoria);
});

app.MapDelete("/api/categoria/deletar/{categoriaId}", ([FromRoute] int categoriaId, 
[FromServices] AppDataContext ctx) => 
{
    Categoria? categoria = ctx.Categorias.Find(categoriaId);
    if(categoria == null)
    {
        return Results.NotFound();
    }
    ctx.Categorias.Remove(categoria);
    return Results.Ok(categoria);
});

//GET: /api/produto/listar
app.MapGet("/api/produto/listar", ([FromServices] AppDataContext ctx) =>
{

    if (ctx.Produtos.Any())
    {
        return Results.Ok(ctx.Produtos.Include(x => x.Categoria).ToList());
    }
    return Results.NotFound();
});

//GET: /api/produto/buscar/{id}
app.MapGet("/api/produto/buscar/{produtoId}", ([FromRoute] int produtoId,
    [FromServices] AppDataContext ctx) =>
{
    //Expressão lambda em C#
    // Produto? produto = ctx.Produtos.FirstOrDefault(x => x.Nome == "Variável com o nome do produto");
    // List<Produto> lista = ctx.Produtos.Where(x => x.Quantidade > 10).ToList();
    Produto? produto = ctx.Produtos.Find(produtoId);
    if (produto == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(produto);
});

//POST: /api/produto/cadastrar
app.MapPost("/api/produto/cadastrar", ([FromBody] Produto produto,
    [FromServices] AppDataContext ctx) =>
{
    Categoria? categoria = ctx.Categorias.Find(produto.CategoriaId);
    if (categoria is null)
    {
        return Results.NotFound();
    }
    produto.Categoria = categoria;
    ctx.Produtos.Add(produto);
    ctx.SaveChanges();
    return Results.Created("", produto);
});

//DELETE: /api/produto/deletar/{id}
app.MapDelete("/api/produto/deletar/{produtoId}", ([FromRoute] int produtoId,
    [FromServices] AppDataContext ctx) =>
{
    
    Produto? produto = ctx.Produtos.Find((produtoId));
    if (produto == null)
    {
        return Results.NotFound();
    }
    ctx.Produtos.Remove(produto);
    ctx.SaveChanges();
    return Results.Ok(produto);
});

//PUT: /api/produto/alterar/{id}
app.MapPut("/api/produto/alterar/{produtoId}", ([FromRoute] int produtoId,
    [FromBody] Produto produtoAlterado,
    [FromServices] AppDataContext ctx) =>
{
    Produto? produto = ctx.Produtos.Find(produtoId);
    if (produto == null)
    {
        return Results.NotFound();
    }
    Categoria? categoria = ctx.Categorias.Find(produto.CategoriaId);
    if (categoria is null)
    {
        return Results.NotFound();
    }
    produto.Categoria = categoria;
    produto.Nome = produtoAlterado.Nome;
    produto.Quantidade = produtoAlterado.Quantidade;
    produto.Preco = produtoAlterado.Preco;
    ctx.Produtos.Update(produto);
    ctx.SaveChanges();
    return Results.Ok(produto);
});

app.UseCors("Acesso Total");

app.Run();