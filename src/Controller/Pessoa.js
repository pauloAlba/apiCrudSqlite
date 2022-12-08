import { openDB } from "../configDB.js";

// CRIA UMA TABELA
export async function createTable() {
  openDB().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS Pessoa ( id INTEGER PRIMARY KEY, nome TEXT, idade INTEGER)"
    );
  });
}
// VER TODOS OS REGISTROS PRESENTES NO BANCO DE DADOS
export async function selectPessoas(req, res) {
  openDB().then((db) => {
    db.all("SELECT * FROM Pessoa")
    .then(pessoas => res.json(pessoas))
  });
}

// VER SOMENTE UM REGISTRO PRESENTE NO BANCO DE DADOS
export async function selectPessoa(req, res) {
  let id = req.body.id
  openDB().then((db) => {
    db.get("SELECT * FROM Pessoa WHERE id=?", [id])
    .then(pessoa => res.json(pessoa))
  });
}

// INSERE DADOS EM UMA TABELA
export async function insertPessoa(req, res) {
  let pessoa = req.body
  openDB().then((db) => {
    db.run("INSERT INTO Pessoa (nome, idade) VALUES (?,?)", [
      pessoa.nome,
      pessoa.idade,
    ]);
  });
  res.json({
    "statusCode": 200
  })
}

// ATUALIZAR DADOS EM UMA TABELA
export async function updatePessoa(req, res) {
  let pessoa = req.body
  openDB().then((db) => {
    db.run("UPDATE Pessoa SET nome=?, idade=? WHERE id=?", [
      pessoa.nome,
      pessoa.idade,
      pessoa.id,
    ]);
  });
  res.json({
    "statusCode": 200
  })
}
// DELETA SOMENTE UM REGISTRO PRESENTE NO BANCO DE DADOS
export async function deletePessoa(req, res) {
  let id = req.body.id
  openDB().then((db) => {
    db.get("DELETE FROM Pessoa WHERE id=?", [id])
    .then(res => res)
  });
  res.json({
    "statusCode": 200
  })
}


