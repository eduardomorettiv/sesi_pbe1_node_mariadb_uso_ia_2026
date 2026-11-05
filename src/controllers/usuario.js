const con = require('../db')

const login = (req, res) => {
    const { email, senha } = req.body
    const sql = 'SELECT id, nome, email FROM usuario WHERE email = ? AND senha = password(?);'
    con.query(sql, [email, senha], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ erro: 'Erro ao listar usuários' })
        } else {
            if (results.length == 0) {
                res.status(404).json("Acesso negado, credenciais inválidas")
            } else {
                res.json(results)
            }
        }
    })
}

const cadastrar = (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, password(?));'
        con.query(sql, [nome, email, senha], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar usuário, veja se esse email ja existe' })
            } else {
                const novoUsuario = req.body
                novoUsuario.id = results.insertId
                res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: novoUsuario })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar usuário', details: 'Informe { nome, email, senha }' })
    }
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM usuario;'
    con.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({Error: 'Erro ao pegar usuario, veja se o XAMPP está ligado'})
        } else {
            res.json(results)
        }
    })
}

const alterar = (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const sql = 'UPDATE usuario SET nome = ?, email = ?, senha = password(?) WHERE id = ?;'
        con.query(sql, [nome, email, senha, Number(req.params.id)], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao alterar usuário' })
            } else {
                const novoUsuario = req.body
                novoUsuario.id = results.insertId
                res.status(202).json({ message: 'Usuário alterado com sucesso', user: novoUsuario })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao alterar usuário', details: 'Informe { nome, email, senha }' })
    }
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    const sql = 'DELETE FROM usuario WHERE id = ?;'
    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ erro: 'Erro ao excluir usuário', msg: err.sqlMessage })
        } else {
            if (results.affectedRows == 1)
                res.json("Usuário excluído com sucesso")
            else
                res.status(404).json({ msg: "Nada alerado no banco de dados", erro: results })
        }
    })
}

module.exports = {
    login,
    cadastrar,
    listar,
    alterar,
    excluir
}