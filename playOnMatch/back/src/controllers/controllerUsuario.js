const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    try {
        var info = req.body
        info.senha = await bcrypt.hash(req.body.senha, 10)

        let usuario = await prisma.usuario.create({
            data: info
        })

        res.status(201).json(usuario).end()

    } catch (error) {
        if (error.meta.target === 'Usuario_email_key') {
            res.status(400).send({ erro: 'Email já existente' }).end()
        } if (error.meta.target === "Usuario_senha_key") {
            res.status(400).send({ erro: '' }).end()
        }
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

const readPerfil = async (req, res) => {

    console.log()
    try {
        let usuario = await prisma.usuario.findUnique({
            where: {
                id: Number(req.params.idUsuario)
            },
            select: {
                id: true,
                nascimento: true,
                nome: true
                // EncontroUsuario: {
                //     select: {
                //         encontro: {
                //             select: {
                //                 data: true,
                //                 descricao: true,
                //                 local: {
                //                     select: {
                //                         nome: true
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }
            }
        })
        res.status(200).send(usuario).end()
    } catch (error) {
        res.status(400).send({ error })
    }
}

const login = async (req, res) => {

    let usuario = await prisma.usuario.findUnique({
        where: { email: req.body.email }
    }).catch(err => {
        console.log(err)
    })

    if (usuario) {
        if (await bcrypt.compare(req.body.senha, usuario.senha)) {
            jwt.sign(usuario, process.env.KEY, { expiresIn: '10h' }, function (err, token) {
                if (err == null) {
                    usuario["token"] = token
                    res.status(200).send({ menssagem: "Seu login foi bem-sucedido", usuario }).end()
                } else {
                    res.status(404).json(err.message).end()
                }
            })
        } else {
            res.status(404).send({ menssagem: "senha incorreta" }).end()
        }
    } else {
        res.status(404).send({ menssagem: "usuario não encontrado" }).end()
    }
}

const readListaAmigo = async (req, res) => {
    let listaAmigos = await prisma.lista_amigos.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })
    if (listaAmigos != null) {
        res.status(200).json(listaAmigos).end()
    } else {
        res.status(200).send({ menssagem: "sem amigos" }).end()

    }
}

const verificarAmigo = async (idLogado, idUsuario) => {

    //recebendo id de quem ta logado 
    // recebendo id do usuario que quero acessar

    // comparar o id de quem ta logado com os amigos de quem ele quer ver o perfil


    let amigo = await prisma.usuario.findUnique({
        where: {
            id: Number(idUsuario)
        },
        select: {
            criadorListaAmigo: true
        }
    })

    if (amigo == null) {
        return {
            mensagem: 'usuario não existe'
        }
    }

    let encontrado = false

    if (amigo.criadorListaAmigo.length != 0) {
        amigo.criadorListaAmigo.forEach((e) => {
            if (Number(idLogado) === Number(e.idAmigo)) {
                encontrado = true
            }
        })
        if (encontrado) {
            return {
                menssagem: 'amigos'
            }
        } else {
            return {
                menssagem: 'não são amigos'
            }
        }
    } else {
        return {
            menssagem: 'ninguem na lista de amigos'
        }
    }
}

const updateListaAmigo = async (req, res) => {

    const listaDeQuemRecebeu = await prisma.lista_amigos.create({
        data: {
            criador: { connect: { id: Number(req.params.idCriadorLista) } },
            amigo: { connect: { id: Number(req.params.idNovoAmigo) } }
        }
    });

    const listaDeQuemEnviou = await prisma.lista_amigos.create({
        data: {
            criador: { connect: { id: Number(req.params.idNovoAmigo) } },
            amigo: { connect: { id: Number(req.params.idCriadorLista) } }
        }
    });

    res.status(200).send('sucesso').end()
}


const respostaAmizade = (req, res) => {

    const { RespUsuario } = req.body


    if (RespUsuario === true) {
        return {
            mensagem: "solicitação de amizade aceita"
        }
    } else if (RespUsuario === false) {
        return {
            mensagem: "solicitação de amizade rejeitada"
        }
    }
}

const listarAmigos = async (req, res) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: Number(req.params.idUsuario)
        },
        select: {
            criadorListaAmigo: true
        }
    })

    if (usuario == null) {
        res.status(400).send({ mensagem: "usuario não existe" })
    } else {
        res.status(200).send(usuario.criadorListaAmigo).end()
    }
}

const eliminateAmigo = async (req, res) => {

    const logado = await prisma.usuario.findUnique({
        where: {
            id: Number(req.params.idLogado)
        },
        select: {
            criadorListaAmigo: true
        }
    })

    logado.criadorListaAmigo.forEach((e) => {
        if (e.idAmigo === Number(req.params.idAmigo)) {
            let amigo = prisma.Lista_amigos.delete({
                where: {
                    id: e.id
                },
            })

            res.status(200).send({ menssagem: 'te amo' })
        }
    })
}

module.exports = {
    create,
    read,
    update,
    eliminate,
    readOne,
    login,
    readPerfil,
    verificarAmigo,
    readListaAmigo,
    updateListaAmigo,
    respostaAmizade,
    listarAmigos,
    eliminateAmigo
}