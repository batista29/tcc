const {
    PrismaClient
} = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    try {
        //cria novo encontro
        const newEncontro = await prisma.encontro.create({
            data: req.body
        });

        // Cria um novo registro para o encontro e os usuários relacionados
        const encontroUsuario = await prisma.encontroUsuario.create({
            data: {
                id_encontro: newEncontro.id,
                idCriadorPartida: Number(req.params.idCriadorPartida),
                idParticipantePartida: Number(req.params.idCriadorPartida)
            },
        });
        res.status(201).send({ mensagem: encontroUsuario }).end()
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: error }).end();
    }
};

const novoParticipante = async (req, res) => {
    const encontro = await prisma.encontro.findUnique({
        where: {
            id: Number(req.params.idEncontro)
        },
        select: {
            id: true,
            EncontroUsuario: {
                select: {
                    idCriadorPartida: true
                }
            }
        }
    })

    if (!encontro) {
        return res.status(404).send({ mensagem: 'Encontro não encontrado' }).end()
    }

    const encontroUsuario = await prisma.encontroUsuario.create({
        data: {
            id_encontro: Number(req.params.idEncontro),
            idCriadorPartida: encontro?.EncontroUsuario[0]?.idCriadorPartida,
            idParticipantePartida: Number(req.params.idNovoParticipante)
        }
    })
    res.status(200).send(encontroUsuario).end()
}

const deletarParticipante = async (req, res) => {
    try {
        const encontro = await prisma.encontro.findUnique({
            where: {
                id: Number(req.params.idEncontro)
            },
            select: {
                id: true,
                EncontroUsuario: true
            }
        })

        if (!encontro) {
            return res.status(400).send({ mensagem: "Encontro não encontrado" }).end()
        }

        let participanteEncontrado = false;

        encontro.EncontroUsuario.forEach(async (e) => {
            if (e.idParticipantePartida == req.params.idParticipante) {
                await prisma.encontroUsuario.delete({
                    where: {
                        id: e.id
                    }
                })
                participanteEncontrado = true;
            }
        })

        if (!participanteEncontrado) {
            return res.status(404).send({ mensagem: "Participante não encontrado" }).end()
        }

        res.status(200).send(encontro).end()

    } catch (error) {
        console.log(error)
        res.status(500).send(error).end()
    }
}

const readAll = async (req, res) => {

    try {
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
                EncontroUsuario: {
                    select: {
                        idParticipante: {
                            select: {
                                nome: true,
                                id: true
                            }
                        },
                        idCriador: {
                            select: {
                                id: true,
                                nome: true,
                                criadorPartida: true
                            }
                        }
                    }
                }
            }
        })
        res.status(200).json(encontro).end()
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensagem: "Erro ao buscar encontros" }).end()
    }

}

const readOne = async (req, res) => {
    let encontro = await prisma.encontro.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            EncontroUsuario: {
                select: {
                    idParticipante: {
                        select: {
                            id: true,
                            nome: true
                        }
                    },
                    idCriador: {
                        select: {
                            id: true,
                            nome: true
                        }
                    }
                }
            }
        }
    })
    encontro ? res.status(200).json(encontro).end() : res.status(404).send({ mensagem: "Encontro não encontrado" }).end()
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
            mensagem: `Encontro de id ${encontro.id} foi atualizado com sucesso`
        }).end()
    } catch (error) {
        console.log(error)
        res.status(404).send({
            mensagem: `Erro ${error.code}, id do encontro não foi achado`
        }).end()
    }
}

const del = async (req, res) => {
    try {
        const encontro = await prisma.encontro.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })

        if (!encontro) {
            return res.status(404).send({
                mensagem: "Encontro não encontrado"
            }).end()
        }

        await prisma.encontro.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        res.status(200).send({
            mensagem: `Encontro de id ${encontro.id} foi excluído com sucesso`
        }).end()
    } catch (err) {
        console.log(err)
        res.status(500).send({
            mensagem: "Ocorreu um erro ao excluir o encontro"
        }).end()
    }
}

module.exports = {
    create,
    novoParticipante,
    readAll,
    readOne,
    del,
    deletarParticipante,
    update
}