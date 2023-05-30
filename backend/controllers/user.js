import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios(`nome`, `email`, `fone`, `data_nascimento`) VALUES(?,?,?,?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
  ];

  db.query(q, values, (err) => {
    if (err) return res.json(err);

    return res.status(200).json(`Usuário criado com sucesso.`);
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
    req.params.id
  ];

  db.query(q, values, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};

export const checkEmail = (req, res) => {
  const q = "SELECT * FROM usuarios WHERE `email` = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);

    if (data.length > 0) {
      return res.status(200).json({ exists: true, user: data[0] });
    } else {
      return res.status(200).json({ exists: false });
    }
  });
};

export const searchUsers = (req, res) => {
  const keyword = req.query.keyword;
  const type = req.query.type;

  let q;

  switch (type) {
    case "nome":
      q = `SELECT * FROM usuarios WHERE nome LIKE '%${keyword}%'`;
      break;
    case "email":
      q = `SELECT * FROM usuarios WHERE email LIKE '%${keyword}%'`;
      break;
    case "fone":
      q = `SELECT * FROM usuarios WHERE fone LIKE '%${keyword}%'`;
      break;
    default:
      return res.status(400).json("Tipo de pesquisa inválido.");
  }

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};