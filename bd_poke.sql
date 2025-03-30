create	 database escola;
use escola;
CREATE TABLE tipagem (
    id_tipagem INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50),
    createdAt DATETIME,
    updatedAt DATETIME
);
CREATE TABLE pokemon (
    id_pokemon INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    numero_pk INTEGER,
    nome VARCHAR(100),
    fk_tipagem INT,
    fk_tipagem2 INT,
    createdAt DATETIME,
    updatedAt DATETIME,
    INDEX pokemon_FKIndex1 (fk_tipagem),
    FOREIGN KEY (fk_tipagem)
        REFERENCES tipagem (id_tipagem)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    INDEX pokemon_FKIndex2 (fk_tipagem2),
    FOREIGN KEY (fk_tipagem2)
        REFERENCES tipagem (id_tipagem)
        ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE TABLE treinador (
    id_treinador INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    createdAt DATETIME,
    updatedAt DATETIME
);

insert into tipagem values(default, "Informática", now(), now());
insert into tipagem values(default, "Recursos Humanos",now(), now());
insert into pokemon values(default, 04453,'Jose', 1,default, now(), now());
insert into pokemon values(default, 04454,'Matheus', 2,1, now(), now());
insert into pokemon values(default, 04455,'Guilherme', 1,2, now(), now());
insert into pokemon values(default, 04456,'Gael', 2,default, now(), now());
SELECT 
    *
FROM
    tipagem;
SELECT 
    *
FROM
    pokemon;
SELECT 
    *
FROM
    treinador;
SELECT 
    a.id_pokemon AS id_pokemon,
    a.numero_pk AS numero_pk,
    a.nome AS nome,
    t.descricao
FROM
    pokemon AS a
        INNER JOIN
    tipagem AS t ON a.fk_tipagem = t.id_tipagem;

CREATE VIEW selecpokemon AS
    SELECT 
        a.id_pokemon AS id_pokemon,
        a.numero_pk AS numero_pk,
        a.nome AS nome,
        t.descricao AS tipo1,
        t2.descricao AS tipo2
    FROM
        pokemon AS a
            INNER JOIN
        tipagem AS t ON a.fk_tipagem = t.id_tipagem
            LEFT JOIN
        tipagem AS t2 ON a.fk_tipagem2 = t2.id_tipagem;
SELECT 
    *
FROM
    selecpokemon;