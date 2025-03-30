const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Tarefa = sequelize.define('Tarefa', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    concluida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});
Tarefa.sync({ alter: true }) // Sincroniza a tabela no banco de dados 
    .then(() => console.log("Tabela Tarefa sincronizada!"))
    .catch((err) => console.error("Erro ao sincronizar tabela:", err));
module.exports = Tarefa; 
