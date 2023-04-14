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

const readPerfil = async (req, res) => {

    console.log(req.params)

    try {
        let usuario = await prisma.usuario.findUnique({
            where: {
                id: Number(req.params.idUsuario)
            },
            select: {
                id: true,
                nascimento: true,
                nome: true,
                EncontroUsuario: {
                    select: {
                        encontro: {
                            select: {
                                data: true,
                                descricao: true,
                                local: {
                                    select: {
                                        nome: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        res.status(200).send(usuario).end()
    } catch (error) {
        res.status(400).send({ error })
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
                    res.status(404).json(err).end()
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
    let usuario = await prisma.lista_amigos.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })
    if (usuario != null) {
        res.status(200).json(usuario).end()
    } else {
        res.status(200).send({ menssagem: "sem amigos" }).end()

    }
}

const createListaAmigo = async (req, res) => {

    // mandar solicitação de amizade

    // encontrar pessoa que quero fazer amizade
    let usuario = await prisma.usuario.findUnique({
        where:{
            id:req.body.id
        }
    })

    res.status(200).send({menssagem:'Aceita minha solicitação de amizade?'}).end()

    //caso a pessoa aceite a solicitação fazer a criação da lista com a amizade
    // let lista = await prisma.lista_amigos.create({
    //     data: req.body
    // })

    // let lista2 = await prisma.lista_amigos.create({
    //     data: {
    //         idAmigo: Number(lista.idDono),
    //         idDono: Number(lista.idAmigo)
    //     }
    // })

    // res.status(200).send({ menssagem: "agora vocês são amigos" }).end()
}

const verificarAmigo = async (idLogado,idUsuario) => {

    console.log(idLogado, idUsuario)

    //recebendo id de quem ta logado 
    // console.log(req.params.idLogado)
    // recebendo id do usuario que quero acessar
    // console.log(req.params.idUsuario)

    // comparar o id de quem ta logado com os amigos de quem ele quer ver o perfil

    let amigo = await prisma.usuario.findUnique({
        where: {
            id: Number(idUsuario)
        },
        select: {
            Lista_amigos: true
        }
    })

    if (amigo.Lista_amigos.length != 0) {
        if (Number(idLogado) === Number(amigo.Lista_amigos[0].idAmigo)) {
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
    createListaAmigo
}