// const btnNotificacao = document.querySelector('.btnNotificacao')
const btnAtualizarPerfil = document.querySelector('.btnAtualizarPerfil')
const btnFechaModalAtualizarPerfil = document.querySelector('.btnFechaModalAtualizarPerfil')
const btnFechaModalNotificacao = document.querySelector('.btnFechaModalNotificacao')
const btnFechaModalAmigos = document.querySelector('.btnFechaModalAmigos')
const user = JSON.parse(localStorage.getItem('usuario'))


const btnFecharModal = document.querySelector('.btnFecharModal')

const main = document.querySelector('.infoUser')
const infoUser = document.querySelector('.dadoss')


const partida = document.querySelector('.partidas')
const infoPartida = document.querySelector('.infoPartida')



function listar() {

    let idUsuario = JSON.parse(localStorage.getItem('perfil'))
    let { id } = user

    let btnEditarPerfil = document.querySelector('.btnEditarPerfil')
    if (idUsuario != id) {
        btnEditarPerfil.classList.add('model')
    }

    const options = { method: 'GET' };

    fetch(`http://localhost:3000/perfil/${idUsuario}`, options)
        .then(response => response.json())
        .then(res => {
            let usuario = infoUser.cloneNode(true)

            usuario.classList.remove("model")

            let amigos = res.criadorListaAmigo.filter(e => (e.status == 1))
            const urlImagem = `C:/Users/DES/Desktop/tcc/playOnMatch/back/uploads/${res.image}`

            usuario.querySelector('.nomeUsuario').innerHTML = res.nome
            usuario.querySelector('.partidasJogadas').innerHTML = res.participante.length + " Partidas"

            usuario.querySelector('.imguser').src = urlImagem
            usuario.querySelector('.amigos').innerHTML = amigos.length + " Amigos"
            usuario.querySelector('.email').innerHTML = res.email

            main.appendChild(usuario)


            for (let i = res.participante.length - 1; i >= 0; i--) {
                let dataSplit = res.participante[i].encontro.dataHora.split("T")[0];
                let horaSplit = res.participante[i].encontro.dataHora.split("T")[1].split('.')[0];
                let dateFim = new Date(dataSplit);

                let dataFimFormatada = dateFim.toLocaleDateString("pt-BR", {
                    timeZone: "UTC"
                });

                let horaFim = "";

                if (res.participante[i].encontro.dataFim == null) {
                    horaFim = "Não Acabou";
                } else {
                    horaFim = res.participante[i].encontro.dataFim.split("T")[1].split(".")[0];
                }

                let dadosPartida = infoPartida.cloneNode(true);
                dadosPartida.classList.remove("model");

                dadosPartida.querySelector('.idPartida').innerHTML = res.participante[i].encontro.id;
                dadosPartida.querySelector('.tituloPartida').innerHTML = res.participante[i].encontro.titulo;
                dadosPartida.querySelector('.enderecoPartida').innerHTML = res.participante[i].encontro.local.nome;
                dadosPartida.querySelector('.data').innerHTML = dataFimFormatada;
                dadosPartida.querySelector('.horaInicio').innerHTML = horaSplit;
                dadosPartida.querySelector('.horaFim').innerHTML = horaFim;

                partida.appendChild(dadosPartida);
            }
        })
}

function exibirImagemPerfil(nomeArquivo) {
    const imgElement = d
}

setTimeout(() => {
    let partidas = document.querySelectorAll('.infoPartida');
    partidas.forEach((e) => {
        e.addEventListener('click', function () {
            let modal = document.querySelector('.modal');
            modal.style.display = "flex";
        });
    });
}, 100);

function abrirModalEditarPerfil(dados) {
    let nome = dados.parentNode.parentNode.children[1].children[0].innerHTML
    let nascimento = dados.parentNode.parentNode.children[1].children[2].innerHTML
    let email = dados.parentNode.parentNode.children[1].children[3].innerHTML

    window.localStorage.setItem('dadosPerfil', JSON.stringify({ 'nome': nome, 'nascimento': nascimento, "email": email }));

    let atualizarPerfil = document.querySelector('.modalAtualizarPerfil')

    atualizarPerfil.style.display = "flex"
}

btnFechaModalAtualizarPerfil.addEventListener('click', function (e) {
    let atualizarPerfil = document.querySelector('.modalAtualizarPerfil')

    atualizarPerfil.style.display = "none"
})

btnFecharModal.addEventListener('click', function (e) {
    let modal = document.querySelector('.modal')

    window.location.reload()

    modal.style.display = 'none'
})


btnAtualizarPerfil.addEventListener('click', function (e) {
    e.preventDefault();
})

// btnNotificacao.addEventListener('click', function () {
//     let notificacaoModal = document.querySelector('.modalNotificacao')

//     notificacaoModal.style.display = "flex"
// })

btnFechaModalNotificacao.addEventListener('click', function (e) {
    let notificacaoModal = document.querySelector('.modalNotificacao')

    notificacaoModal.style.display = "none"
})

function abrirModalAmigos() {
    let amigosModal = document.querySelector('.modalAmigos')

    amigosModal.style.display = "flex"
}

btnFechaModalAmigos.addEventListener('click', function (e) {
    let amigosModal = document.querySelector('.modalAmigos')

    amigosModal.style.display = "none"
})

function editarPerfil() {

    let usuario = JSON.parse(localStorage.getItem('usuario'))
    let dadosPerfil = JSON.parse(localStorage.getItem("dadosPerfil"));

    let atlNome = document.querySelector('.atlNome')
    let atlEmail = document.querySelector('.atlEmail')
    let atlNascimento = document.querySelector('.atlNascimento')


    let dados = {
        nome: atlNome.value.trim(),
        email: atlEmail.value.trim(),
        nascimento: atlNascimento.value.trim(),
    }

    if (dados.nome.length == 0) {
        dados.nome = dadosPerfil.nome
    }

    if (dados.email.length == 0) {
        dados.email = dadosPerfil.email
    }

    if (dados.nascimento.length == 0) {
        dados.nascimento = dadosPerfil.nasciment
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: usuario.token
        },
        body: JSON.stringify(dados)
    };

    fetch(`http://localhost:3000/atualizarUsuario/${usuario.id}`, options)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(res => {
            console.log(res)
            window.location.reload()
        })
}

function listarAmigos() {
    let idUsuario = JSON.parse(localStorage.getItem('perfil'))
    const options = { method: 'GET' };

    fetch(`http://localhost:3000/verSolicitacao/${idUsuario}`, options)
        .then(response => response.json())
        .then(res => {
            let amigosModal = document.querySelector('.amigosModal')
            let infoAmigos = document.querySelector('.infoAmigos')

            res.criadorListaAmigo.forEach((e) => {
                let dados = infoAmigos.cloneNode(true)

                dados.classList.remove('model')
                dados.querySelector('.idAmigo').innerHTML = "#" + e.amigo.id
                dados.querySelector('.nomeAmigo').innerHTML = e.amigo.nome

                amigosModal.appendChild(dados)
            })
        })
}


function detalhesPartida(idPartida) {

    idPartida = idPartida.children[0].innerHTML
    const options = { method: 'GET' };

    fetch(`http://localhost:3000/listarEncontro/${idPartida}`, options)
        .then(response => response.json())
        .then(response => {
            let detalhesEncontro = document.querySelector('.detalhesEncontro')
            let infoEncontro = document.querySelector('.infoEncontro')

            let dados = infoEncontro.cloneNode(true)
            dados.classList.remove('model')

            let data = new Date(response.dataHora);


            let nwData = data.toLocaleDateString("pt-BR", {
                timeZone: "UTC",
            });

            dados.querySelector('.tituloEncontro').innerHTML = response.titulo
            dados.querySelector('.descricaoEncontro').innerHTML = response.descricao
            dados.querySelector('.enderecoEncontro').innerHTML = response.local.cidade + "-" + response.local.pais
            dados.querySelector('.nomeEncontro').innerHTML = response.local.nome
            dados.querySelector('.dataEncontro').innerHTML = nwData

            detalhesEncontro.appendChild(dados)

            let participantes = document.querySelector('.participantes')
            let infoParticipantes = document.querySelector('.infoParticipantes')

            response.EncontroUsuario.forEach((e) => {
                let info = infoParticipantes.cloneNode(true)
                info.classList.remove('model')
                info.querySelector('.idParticipante').innerHTML = "#" + e.idParticipante.id
                info.querySelector('.nomeParticipante').innerHTML = e.idParticipante.nome
                participantes.appendChild(info)
            })

        })
}


listarAmigos()
listar()