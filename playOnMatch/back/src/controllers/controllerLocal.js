const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    try {
        let local = await prisma.local.create({
            data: req.body
        })
        res.status(201).json(local).end()

    } catch (error) {
        res.status(404).send({ menssagem: "erro" }).end()
    }

}

const readAll = async (req, res) => {
    let local = await prisma.local.findMany()
    res.status(200).json(local).end()
}

const readOne = async (req, res) => {
    let local = await prisma.local.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })

    if (local != null) {
        res.status(200).json(local).end()
    } else {
        res.status(200).send({ menssagem: "erro" }).end()
    }
}

const update = async (req, res) => {
    try {
        let local = await prisma.local.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        })

        res.status(200).send({ menssagem: `local de id ${local.id} foi atualizado com sucesso` }).end()
    } catch (error) {
        res.status(200).send({ menssagem: `Erro ${error.code}, id do local não foi achado` }).end()
    }

}

const del = async (req, res) => {
    try {
        let local = await prisma.local.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(200).send({ menssagem: `local de id ${local.id} foi excluido com sucesso` }).end()
    } catch (err) {
        res.status(200).send({ menssagem: "erro" }).end()
    }
}

module.exports = {
    create,
    readAll,
    readOne,
    del,
    update
}