const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    try {
        let usuario = await prisma.usuario.create({
            data: req.body
        })
        res.status(201).json(usuario).end()

    } catch (error) {
        res.status(200).send(error).end()
    }

}

const read = async (req, res) => {
    let usuario = await prisma.usuario.findMany()
    res.status(200).json(usuario).end()
}

const readOne = async (req, res) => {

    let usuario = await prisma.usuario.findUnique({
        where: {
            id: Number(req.body.id)
        }
    })

    if (usuario != null) {
        res.status(200).json(usuario).end()
    } else {
        res.status(200).send({ menssagem: "usuario não encontrado" })
    }
}

const update = async (req, res) => {
    try {
        let usuario = await prisma.usuario.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        })

        res.status(200).send({ menssagem: `Usuario ${usuario.nome} foi atualizado com sucesso` }).end()
    } catch (error) {
        res.status(200).send({ menssagem: `Erro ${error.code}, usuário não foi encontrado` }).end()
    }

}

const eliminate = async (req, res) => {
    try {
        let usuario = await prisma.usuario.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(200).send({ menssagem: `Usuario ${usuario.nome} foi excluido com sucesso` }).end()
    } catch (error) {
        res.status(200).send({ menssagem: `Erro ${error.code}, usuário não foi encontrado` }).end()
    }
}

const login = async (req, res) => {

    try {
        let usuario = await prisma.usuario.findUnique({
            where: {
                email: req.body.email,
                senha: req.body.senha
            }
        })
        res.status(200).send({ menssagem: `login do usuario ${usuario.nome} efetuado com sucesso` }).end()
    } catch (error) {
        res.status(200).send({ menssagem: "erro" }).end()
    }

}

module.exports = {
    create,
    read,
    update,
    eliminate,
    readOne,
    login
}