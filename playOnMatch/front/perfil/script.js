const btn1 = document.querySelector('.btnHistorico')
const btn2 = document.querySelector('.btnSobre')
const btn3 = document.querySelector('.btnAmigos')

const btnEditarPerfil = document.querySelector('.btnEditarPerfil')
const btnAtualizarPerfil = document.querySelector('.btnAtualizarPerfil')
const btnFechaModalAtualizarPerfil = document.querySelector('.btnFechaModalAtualizarPerfil')
const btnFechaModalSobreMim = document.querySelector('.btnFechaModalSobreMim')
const btnFechaModalAmigos = document.querySelector('.btnFechaModalAmigos')
const partidas = document.querySelectorAll('.infoPartida')
const btnFecharModal = document.querySelector('.btnFecharModal')

const main = document.querySelector('.infoUser')
const infoUser = document.querySelector('.dadoss')

function listarPartidas() {

    const options = { method: 'GET' };

    fetch('http://localhost:3000/perfil/2', options)
        .then(response => response.json())
        .then(res => {
            let usuario = infoUser.cloneNode(true)
            console.log()

            usuario.classList.remove("model")

            usuario.querySelector('.nomeUsuario').innerHTML = res.nome
            usuario.querySelector('.dataNascimento').innerHTML = res.nascimento.split('T')[0]

            main.appendChild(usuario)
        })
}


function mudarCorBotao() {

    btn1.addEventListener('click', function () {
        btn1.style.background = 'blue'
        btn2.style.background = '#00f63e'
        btn3.style.background = '#00f63e'
    })

    btn2.addEventListener('click', function () {
        btn2.style.background = 'blue'
        btn3.style.background = '#00f63e'
        btn1.style.background = '#00f63e'
    })

    btn3.addEventListener('click', function () {
        btn3.style.background = 'blue'
        btn1.style.background = '#00f63e'
        btn2.style.background = '#00f63e'
    })
}

partidas.forEach((e) => {
    e.addEventListener('click', function () {

        let modal = document.querySelector('.modal')
        console.log(modal)

        modal.style.display = "flex"
    })
})

btnEditarPerfil.addEventListener('click', function () {
    let atualizarPerfil = document.querySelector('.ModalAtualizarPerfil')

    atualizarPerfil.style.display = "flex"
})


btnFechaModalAtualizarPerfil.addEventListener('click', function (e) {
    let atualizarPerfil = document.querySelector('.ModalAtualizarPerfil')

    atualizarPerfil.style.display = "none"
})

btnFecharModal.addEventListener('click', function (e) {
    let modal = document.querySelector('.modal')

    modal.style.display = 'none'
})


btnAtualizarPerfil.addEventListener('click', function (e) {
    e.preventDefault();
})

btn2.addEventListener('click', function () {
    let sobreMim = document.querySelector('.ModalSobreMim')

    sobreMim.style.display = "flex"
})

btnFechaModalSobreMim.addEventListener('click', function (e) {
    let sobreMim = document.querySelector('.ModalSobreMim')

    sobreMim.style.display = "none"
})

btn3.addEventListener('click', function () {
    let amigosModal = document.querySelector('.ModalAmigos')

    amigosModal.style.display = "flex"
})

btnFechaModalAmigos.addEventListener('click', function (e) {
    let amigosModal = document.querySelector('.ModalAmigos')

    amigosModal.style.display = "none"
})

mudarCorBotao()
listarPartidas()