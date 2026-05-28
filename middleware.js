// Imporatando a biblioteca
const express = require("express");
// Criando a aplicação Express
const app = express();
// Definição da porta
const PORT = 3000;

// Middleware nativo do Express para que a aplicação interprete requisições recebidas em JSON
app.use(express.json());

// Criando (para a nossa aplicação)m uma requisição do tipo GET, com a rota "/produtos" e programanado para que, a resposta desta requisição, seja: res.json...
app.get("/produtos", (req, res) => {
    res.json({
        mensagem: "Middleware utilizado"
    });
});

// Middleware logger 
// nosso middleware irá interpretar a requisição recebida, interpretar a resposta de dentro do servidor e realizar a ação
// req -> requisição
// res -> respsota
// next -> livera a passagem para a próxima etapa
function logger(req, res, next) {
    // res.method = pega o método da requisição
    // req.url = pega a rota da requisição
    console.log(req.method, req.url);
    next();
};

// aplicando o middleware "logger" em todas as rotas da apliacação
app.use(logger);

// Definição da porta
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})