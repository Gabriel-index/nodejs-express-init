// Importa a biblioteca do express
const express = require('express');

// Cria a aplicação express
const app = express();

// Definição da porta do servidor
const PORT = 3000;

// Middleware nativo do express para interprestar JSON
app.use(express.json());

// Middleware de log
function logger(req, res, next) {
    // Exibe o método e a url acessada
    console.log(req.method, req.url);
    next(); //Continua a execução
};

app.use(logger); // Aplica o Middleware em todas as rotas

// Middleware de validação de senha
function verificarAcesso(req, res, next) {
    // Const senha rá armazenar o valor da chave 'senha', que será passado através da URL da requisição
    // LEMBRANDO: query parametters (/admin?senha=...)
    const senha = req.query.body;
    if (senha === '123') {
        next(); // Com a senha correta podemos ir para o posso passo
    } else {
        // Senão, o acesso será negado já com a verificação do middleware, retornando o acesso negado devido a senha incorrerta
        res.status(403).json({
            mensagem: "Acesso negado, senha incorreta"
        })
    }
}

// Array de produtos (produtos em memória)
let produtos = [{
        id: 1,
        nome: "Notebook",
        preco: 7000
    },
    {
        id: 2,
        nome: "Mouse",
        preco: 80
    }
];

// Rota inicial (método GET + rota "/")
app.get("/", (req, res) => {
    res.send("Servidor Express Funcionando");
});

// Rota de exibição de produtos (Método get + rota "/produtos")
app.get("/produtos", (req, res) => {
    res.json({
        Produtos: produtos
    });
});

// Busca de produtos através do ID (Médodo get + rota "/produtos/:id")
app.get("/produtos/:id", (req, res) => {
    // a const id irá armazenar o ID informado nos query parametters da URL da requisição com: /produtos/1 (sendo o produto cujo id = ')
    const id = req.params.id;
    // Assim que o produto for localizado, retorna mensagem e o produto
    res.json({
        mensagem: "Produto encontrado",
        // produtos = array de produtos
        // [] = com os colchetes, posso passar a posição
        // Se o ID do produto é 1, a posição dele no array é 0 (zero)
        // Então precisamo passar com [id-1] 
        produto: produtos[id - 1]
    });
});

// Cadstro de novo produto (método POST + rota "/produtos")
app.post("/produtos", (req, res) => {
    // A const novoProduto irá receber todo  conteúdo do corpo da requisição (body)
    const novoProduto = req.body;
    // .push é um método Javascript para incluir novas informações dentro do meu array, no nosso contexto sendo o array de produtos, enteão: produtos.push(o produto novo)
    produtos.push(novoProduto);
    // Resposta do servidor ao realizar o cadastro, exibindo uma mensagem de confirmação e exibindo os dados do produto novo
    res.json({
        mensagem: "Produto cadastrado com sucesso",
        produto: novoProduto
    })
})

// Atualização de produtos existentes (Método PUT + rota "/produtos")
app.put("/produtos", (req, res) => {
    const dadosAtualizados = req.body;
    produtos = produtos.map(produto => {
        if (produto.id === dadosAtualizados.id) {
            return {
                ...produto,
                preco: dadosAtualizados.preco
            };
        };
        return produto;
    });
    res.json({
        produto: produtos
    });
});

app.delete("/produtos/:id", (req, res) => {
    const id = req.params.id;
    res.json({
        mensagem: "Produto removido com sucesso"
    });
});

// Usando o middleware de verificação de acesso
app.get("/admin", verificarAcesso, (req, res) => {
    res.json({
        mensagem: "Área administrativa acessada"
    });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});