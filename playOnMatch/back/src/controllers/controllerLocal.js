const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    try {
        const { descricao, data, titulo, id_local, esporte } = req.body;
        if (!descricao || !data || !titulo || !id_local || !esporte) {
            return res.status(400).send({ mensagem: 'Campos obrigatórios não preenchidos' });
        }

        let local = await prisma.local.create({
            data: {
                descricao,
                data,
                titulo,
                id_local,
                esporte
            }
        })
        return res.status(201).json(local).end()
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensagem: error }).end()
    }

}

const readAll = async (req, res) => {
    let local = await prisma.local.findMany()
    res.status(200).json(local).end()
}

const readOne = async (req, res) => {
    try {
        let local = await prisma.local.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (local) {
            res.status(200).json(local).end()
        } else {
            res.status(404).send({ mensagem: "Local não encontrado" }).end()
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error).end()
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

        res.status(200).send({ mensagem: `local de id ${local.id} foi atualizado com sucesso` }).end()
    } catch (error) {
        res.status(200).send({ mensagem: `Erro ${error.code}, id do local não foi achado` }).end()
    }

}

const del = async (req, res) => {
    try {
        let local = await prisma.local.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(204).send({ mensagem: `local de id ${local.id} foi excluido com sucesso` }).end()
    } catch (err) {
        res.status(200).send({ mensagem: "erro" }).end()
    }
}

module.exports = {
    create,
    readAll,
    readOne,
    del,
    update
}