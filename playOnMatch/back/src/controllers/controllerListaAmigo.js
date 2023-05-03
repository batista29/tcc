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
            amigo: true
        }
    })

    console.log(resposta)

    res.status(200).send(resposta).end()
}

const respostaAmizade = (req, res) => {

    const { RespUsuario } = req.body

    if (RespUsuario === 1) {
        return {
            mensagem: "solicitação de amizade aceita"
        }
    } else if (RespUsuario === 2) {
        return {
            mensagem: "solicitação de amizade rejeitada"
        }
    }
}

module.exports = {
    enviarSolicitacaoAmizade,
    responsderSolicitacaoAmizade,
    respostaAmizade
}