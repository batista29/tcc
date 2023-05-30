const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt');
const multer = require('multer');

const { PrismaClient } = require('@prisma/client')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }
});
const parser = multer({ storage });
// const enviarArquivo = async (req, res)=>{
//     parser.single('image')(req, res, err => {
//         if (err)
//             res.status(500).json({ error: 1, payload: err }).end();
//         else {
//             res.status(200).json(req.file.filename).end();
//         }
//     });
// }

const atualizarFotoPerfil = async (req, res) => {
    parser.single('image')(req, res, async (err) => {
      if (err) {
        res.status(500).json({ error: 1, payload: err }).end();
      } else {
        // Aqui você pode adicionar o código para atualizar o registro do usuário no banco de dados
        const { userId } = req.params; // Supondo que você tenha um parâmetro para o ID do usuário na rota
        const { filename } = req.file;
  
        try {
          // Adicione o código para atualizar a foto de perfil do usuário no banco de dados
          // Exemplo usando o Prisma:
          const usuario = await prisma.usuario.update({
            where: { id: Number(userId) },
            data: { image: filename },
          });

          res.status(200).json(usuario).end();
        } catch (error) {
            console.log(error);
          res.status(500).json({ error: 1, payload: error }).end();
        }
      }
    });
  };

const prisma = new PrismaClient()

const fs = require('fs');

const create = async (req, res) => {
    // const image = req.file.buffer;
    // const imageData = Buffer.from(image, 'base64');
    var info = req.body
    info.senha = await bcrypt.hash(req.body.senha, 10)

    try {
        // const diretorio = 'C:/Users/jaugu/OneDrive/Área de Trabalho/tcc/playOnMatch/docs/imgs/imgsPerfil'
        // const filename = `${Date.now()}-${req.file.originalname}`;
        // const imagePath = `${diretorio}/${filename}`

        // fs.writeFileSync(imagePath, imageData);

        let usuario = await prisma.usuario.create({
            data: info
        })

        res.status(201).send({ mensagem: "OK" }).end()

    } catch (error) {
        console.log(error)
        // if (error.meta.target === 'Usuario_email_key') {
        //     res.status(400).send({ erro: 'Email já existente' }).end()
        // } if (error.meta.target === "Usuario_senha_key") {
        //     res.status(400).send({ erro: '' }).end()
        // }
    }
}

const read = async (req, res) => {
    let usuario = await prisma.usuario.findMany({
        select: {
            id: true,
            nome: true,
            email: true,
            nascimento: true,
            criadorListaAmigo: {
                select: {
                    amigo: true,
                    status: true,
                    remetente: true
                }
            }
        }
    })
    res.status(200).json(usuario).end()
}

const listaUsuario = async (req, res) => {
    let usuario = await prisma.usuario.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id: true,
            nome: true,
            criadorPartida: true
        }
    })
    res.status(200).send({ usuario }).end()
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
        res.status(404).send({ mensagem: "usuario não encontrado" }).end()
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
        res.status(200).json(usuario).end()
    } catch (error) {
        console.error(error)
        res.status(400).send(error).end()
    }
}

const eliminate = async (req, res) => {
    try {
        let usuario = await prisma.usuario.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(200).send({ mensagem: `Usuario ${usuario.nome} foi excluido com sucesso` }).end()
    } catch (error) {
        res.status(200).send({ mensagem: `Erro ${error.code}, usuário não foi encontrado` }).end()
    }
}

const readPerfil = async (req, res) => {
    try {
        let usuario = await prisma.usuario.findUnique({
            where: {
                id: Number(req.params.idUsuario)
            },
            select: {
                id: true,
                nascimento: true,
                nome: true,
                email: true,
                image:true,
                criadorListaAmigo: true,
                participante: {
                    select: {
                        encontro: {
                            select: {
                                id: true,
                                dataHora: true,
                                dataFim: true,
                                descricao: true,
                                titulo: true,
                                local: {
                                    select: {
                                        nome: true,
                                        pais: true,
                                        cidade: true,
                                    }
                                },
                                EncontroUsuario: {
                                    select: {
                                        idParticipante: {
                                            select: {
                                                id: true,
                                                nome: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },

            }
        })
        res.status(200).send(usuario).end()
    } catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
}

const login = async (req, res) => {

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { email: req.body.email }
        }).catch(err => {
            console.log(err)
        })

        if (!usuario) {
            return res.status(401).send({ mensagem: "Usuário não encontrado" });
        }

        if (!(await bcrypt.compare(req.body.senha, usuario.senha))) {
            return res.status(401).send({ mensagem: "Senha incorreta" });
        }

        const token = jwt.sign(usuario, process.env.KEY, { expiresIn: '10h' })

        const sendLoginResponse = (res, usuario, token) => {
            usuario["token"] = token;
            res.status(200).send({ mensagem: "Seu login foi bem-sucedido", usuario }).end();
        }

        sendLoginResponse(res, usuario, token);



    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: "Erro interno do servidor" });
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
        res.status(200).send({ mensagem: "sem amigos" }).end()

    }
}

const verificarAmigo = async (idLogado, idUsuario) => {

    //recebendo id de quem ta logado 
    // recebendo id do usuario que quero acessar

    // comparar o id de quem ta logado com os amigos de quem ele quer ver o perfil

    try {
        const amigo = await prisma.usuario.findUnique({
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
                    mensagem: 'amigos'
                }
            } else {
                return {
                    mensagem: 'não são amigos'
                }
            }
        } else {
            return {
                mensagem: 'ninguem na lista de amigos'
            }
        }
    } catch (error) {
        console.log(error)
        return {
            mensagem: 'Ocorreu um erro ao verificar amizade'
        }
    }


}

const listarAmigos = async (req, res) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: Number(req.params.idUsuario)
        },
        select: {
            criadorListaAmigo: {
                select: {
                    id: true,
                    criador: true,
                    amigo: {
                        select: {
                            id: true,
                            nome: true
                        }
                    }
                }
            }
        }
    })

    if (usuario == null) {
        res.status(400).send({ mensagem: "usuario não existe" })
    } else {
        res.status(200).send(usuario.criadorListaAmigo).end()
    }
}

const eliminateAmigo = async (req, res) => {
    try {
        const logado = await prisma.usuario.findUnique({
            where: {
                id: Number(req.params.idLogado),
            },
            select: {
                criadorListaAmigo: true,
            },
        })

        if (logado && logado.criadorListaAmigo) {
            let amigoEncontrado = false;

            logado.criadorListaAmigo.forEach(async (e) => {
                if (e.idAmigo === Number(req.params.idAmigo)) {
                    // Exclui o registro correspondente na sua tabela de Lista_amigos
                    await prisma.Lista_amigos.deleteMany({
                        where: {
                            id: e.id,
                        },
                    })

                    // Exclui o registro correspondente na tabela de Lista_amigos do outro usuário
                    await prisma.Lista_amigos.deleteMany({
                        where: {
                            idAmigo: Number(req.params.idLogado),
                            idCriador: e.idAmigo,
                        },
                    })

                    amigoEncontrado = true;
                }
            })

            if (amigoEncontrado) {
                res.status(200).send({ mensagem: 'amigo deletado com sucesso' })
            } else {
                res.status(404).send({ mensagem: "amigo não encontrado" })
            }
        } else {
            res.status(404).send({ mensagem: "Usuario não encontrado ou lista de amigos vazia" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensagem: "ocorreu um erro ao deletar o amigo" })
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
    // updateListaAmigo,
    // respostaAmizade,
    listarAmigos,
    eliminateAmigo,
    listaUsuario,
    // enviarArquivo,
    atualizarFotoPerfil
}