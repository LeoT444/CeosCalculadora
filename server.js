const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const tarefasController = require('./controllers/tarefasController');
const app = express();
// Configuração do Handlebars 
app.engine(
    'handlebars',
    exphbs.engine({
        defaultLayout: 'layout',
        layoutsDir: path.join(__dirname, 'views'),
        partialsDir: path.join(__dirname, 'views/partials')
    })
);
app.set('view engine', 'handlebars');
// Middlewares 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Rotas 
app.get('/', tarefasController.exibirLista);
app.get('/tarefas/adicionar', tarefasController.exibirAdicionarTarefa);
app.post('/tarefas', tarefasController.adicionarTarefa);
app.get('/tarefas/:id/editar', tarefasController.exibirEdicao);
app.post('/tarefas/:id/editar', tarefasController.editarTarefa);
app.get('/tarefas/:id/excluir', tarefasController.excluirTarefa);
// Servidor 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Ronaldo em http://localhost:${PORT}`);
}); 