// Antes de iniciar a criação do servidor com Node.js e Express, precisamos incializar o npm: npm init -y
// Após, precisamos instalar o express, pra isso, usamos:
// npm install express (no terminal)

// EXPRESS -> Framework para Node.js que facilita a criação de servidores e APIs.

// Importa a biblioteca Express dentro do projeto
const express = require("express");

// Cria a aplicação Express (assim teremos acesso aos recursos do framework)
const app = express();

// Define a porta onde o servidor será executado
const PORT = 3000;

// Middleware próprio do Express que permite a aplicação enteder dados enviados em formato JSON (principalmete nas requisições do tipo POST e PUT)
app.use(express.json())

// Criando um Endpoint (ponto de acesso ao servidor/API)
// app -> aplicação express
// .get -> método http
// "/" -> rota/caminho
// (req, res) -> fimção com parametros de requisição e resposta
// res.send -> respsota
app.get("/", (req, res) => {
    // Envia uma resposta simples para o navegador
    res.send("Servidor Express funcionando");
});

// parâmetros de rota (acessar um item especifico
app.get("/produtos/:id", (req, res) => {
    // re.params captura parâmetros enviados pela URL
    // neste caso, queremos o parâmetro: ID
    const id = req.params.id

    // Resposta 
    res.json({
        mensagem: "Produto encontrado",
        id: id
    });
});


// Metodo get + rota de produtos para listar produtos específicos
app.get("/produtos", (req, res) => {
    res.json([
        {id: 1, nome: "Notebook", preco: 7000},
        {id: 2, nome: "Mouse", preco: 80}
    ]);
});

// Método put + rota de produtos
app.post("/produtos", (req, res) => {
    const novoProduto = req.body;

    res.json({
        mensagem: "Produto cadastrado com sucesso",
        produto: novoProduto
    });
});

// Método put + rota de produtos
app.put("/produtos", (req, res) => {
    const dadosAtualizados = req.body;
    res.json({
        mensagem: "Produto atualizado",
        dados: dadosAtualizados
    });
});

// Método delete + rota de produtos
app.delete("/produtos/:id", (req, res) => {
    const id = req.params.id;
    res.json({
        mensagem: "Produto removido com sucesso",
        id: id
    });
});



// metodo get + rota de usuários para lista usuários cadastrados
app.get("/usuarios", (req, res) => {
    res.json([
        {id: 1, nome: "Ana"},
        {id: 2, nome: "Gabriel"}
    ])
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});