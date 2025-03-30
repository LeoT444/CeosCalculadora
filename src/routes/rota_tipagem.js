/*1°) Importações*/
const express = require('express');
const router = express.Router();
//vamos carregar nosso modelo
const tipagem = require("../models/Tipagem");
const pokemon = require("../models/Pokemon");
/*_____________ Rotas da tipagem __________________ */
/*2°) Abre e carrega todas informações de tipagem no formulário
tipagem.handlebars */
router.get('/tipagem', (req, res) => {
    tipagem.findAll().then((tipagem) => {
        tipagem = tipagem.map((tipagem) => {
            return tipagem.toJSON();
        });
        res.render("admin/tipagem/tipagem", { tipagem: tipagem });
    });
});
/*3°) Abre o Formulário addtipagem.handlebars */
router.get('/tipagem/add', (req, res) => {
    res.render("admin/tipagem/addtipagem");
});
/*4°) Abre e preenche o formulário edittipagem.handlebars com informações
do id passado */
router.get('/editar_tipagem/:id', (req, res) => {
    tipagem.findAll({ where: { 'id_tipagem': req.params.id } }).then((tipagem) => {
        tipagem = tipagem.map((tipagem) => { return tipagem.toJSON() });
        res.render("admin/tipagem/edittipagem", { tipagem: tipagem });
    });
});
/*5°) Recebe as informações do botão que está no addtipagem.handlebar
e efetua o cadastro no banco de dados, depois ele volta para a listagem
das tipagem*/
router.post('/tipagem/nova', (req, res) => {
    tipagem.create({
        descricao: req.body.descricao
    }).then(() => {
        res.redirect("/rota_tipagem/tipagem");
    }).catch((erro) => {
        res.send('Houve um erro: ' + erro);
    });
});
/*6°) Recebe as informações do botão que está no edittipagem.handlebar
e efetua a alteração no banco de dados. Volta para listagem das tipagem*/
router.post('/tipagem/editar_tipagem', (req, res) => {
    tipagem.update({
        descricao: req.body.descricao
    },
        {
            where: { id_tipagem: req.body.id_tipagem }
        }).then(() => {
            res.redirect("/rota_tipagem/tipagem");
        }).catch((erro) => {
            res.send("Esta tipagem não existe " + erro);
        });
});
/*7°) No form tipagem.handlebars que lista as tipagem possui um botão para
deletar
Ele deleta informação e refaz a lista no tipagem.handlebars*/
router.get('/deletar_tipagem/:id', (req, res) => {
    pokemon.destroy({where: {'fk_tipagem': req.params.id}})
    pokemon.destroy({where: {'fk_tipagem2': req.params.id}})
    tipagem.destroy({ where: { 'id_tipagem': req.params.id } }).then(() => {
        res.redirect("/rota_tipagem/tipagem");
    }).catch((erro) => {
        res.render("Essa tipagem não existe");
    });
});
/*______ Fim das rotas da tipagem ___________ */
module.exports = router;
