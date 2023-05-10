// const btnNotificacao = document.querySelector('.btnNotificacao')
const btnAmigo = document.querySelector('.btnAmigos')

const btnEditarPerfil = document.querySelector('.btnEditarPerfil')
const btnAtualizarPerfil = document.querySelector('.btnAtualizarPerfil')
const btnFechaModalAtualizarPerfil = document.querySelector('.btnFechaModalAtualizarPerfil')
const btnFechaModalNotificacao = document.querySelector('.btnFechaModalNotificacao')
const btnFechaModalAmigos = document.querySelector('.btnFechaModalAmigos')


const btnFecharModal = document.querySelector('.btnFecharModal')

const main = document.querySelector('.infoUser')
const infoUser = document.querySelector('.dadoss')


const partida = document.querySelector('.partidas')
const infoPartida = document.querySelector('.infoPartida')


function listar() {

    let id = JSON.parse(localStorage.getItem('perfil'))

    const options = { method: 'GET' };

    fetch(`http://localhost:3000/perfil/${id}`, options)
        .then(response => response.json())
        .then(res => {
            let usuario = infoUser.cloneNode(true)

            usuario.classList.remove("model")

            usuario.querySelector('.nomeUsuario').innerHTML = res.nome
            usuario.querySelector('.dataNascimento').innerHTML = res.nascimento.split('T')[0]
            usuario.querySelector('.partidasJogadas').innerHTML = res.participante.length + " Partidas Jogadas"
            usuario.querySelector('.email').innerHTML = res.email

            main.appendChild(usuario)

            res.participante.forEach((e) => {

                let dadosPartida = infoPartida.cloneNode(true)
                dadosPartida.classList.remove("model")

                dadosPartida.querySelector('.tituloPartida').innerHTML = e.encontro.titulo
                dadosPartida.querySelector('.enderecoPartida').innerHTML = e.encontro.local.endereco
                dadosPartida.querySelector('.dataHora').innerHTML = e.encontro.data.split("T")[1].split(":")[0] + "h " + e.encontro.data.split("T")[0]
                partida.appendChild(dadosPartida)

            })

        })
}


// function mudarCorBotao() {

// btn1.addEventListener('click', function () {
// btn1.style.background = 'blue'
// btn2.style.background = '#00f63e'
// btn3.style.background = '#00f63e'
// })

// btn2.addEventListener('click', function () {
// btn2.style.background = 'blue'
// btn3.style.background = '#00f63e'
// btn1.style.background = '#00f63e'
// })

// btn3.addEventListener('click', function () {
//     btn3.style.background = 'blue'
//     btn1.style.background = '#00f63e'
//     btn2.style.background = '#00f63e'
// })
// }

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
    let nome = dados.parentNode.parentNode.children[2].children[0].innerHTML
    let nascimento = dados.parentNode.parentNode.children[2].children[2].innerHTML
    let email = dados.parentNode.parentNode.children[2].children[3].innerHTML

    window.localStorage.setItem('dadosPerfil', JSON.stringify({ 'nome': nome, 'nascimento': nascimento, "email": email }));

    let atualizarPerfil = document.querySelector('.modalAtualizarPerfil')

    atualizarPerfil.style.display = "flex"
}

btnEditarPerfil.addEventListener('click', function (a) {

    // console.log(a.appendChil)




})


btnFechaModalAtualizarPerfil.addEventListener('click', function (e) {
    let atualizarPerfil = document.querySelector('.modalAtualizarPerfil')

    atualizarPerfil.style.display = "none"
})

btnFecharModal.addEventListener('click', function (e) {
    let modal = document.querySelector('.modal')

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

btnAmigo.addEventListener('click', function () {
    let amigosModal = document.querySelector('.modalAmigos')

    amigosModal.style.display = "flex"
})

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
    let atlCep = document.querySelector('.atlCep')


    let dados = {
        nome: atlNome.value.trim(),
        email: atlEmail.value.trim(),
        nascimento: atlNascimento.value.trim(),
        cep: atlCep.value.trim()
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

    if (dados.cep.length == 0) {
        dados.cep = '0'
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
        .then(res => console.log(res))
        window.location.reload()
}

listar()