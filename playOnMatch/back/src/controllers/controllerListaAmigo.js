const {
    PrismaClient
} = require('@prisma/client')

const prisma = new PrismaClient()

const enviarSolicitacaoAmizade = async (req, res) => {
    const idCriador = Number(req.params.idCriador)
    const idAmigo = Number(req.params.idAmigo)

    const lista = await prisma.lista_amigos.create({
        data: {
            idCriador: idCriador,
            idAmigo: idAmigo,
            remetente: idCriador
        }
    })

    const lista2 = await prisma.lista_amigos.create({
        data: {
            idCriador: idAmigo,
            idAmigo: idCriador,
            remetente: idCriador
        }
    })
    res.status(200).send({ mensagem: 'solicitação enviada' })
}

const responsderSolicitacaoAmizade = async (req, res) => {

    const idAmigo = Number(req.params.idAmigo)

    const resposta = await prisma.usuario.findUnique({
        where: {
            id: idAmigo
        },
        select: {
            criadorListaAmigo: {
                select: {
                    idCriador: true,
                    amigo: {
                        select: {
                            id: true,
                            nome: true
                        }
                    },
                    status: true,
                    remetente: true
                }
            },
        }
    })

    res.status(200).send(resposta).end()
}

const updateListaAmigo = async (req, res) => {

    let { RespUsuario } = req.body
    let { idCriadorLista } = req.params
    let { idNovoAmigo } = req.params

    const amigo = await prisma.usuario.findUnique({
        where: {
            id: Number(idNovoAmigo)
        }, select: {
            amigo: true,
            criadorListaAmigo: true
        }
    })

    let findAmigo = amigo.amigo.find(lista => lista.idCriador == idCriadorLista && lista.idAmigo == idNovoAmigo)
    let findDono = amigo.criadorListaAmigo.find(lista => lista.idCriador == idNovoAmigo && lista.idAmigo == idCriadorLista)

    if (RespUsuario == 1) {

        const listaDeQuemRecebeu = await prisma.lista_amigos.update({
            where: { id: findAmigo.id },
            data: { status: 1 }
        })

        const listaAmigoDono = await prisma.lista_amigos.update({
            where: { id: findDono.id },
            data: { status: 1 }
        })
    }

    if (RespUsuario == 2) {
        const listaDeQuemRecebeu = await prisma.lista_amigos.update({
            where: { id: findAmigo.id },
            data: { status: 2 }
        })

        const listaAmigoDono = await prisma.lista_amigos.update({
            where: { id: findDono.id },
            data: { status: 2 }
        })
    }

    res.status(200).json('sucesso').end()
}

const cancelarSolicitacaoAmizade = async (req, res) => {

    const solicitacao = await prisma.lista_amigos.deleteMany({
        where: {
            OR: [
                { id: Number(req.params.idLista1) },
                { id: Number(req.params.idLista2) }
            ]

        }
    })

    res.status(200).json(usuarioLogado).end()
}

module.exports = {
    enviarSolicitacaoAmizade,
    responsderSolicitacaoAmizade,
    updateListaAmigo,
    cancelarSolicitacaoAmizade
}