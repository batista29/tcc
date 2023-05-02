const read = document.querySelector('.read');
const readInfo = document.querySelector('.readInfo');
const readLocal = document.querySelector('.readLocal');

const filtroTituloPartidas = document.querySelector('.filtroTituloPartidas')
const filtroDatePartidas = document.querySelector('.filtroDatePartidas')

const user = JSON.parse(localStorage.getItem('usuario'))

function favoritarPartida(event) {

    // faz parar o  evento do pai dele 
    event.stopPropagation();

    // para selecionar o elemento que disparou o evento, que é o próprio botão que foi clicado.
    const btnFavoritarPartida = event.currentTarget;
    // Em seguida, usei querySelector com currentTarget para selecionar a imagem dentro desse botão específico.
    // Dessa forma, a troca da imagem só acontece dentro do botão que foi clicado.
    const imgEstrela = btnFavoritarPartida.querySelector('.imgEstrela');

    if (imgEstrela.src.includes('estrela.png')) {
        imgEstrela.src = '../../docs/imgs/estrelaAmarela.png';
    } else {
        imgEstrela.src = '../../docs/imgs/estrela.png';
    }
}

function carregar() {

    const options = {
        method: 'GET'
    };

    fetch('http://localhost:3000/listarEncontros', options)
        .then(response => response.json())
        .then(res => {
            res.forEach(dados => {

                let tabela = readInfo.cloneNode(true)

                tabela.classList.remove("model")

                let date = new Date(dados.data);

                let horas = dados.data.split('T')[1].split('.')[0]

                let dataFormatada = date.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                tabela.querySelector('.idLocal').innerHTML = "#" + dados.id
                tabela.querySelector('.titulo').innerHTML = dados.titulo

                tabela.querySelector('.data').innerHTML = dataFormatada + "-" + horas
                tabela.querySelector('.endereco').innerHTML = dados.local.endereco

                let btnFavoritarPartida = tabela.querySelector('.btnFavoritarPartida');
                btnFavoritarPartida.addEventListener('click', favoritarPartida);

                read.appendChild(tabela)
            });
        })
}


function adicionarEncontro() {

    // criar encontro
    let descricaoSubmit = document.querySelector("#descricaoSubmit").value
    let dataSubmit = document.querySelector("#dataSubmit").value
    let tituloSubmit = document.querySelector("#tituloSubmit").value
    let id_localSubmit = document.querySelector("#id_localSubmit").value

    let data = dataSubmit + "T00:00:00.000Z"

    let dados = {
        descricao: descricaoSubmit,
        data: data,
        titulo: tituloSubmit,
        id_local: Number(id_localSubmit)
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"descricao":"","data":"","titulo":"","id_local":,"esporte":""}'
    };

    fetch('http://localhost:3000/criarEncontro/3', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));


    // criar encontro usuario

    // const options2 ={
    //     idEncontro:
    //     idCriador:
    //     idParticipante:
    // }
}

function abrirModal() {
    let modalAparecer = document.querySelector(".readInferior");
    modalAparecer.classList.add("modal")
}

function fecharModal() {
    let modalAparecer = document.querySelector(".readInferior");
    modalAparecer.classList.remove("modal")
}

function listaParticipantes() {

    let idPartida = JSON.parse(localStorage.getItem("idPartida"))

    const options = { method: 'GET' };

    fetch(`http://localhost:3000/listarEncontro/${idPartida}`, options)
        .then(response => response.json())
        .then(res => {

            const participantes = document.querySelector('.participantes')
            const infoParticipante = document.querySelector('.infoParticipantes')
            // const btnCancelar = document.querySelector('.btnCancelarParticipacao')
            // const btnParticipar = document.querySelector('.btnParticiparDoEvento')

            res.EncontroUsuario.forEach((e) => {

                let nomeParticipante = e.idParticipante.nome
                let idParticipante = e.idParticipante.id

                let dados = infoParticipante.cloneNode(true)
                dados.classList.remove('model')

                dados.querySelector('.idParticipante').innerHTML = idParticipante
                dados.querySelector('.nomeParticipante').innerHTML = nomeParticipante

                let { id } = user

                let participanteEncontrado = false

                if (e.idCriador.id == id) {
                    let encerrarEncontro = document.querySelector('.encerrarEncontro')
                    encerrarEncontro.classList.remove("model")
                } else {
                    let encerrarEncontro = document.querySelector('.encerrarEncontro')
                    encerrarEncontro.classList.add("model")
                }

                if (id == e.idParticipante.id) {
                    participanteEncontrado = true
                }

                // let btnCancelar = dados.querySelector('.btnCancelarParticipacao')
                // let btnParticipar = dados.querySelector('.btnParticiparDoEvento')

                // if (participanteEncontrado) {
                //     btnCancelar.disabled = false
                //     btnParticipar.disabled = true
                // } else {
                // btnCancelar.disabled = true
                // btnParticipar.disabled = false
                // }
                participantes.appendChild(dados)
            })
        })
}

function adicionarParticipante() {

    let idPartida = JSON.parse(localStorage.getItem("idPartida"))

    console.log(idPartida)
    const options = { method: 'POST' };

    // fetch(`http://localhost:3000/adicionarParticipante/${idPartida}/3`, options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
}

function abrirModalPartida(id) {

    id = id.children[0].children[2].children[0].innerHTML.slice(1)

    let partida = document.querySelector('.modalPartidas')
    partida.classList.remove("model")

    localStorage.setItem("idPartida", JSON.stringify(id))
    listaParticipantes()
}

function fecharModalPartida() {
    let partida = document.querySelector('.modalPartidas')
    partida.classList.add("model")

    localStorage.removeItem('idPartida');
    location.reload()
}

filtroTituloPartidas.addEventListener('input', filterCardsTitulo)

function filterCardsTitulo() {

    setTimeout(() => {
        let partidas = document.querySelectorAll('.readInfo');

        partidas.forEach((e) => {
            if (!e.children[0].children[2].children[0].innerHTML.slice(1) == '') {

                let titulo = e.children[0].children[2].children[1].innerHTML
                titulo = titulo.toLowerCase()

                let filter = filtroTituloPartidas.value

                if (!titulo.includes(filter)) {
                    e.style.display = 'none'
                } else {
                    e.style.display = "block"
                }
            } else {
                e.style.display = 'none'
            }

        })
    }, 100);
}

// filtroDatePartidas.addEventListener('input', filterCardsData)

function formatarData(campo) {
    const valorSemMascara = campo.value.replace(/\D/g, '');

    const valorFormatado = valorSemMascara.replace(/^(\d{2})(\d)/g, '$1/$2').replace(/^(\d{2}\/\d{2})(\d)/g, '$1/$2');

    campo.value = valorFormatado;

    setTimeout(() => {
        let partidas = document.querySelectorAll('.readInfo');

        partidas.forEach((e) => {

            if (!e.children[0].children[2].children[0].innerHTML.slice(1) == '') {

                let dataHTML = e.children[0].children[3].children[1].innerHTML

                if (!dataHTML.includes(campo.value)) {
                    e.style.display = 'none'
                } else {
                    e.style.display = "block"
                }
            } else {
                e.style.display = 'none'
            }
        })
    }, 10);
}

const perfil = document.querySelector('.perfil')

function acessarPerfil(id) {
    id = id.children[0].innerHTML.slice(1)
    localStorage.setItem("perfil", JSON.stringify(id))
    window.location.href = "../perfil/index.html"

}

function usuario() {
    let { id } = user

    const options = { method: 'GET' };

    fetch(`http://localhost:3000/listarUsuario/${id}`, options)
        .then(response => response.json())
        .then(res => {

            perfil.classList.remove("model")

            perfil.querySelector(".idUser").innerHTML = "#" + res.usuario.id
            perfil.querySelector(".nomeUser").innerText = res.usuario.nome
        })
}

function listaAmigos() {

    setTimeout(() => {
        const options = { method: 'GET' };

        let { id } = user

        fetch(`http://localhost:3000/lista/${id}`, options)
            .then(response => response.json())
            .then(res => {
                let allFriends = document.querySelector('.allFriends')
                let friendsInfo = document.querySelector('.friends_info')

                res.forEach((e) => {

                    let info = friendsInfo.cloneNode(true)

                    info.classList.remove("model")

                    info.querySelector('.idAmigo').innerHTML = e.amigo.id
                    info.querySelector('.nomeAmigo').innerHTML = e.amigo.nome

                    allFriends.appendChild(info)
                })
            })
    }, 100)
}

var btnTopo = document.getElementById("btnTopo");

btnTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


const encerrarPartida = document.querySelector('.encerrarEncontro')

// encerrarPartida.addEventListener("click", function () {
//     console.log('oi')
// })


function acessarPerfilAmigo(idAmigo) {

    let { token } = user
    let { id } = user

    idAmigo = idAmigo.children[0].innerHTML

    const options = {
        method: 'GET',
        headers: {
            authorization: token
        }
    };

    fetch(`http://localhost:3000/perfilUsuario/${id}/${idAmigo}`, options)
        .then(response => {
            if (response.status == 200) {
                localStorage.setItem("perfil", JSON.stringify(idAmigo))
                window.location.href = "../perfil/index.html"
            }
            return response.json()
        })
        .then(res => {
            console.log(res)

        })
}

const paises = ['Brasil', 'Argentina', 'Alemanha', 'selulite'];

const cidadesPorPais = {
    'Brasil': ['Rio de Janeiro', 'São Paulo', 'Belo Horizonte'],
    'Argentina': ['Buenos Aires', 'Córdoba', 'Rosário'],
    'Alemanha': ['Berlim', 'Munique', 'Hamburgo'],
    'selulite': ['cidade1', 'cidade2', 'cidade3']
};

// Pega o datalist das opções de países
const datalistPaises = document.getElementById('opcoes-pais');

// Adiciona as opções de países no datalist correspondente
paises.forEach(function (pais) {
    const option = document.createElement('option');
    option.value = pais;
    datalistPaises.appendChild(option);
});

// Pega o datalist das opções de cidades
const datalistCidades = document.getElementById('opcoes-cidades');

// Atualiza o datalist de cidades com as opções do país selecionado
function atualizarCidades() {
    const paisSelecionado = document.getElementById('pais').value;
    const cidades = cidadesPorPais[paisSelecionado] || [];
    datalistCidades.innerHTML = '';
    cidades.forEach(function (cidade) {
        const option = document.createElement('option');
        option.value = cidade;
        datalistCidades.appendChild(option);
    });
}




listaAmigos()
usuario()