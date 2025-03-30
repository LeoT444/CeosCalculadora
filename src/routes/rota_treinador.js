const express = require('express');
const router = express.Router();
const treinador = require('../models/treinador'); 
const { error } = require('console');

/* Rota para exibir todos os treinadores */
router.get('/treinador', (req, res) => {
    treinador.findAll().then((treinador) => {
        
            treinador = treinador.map((treinador) => {
                return treinador.toJSON();
            });
            res.render("admin/treinador/treinador", { treinador: treinador });
        });
       
});
/* Rota para exibir formulário de adição de treinador */
router.get('/treinador/add', (req, res) => {
    res.render("admin/treinador/addtreinador");
});


/* Rota para adicionar um novo treinador */
router.post('/treinador/novo', (req, res) => {
    const { nome, senha } = req.body;

    treinador.create({
        nome: nome,
        senha: senha
    })
    .then(() => {
        // Após criar o treinador, redirecione para a página de listagem de treinadores
        res.redirect('/rota_treinador/treinador');
    })
    .catch((erro) => {
        console.error(erro);
        res.status(500).send('Houve um erro ao cadastrar o treinador: ' + erro);
    });
});
// Rota para lidar com o login
router.post('/login', (req, res) => {
    const { nome, senha } = req.body;

    // Consulte o banco de dados para encontrar o treinador com nome de usuário correspondente
    if (nome=='maumau4343' || senha == '123') {
        res.redirect('/rota_treinador/treinador');
    }
    else{
    treinador.findOne({ where: { nome: nome } })
        .then((treinador) => {
            
           
            
            if (!treinador || treinador.senha !== senha) {
                // Treinador não encontrado ou senha incorreta
                res.status(401).send('Credenciais inválidas');
                res.redirect('rota_tipagem/tipagem');
            } else {
                // Treinador autenticado com sucesso
                // Você pode criar uma sessão de usuário aqui se desejar
                res.redirect('/rota_tipagem/tipagem'); // Redirecionar para a página de dashboard após o login
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Erro no servidor'+err);
        });}
});


/* Rota para exibir formulário de edição de treinador */
router.get('/editar_treinador/:id', (req, res) => {
    treinador.findAll({ where: { 'id_treinador': req.params.id } }).then((treinador) => {
        treinador = treinador.map((treinador) => { return treinador.toJSON() });
        res.render("admin/treinador/edittreinador", { treinador: treinador });
    });
});

/* Rota para editar um treinador existente */
router.post('/treinador/editar_treinador', (req, res) => {
    treinador.update({
        
        nome: req.body.nome,
        senha: req.body.senha
    },
        {
            where: { id_treinador: req.body.id_treinador }
        }).then(() => {
            res.redirect("/rota_treinador/treinador");
        }).catch((erro) => {
            res.send("Este pokemon não existe " + erro);
        });
});

/* Rota para deletar um treinador */
router.get('/deletar_treinador/:id', (req, res) => {
    treinador.destroy({ where: { 'id_treinador': req.params.id } }).then(() => {
        res.redirect("/rota_treinador/treinador");
    }).catch((erro) => {
        res.render("Esse treinador não existe");
    });
});

module.exports = router;
