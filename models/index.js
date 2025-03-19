const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('banco_tarefas', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});
sequelize.authenticate()
    .then(() => console.log("Conexão com o banco de dados bem sucedida!")) 
        .catch((err) => console.error("Erro ao conectar no banco de dados:",
            err));
module.exports = sequelize; 