const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createFavoritos = async (req, res) => {
    const usuario = await prisma.usuario.findUnique({
        where: { id: Number(req.params.idUsuario) }
    })

    const encontro = await prisma.encontro.findUnique({
        where: {
            id: Number(req.params.idEncontro)
        }
    })

    const favorito = await prisma.favoritos.create({
        data: {
            idUsuario: usuario.id,
            idEncontro: encontro.id
        }
    })
    res.status(201).json(favorito).end()
}

const readFavorito = async (req, res) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: Number(req.params.idUsuario)
        },
        select: {
            favoritos: true
        }
    })
    res.status(200).json(usuario).end()
}

const removerFavorito = async (req, res) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: Number(req.params.idUsuario)
        },
        select: {
            favoritos: true
        }
    })

    let escolhido = usuario.favoritos.filter(e => e.idEncontro == Number(req.params.idEncontro))

    const favorito = await prisma.favoritos.delete({
        where: {
            id: escolhido[0].id
        }
    })
    res.status(200).json(usuario).end()
}

module.exports = {
    createFavoritos,
    readFavorito,
    removerFavorito
}