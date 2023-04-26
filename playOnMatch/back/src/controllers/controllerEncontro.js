const {
    PrismaClient
} = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    try {

        const encontro = await prisma.encontro.create({
            data: req.body
        });

        const encontroUsuario = await prisma.encontroUsuario.create({
            data: {
                id_encontro: encontro.id,
                idCriadorPartida: Number(req.params.idCriadorPartida),
                idParticipantePartida: Number(req.params.idCriadorPartida)
            },
        });

        res.status(200).send({ mensagem: encontroUsuario }).end()
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: error }).end();
    }
};

const novoParticipante = async (req, res) =>{
    const encontro = await prisma.encontro.findUnique({
        where:{
            id: Number(req.params.idEncontro)
        },
        select:{
            id:true,
            EncontroUsuario:{
                select:{
                    idCriadorPartida:true
                }
            }
        }
    })

    const encontroUsuario = await prisma.encontroUsuario.create({
        data:{
            id_encontro: Number(req.params.idEncontro),
            idCriadorPartida:encontro.EncontroUsuario[0].idCriadorPartida,
            idParticipantePartida: Number(req.params.idNovoParticipante)
        }
    })
    console.log()
    res.status(200).send(encontroUsuario).end()
}

const readAll = async (req, res) => {
    let encontro = await prisma.encontro.findMany({
        select: {
            id: true,
            descricao: true,
            data: true,
            titulo: true,
            id_local: true,
            local: {
                select: {
                    nome: true,
                    capacidade: true,
                    endereco: true
                }
            },
            EncontroUsuario:{
                select:{
                    idCriadorPartida:true,
                    idParticipantePartida:true
                }
            }
        }
    })
    res.status(200).json(encontro).end()
}

const readOne = async (req, res) => {
    let encontro = await prisma.encontro.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })
    if (encontro != null) {
        res.status(200).json(encontro).end()
    } else {
        res.status(200).send({
            menssagem: "erro"
        }).end()
    }
}

const update = async (req, res) => {
    try {
        let encontro = await prisma.encontro.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        })
        res.status(200).send({
            menssagem: `Encontro de id ${encontro.id} foi atualizado com sucesso`
        }).end()
    } catch (error) {
        res.status(200).send({
            menssagem: `Erro ${error.code}, id do encontro não foi achado`
        }).end()
    }
}

const del = async (req, res) => {
    try {
        let encontro = await prisma.encontro.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(200).send({
            menssagem: `Encontro de id ${encontro.id} foi excluido com sucesso`
        }).end()
    } catch (err) {
        res.status(200).send({
            menssagem: "erro"
        }).end()
    }
}


const postEncontroUsuario = async (req, res) => {

}
module.exports = {
    create,
    novoParticipante,
    readAll,
    readOne,
    del,
    update
}