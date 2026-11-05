const con = require('../db')

const cadastrar = (req, res) => {
    const {usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana} = req.body
    try {
        const sql = 'INSERT INTO usoia (usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana) VALUES (?, ?, ?, ?, ?, ?, ?);'
        con.query(sql, [usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana], 
            (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar uso de ia' })
            } else {
                const novaocorrencia = req.body
                novaocorrencia.id = results.insertId
                res.status(201).json({ message: 'Uso de ia cadastrada com sucesso', event: novaocorrencia })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar uso de ia', details: 'Informe { usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana }' })
    }
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM usoia;'
    con.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao pegar usoia, veja se o XAMPP está ligado' })
        } else {
            res.json(results)
        }
    })
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const chaves = Object.keys(req.body)
    let campos = ''
    const colunas = []
    chaves.forEach((chave) => {
        campos += `${chave} = ?,`
        colunas.push(req.body[chave])
    })
    campos = campos.slice(0, -1) //Remove a ultima virgula
    colunas.push(id)
    const sql = `UPDATE usoia SET ${campos} WHERE id = ?;`
    con.query(sql, colunas, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ erro: 'Erro ao alterar uso de ia, veja se o id existe', msg: err.sqlMessage })
        } else {
            if (results.affectedRows == 1)
                res.json("Uso de ia alterada com sucesso")
            else
                res.status(404).json({ msg: "Nada alerado no banco de dados", erro: results })
        }
    })
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    const sql = 'DELETE FROM usoia WHERE id = ?;'
    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ erro: 'Erro ao excluir dados', msg: err.sqlMessage })
        } else {
            if (results.affectedRows == 1)
                res.json("Uso de ia excluído com sucesso")
            else
                res.status(404).json({ msg: "Nada alerado no banco de dados", erro: results })
        }
    })
}

const resumo = (req, res) => {
    const sql1 = 'SELECT count(*) as "Total" FROM usoia;'
    const sql2 = 'SELECT * FROM usoia;'
    con.query(sql1, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao contar total' })
        } else {
            const resposta = {}
            resposta.media = results
            con.query(sql2, (err, results) => {
                if (err) {
                    console.error(err)
                    res.status(500).json({ error: 'Erro ao buscar ocorrencia' })
                }else{
                    resposta.eventos = results
                    res.json(resposta)
                }
            })
        }
    })
}

module.exports = {
    cadastrar,
    listar,
    alterar,
    excluir,
    resumo
}