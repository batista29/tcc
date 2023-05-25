const {
    PrismaClient
} = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    try {
        const newEncontro = await prisma.encontro.create({
            data: req.body
        });

        const encontroUsuario = await prisma.encontroUsuario.create({
            data: {
                id_encontro: newEncontro.id,
                idCriadorPartida: Number(req.params.idCriadorPartida),
                idParticipantePartida: Number(req.params.idCriadorPartida),
                status: 1
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
            idParticipantePartida: Number(req.params.idNovoParticipante),
            status: 1
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
                dataHora: true,
                dataFim: true,
                titulo: true,
                id_local: true,
                local: {
                    select: {
                        nome: true,
                        pais: true,
                        cidade: true,
                        bairro: true,
                        rua: true
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
            id: true,
            descricao: true,
            dataHora: true,
            dataFim: true,
            titulo: true,
            local: {
                select: {
                    nome: true,
                    rua: true,
                    bairro: true,
                    cidade: true,
                    pais: true,
                }
            },
            EncontroUsuario: {
                select: {
                    id: true,
                    status:true,
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
                id: Number(req.params.idEncontro)
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

const finalizarEncontro = async (req, res) => {
    try {
        let encontro = await prisma.encontro.update({
            where: { id: Number(req.params.idEncontro) },
            data: {
                dataFim: new Date()
            }
        })
        res.status(200).json(encontro).end()
    } catch (error) {
        console.log(error)
        res.status(500).json(error).end()
    }
}

const del = async (req, res) => {
    try {
        let encontro = await prisma.encontro.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        res.status(200).json(encontro).end()
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensagem: "Ocorreu um erro ao excluir o encontro" }).end()
    }
}

const convidarUsario = async (req, res) => {
    try {
        let encontro = await prisma.encontro.findUnique({
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

        let convidarAmigo = await prisma.encontroUsuario.create({
            data: {
                id_encontro: Number(req.params.idEncontro),
                idCriadorPartida: encontro?.EncontroUsuario[0]?.idCriadorPartida,
                idParticipantePartida: Number(req.params.idAmigo)
            }
        })
        res.status(201).json(convidarAmigo).end()
    } catch (error) {
        console.log(error)
    }
}

const verConvite = async (req, res) => {
    try {
        let participante = await prisma.usuario.findUnique({
            where: {
                id: Number(req.params.idParticipante)
            },
            select: {
                participante: true
            }
        })
        res.status(200).json(participante).end()
    } catch (error) {
        console.log(error)
    }
}

const responderConvite = async (req, res) => {

    try {
        let { respConvite } = req.body

        const participante = await prisma.usuario.findUnique({
            where: {
                id: Number(req.params.idParticipante)
            },
            select: {
                participante: true
            }
        })

        let encontroUsuario = participante.participante.find(e => e.status == 0)

        if (respConvite == 1) {
            let encontro = await prisma.encontroUsuario.update({
                where: {
                    id: encontroUsuario.id
                },
                data: { status: 1 }
            })
        }

        if (respConvite == 2) {
            let encontro = await prisma.encontroUsuario.update({
                where: {
                    id: encontroUsuario.id
                },
                data: { status: 2 }
            })
        }

        res.status(200).json(participante).end()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    create,
    novoParticipante,
    readAll,
    readOne,
    del,
    deletarParticipante,
    update,
    finalizarEncontro,
    convidarUsario,
    verConvite,
    responderConvite
}