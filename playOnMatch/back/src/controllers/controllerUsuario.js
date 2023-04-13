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

    try {
        let usuario = await prisma.usuario.findUnique({
            where: {
                id: Number(req.params.id)
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
        res.status(200).send({ menssagem: "acesso permitido", usuario }).end()
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
    let usuario = await prisma.lista_amigos.create({
        data: req.body
    })
    res.status(200).json(usuario).end()
}



const verificarAmigo = async (id,req, res) => {


    //recebendo id de quem ta logado 
    // comparar o id de quem ta logado
    // com os amigos de quem ele quer ver o perfil
    // se quem estiver logado estiver na lista de amigos
    // permitir acesso ao perfil






    // console.log(id)

    // let listaAmigo = await prisma.lista_amigos.findUnique({
    //     where: {
    //         id: id
    //     }
    // })

    // if (listaAmigo != null) {
    //     if (listaAmigo.idAmigo == Number(req.body.idAmigo)) {

    //         res.status(200).send({ menssagem: 'Amigo',listaAmigo}).end()
    //     } else {
    //         res.status(400).json({ menssagem: 'não é amigo' }).end()
    //     }
    // } else {
    //     res.status(400).send({ menssagem: "sem amigos" }).end()
    // }

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