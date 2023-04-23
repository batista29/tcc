const btn1 = document.querySelector('.btnHistorico')
const btn2 = document.querySelector('.btnSobre')
const btn3 = document.querySelector('.btnAmigos')

const btnEditarPerfil = document.querySelector('.btnEditarPerfil')
const btnAtualizarPerfil = document.querySelector('.btnAtualizarPerfil')
const btnFechaModalAtualizarPerfil = document.querySelector('.btnFechaModalAtualizarPerfil')
const partidas = document.querySelectorAll('.infoPartida')
const btnFecharModal = document.querySelector('.btnFecharModal')


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

mudarCorBotao()