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
            idAmigo: idAmigo
        }
    })

    const lista2 = await prisma.lista_amigos.create({
        data: {
            idCriador: idAmigo,
            idAmigo: idCriador
        }
    })
    res.status(200).send({ mensagem: 'solicitação enviada' })
    console.log('solicitação enviada')
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
                    amigo: {
                        select: {
                            id: true,
                            nome: true
                        }
                    },
                    status: true,
                }
            },
        }
    })

    console.log(resposta)

    res.status(200).send(resposta).end()
}

const respostaAmizade = (req, res) => {

    const { RespUsuario } = req.body

    if (RespUsuario === 1) {
        return 1
    } else if (RespUsuario === 2) {
        return 2
    }
}

module.exports = {
    enviarSolicitacaoAmizade,
    responsderSolicitacaoAmizade,
    respostaAmizade
}