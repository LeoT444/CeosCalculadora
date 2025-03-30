const Tarefa = require('../models/Tarefa');

module.exports = {
    async exibirLista(req, res) {
        try {
            // Busca todas as tarefas no banco 
            const tarefas = await Tarefa.findAll();
            // Converte as instâncias do Sequelize em objetos puros 
            const tarefasJSON = tarefas.map((tarefa) => tarefa.toJSON());
            // Renderiza a lista de tarefas 
            res.render('listaTarefas', { tarefas: tarefasJSON });
        } catch (error) {
            console.error("Erro ao listar tarefas:", error);
            res.status(500).send("Erro ao carregar as tarefas.");
        }
    },
    exibirAdicionarTarefa(req, res) {
        res.render('adicionarTarefa');
    },

    async adicionarTarefa(req, res) {
        try {
            // Cria uma nova tarefa no banco 
            await Tarefa.create({ descricao: req.body.descricao });
            res.redirect('/');
        } catch (error) {
            console.error("Erro ao adicionar tarefa:", error);
            res.status(500).send("Erro ao adicionar a tarefa.");
        }
    },

    async exibirEdicao(req, res) {
        try {
            // Busca a tarefa pelo ID 
            const tarefa = await Tarefa.findByPk(req.params.id);

            // Verifica se a tarefa existe 
            if (!tarefa) {
                return res.status(404).send("Tarefa não encontrada.");
            }

            // Converte para JSON e envia para a view 
            const tarefaJSON = tarefa.toJSON();
            res.render('editaTarefa', { tarefa: tarefaJSON });
        } catch (error) {
            console.error("Erro ao carregar tarefa para edição:", error);
            res.status(500).send("Erro ao carregar tarefa para edição.");
        }
    },

    async editarTarefa(req, res) {
        try {
            const { id } = req.params;
            // Atualiza a tarefa no banco de dados 
            const [updatedRows] = await Tarefa.update(
                {
                    descricao: req.body.descricao,
                    concluida: req.body.concluida === 'on'
                },
                { where: { id } }
            );
            // Verifica se alguma linha foi atualizada 
            if (updatedRows === 0) {
                return res.status(404).send("Tarefa não encontrada para edição."); 
            }
            res.redirect('/');
        } catch (error) {
            console.error("Erro ao editar tarefa:", error);
            res.status(500).send("Erro ao editar a tarefa.");
        }
    },

    async excluirTarefa(req, res) {
        try {
            const { id } = req.params;
            // Remove a tarefa do banco de dados 
            const deletedRows = await Tarefa.destroy({ where: { id } });
            if (deletedRows === 0) {
                return res.status(404).send("Tarefa não encontrada para exclusão."); 
            }
            res.redirect('/');
        } catch (error) {
            console.error("Erro ao excluir tarefa:", error);
            res.status(500).send("Erro ao excluir a tarefa.");
        }
    }
}; 