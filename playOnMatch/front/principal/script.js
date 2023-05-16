const read = document.querySelector('.read');
const readInfo = document.querySelector('.readInfo');
const readLocal = document.querySelector('.readLocal');

const filtroTituloPartidas = document.querySelector('.filtroTituloPartidas')
const filtroDatePartidas = document.querySelector('.filtroDatePartidas')

const user = JSON.parse(localStorage.getItem('usuario'))


if (!sessionStorage.getItem('pegarLocalização')) {

    let local = document.querySelector('.localizacao')

    local.classList.remove('model')

    sessionStorage.setItem('pegarLocalização', 'true');
}


const paises = ['Brasil', 'Argentina', 'Alemanha', 'selulite'];

const cidadesPorPais = {
    'Brasil': ['Rio de Janeiro', 'São Paulo', 'Belo Horizonte', 'Jaguariúna'],
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

function pegarLocalizacaoUsuario() {
    let pais = document.getElementById('pais').value;
    let cidade = document.getElementById('cidade').value;

    localStorage.setItem("localização", JSON.stringify({ "pais": pais, "cidade": cidade }))

    let modalLocalizacao = document.querySelector('.localizacao')

    window.location.reload()

    modalLocalizacao.classList.add("model")
}


function favoritarPartida(idEncontro) {

    // faz parar o  evento do pai dele 
    // event.stopPropagation();

    const { id } = user

    idEncontro = idEncontro.parentNode.children[1].children[0].innerHTML.slice(1)

    const btnFavoritarPartida = document.getElementById('favorito')

    console.log(btnFavoritarPartida.classList)


    const adicionarFavorito = () => {

        const options = { method: 'POST' };

        fetch(`http://localhost:3000/favoritarEncontro/${id}/${idEncontro}`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        btnFavoritarPartida.classList.add('favorito');
    }



    const removerFavorito = () => {
        const options2 = { method: 'DELETE' };

        fetch(`http://localhost:3000/removerEncontros/${id}/${idEncontro}`, options2)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        btnFavoritarPartida.classList.remove('favorito');
    }


    if (btnFavoritarPartida.classList.contains('favorito')) {
        removerFavorito()
    } else {
        adicionarFavorito()
    }


    // para selecionar o elemento que disparou o evento, que é o próprio botão que foi clicado.
    // const btnFavoritarPartida = event.currentTarget;
    // Em seguida, usei querySelector com currentTarget para selecionar a imagem dentro desse botão específico.
    // Dessa forma, a troca da imagem só acontece dentro do botão que foi clicado.
    // const imgEstrela = btnFavoritarPartida.querySelector('.imgEstrela');

    // if (imgEstrela.src.includes('estrela.png')) {
    //     imgEstrela.src = '../../docs/imgs/estrelaAmarela.png';
    // } else {
    //     imgEstrela.src = '../../docs/imgs/estrela.png';
    // }
}



function carregar() {

    const options = {
        method: 'GET'
    };

    const localizacaoUsuario = JSON.parse(localStorage.getItem("localização"));

    fetch('http://localhost:3000/listarEncontros', options)
        .then(response => response.json())
        .then(res => {
            let nwRes = res.filter(e => e.local.pais === localizacaoUsuario.pais && e.local.cidade === localizacaoUsuario.cidade)

            nwRes.forEach(dados => {

                console.log(dados.local)
                let tabela = readInfo.cloneNode(true)

                tabela.classList.remove("model")

                let date = new Date(dados.dataHora);

                let horas = dados.dataHora.split('T')[1].split('.')[0]

                let dataFormatada = date.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                tabela.querySelector('.idLocal').innerHTML = "#" + dados.id
                tabela.querySelector('.titulo').innerHTML = dados.titulo

                tabela.querySelector('.data').innerHTML = dataFormatada + "-" + horas
                tabela.querySelector('.endereco').innerHTML = dados.local.nome

                let btnFavoritarPartida = tabela.querySelector('.btnFavoritarPartida');
                btnFavoritarPartida.addEventListener('click', favoritarPartida);

                read.appendChild(tabela)
            });
        })
}


function listaLocais() {
    const options1 = { method: 'GET' };

    fetch('http://localhost:3000/listarLocais', options1)
        .then(response => response.json())
        .then(res => {

            let opcao = document.getElementById("opcoes")
            const localizacaoUsuario = JSON.parse(localStorage.getItem("localização"));

            opcao.innerHTML = "";

            let nwDados = res.filter(e => e.pais == localizacaoUsuario.pais && e.cidade == localizacaoUsuario.cidade)

            nwDados.forEach(function (valor) {
                var optionElement = document.createElement("option");
                optionElement.value = "#" + valor.id + " - " + valor.nome

                opcao.appendChild(optionElement);
            })
        })
}

listaLocais()

function adicionarEncontro() {

    // criar encontro
    let consulta = document.getElementById('consulta')
    let nwLocal = consulta.value.split('-')[0].slice(1)

    let descricaoSubmit = document.querySelector("#descricaoSubmit")

    let dataSubmit = document.querySelector("#dataSubmit")
    let horaSubmit = document.querySelector("#timeSubmit")
    let tituloSubmit = document.querySelector("#tituloSubmit")

    let data = dataSubmit.value + "T" + horaSubmit.value + ":00.000Z"

    let dados = {
        descricao: descricaoSubmit.value,
        dataHora: data,
        titulo: tituloSubmit.value,
        id_local: Number(nwLocal)
    }

    let { id } = user

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    };

    fetch(`http://localhost:3000/criarEncontro/${id}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            window.location.reload()
        })

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
            const btnCancelar = document.querySelector('.btnCancelarParticipacao')
            const btnParticipar = document.querySelector('.btnParticiparDoEvento')

            res.EncontroUsuario.forEach((e) => {

                let nomeParticipante = e.idParticipante.nome
                let idParticipante = e.idParticipante.id

                let dados = infoParticipante.cloneNode(true)
                dados.classList.remove('model')

                dados.querySelector('.idParticipante').innerHTML = idParticipante
                dados.querySelector('.nomeParticipante').innerHTML = nomeParticipante

                let { id } = user
                let btnAdicionarAmigo = dados.querySelector('.btnAdicionarAmigo')
                // let btnVisitarPerfil = dados.querySelector('.btnVisitarPerfil')

                if (e.idCriador.id == id) {
                    let encerrarEncontro = document.querySelector('.encerrarEncontro')
                    let btnAtualizarEncontro = document.querySelector('.btnAtualizarEncontro')
                    btnCancelar.classList.add("model")
                    btnParticipar.classList.add("model")
                    encerrarEncontro.classList.remove("model")
                    btnAtualizarEncontro.classList.remove("model")
                } else {
                    let encerrarEncontro = document.querySelector('.encerrarEncontro')
                    let btnAtualizarEncontro = document.querySelector('.btnAtualizarEncontro')
                    encerrarEncontro.classList.add("model")
                    btnAtualizarEncontro.classList.add("model")
                }

                if (id == e.idParticipante.id) {
                    btnAdicionarAmigo.classList.add('model')
                }

                participantes.appendChild(dados)
            })

            let { id } = user
            let nw = res.EncontroUsuario.filter(element => element.idParticipante.id == id)
            if (nw.length == 1) {
                btnCancelar.disabled = false
                btnParticipar.disabled = true
            } else {
                btnCancelar.disabled = true
                btnParticipar.disabled = false
            }
        })
}

function adicionarParticipante() {

    let idPartida = JSON.parse(localStorage.getItem("idPartida"))

    let { id } = user

    const options = { method: 'POST' };

    fetch(`http://localhost:3000/adicionarParticipante/${idPartida}/${id}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

function removerParticipante() {
    let idPartida = JSON.parse(localStorage.getItem("idPartida"))

    let { id } = user

    const options = { method: 'DELETE' };

    fetch(`http://localhost:3000/excluirParticipante/${idPartida}/${id}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

function abrirModalPartida(id) {

    id = id.children[0].children[1].children[0].innerHTML.slice(1)

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


function acessarPerfil() {

    let { id } = user

    // id = id.children[0].innerHTML.slice(1)
    localStorage.setItem("perfil", JSON.stringify(id))
    window.location.href = "../perfil/index.html"
}

const perfil = document.querySelector('.perfil')
const per = document.querySelector('.friends')

// function usuario() {
//     let { id } = user

//     const options = { method: 'GET' };

//     fetch(`http://localhost:3000/listarUsuario/${id}`, options)
//         .then(response => response.json())
//         .then(res => {

//             perfil.cloneNode(true)
//             perfil.classList.remove("model")

//             perfil.querySelector(".idUser").innerHTML = "#" + res.usuario.id
//             perfil.querySelector(".nomeUser").innerText = res.usuario.nome

//             per.appendChild(perfil)
//         })
// }

function listaAmigos() {

    setTimeout(() => {
        const options = { method: 'GET' };

        let { id } = user

        fetch(`http://localhost:3000/verSolicitacao/${id}`, options)
            .then(response => response.json())
            .then(res => {
                let allFriends = document.querySelector('.allFriends')
                let friendsInfo = document.querySelector('.friends_info')

                let amigo = res.criadorListaAmigo.filter(e => e.status === 1)

                console.log(amigo)
                amigo.forEach((e) => {
                    console.log(e)
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

function cancelarEncontro() {

    let idPartida = JSON.parse(localStorage.getItem("idPartida"))

    let user = JSON.parse(localStorage.getItem('usuario'))

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: user.token
        },
        body: false
    };

    fetch(`http://localhost:3000/finalizarEncontro/${idPartida}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

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

function notificaoAmizade() {

    let { id } = JSON.parse(localStorage.getItem('usuario'))
    const options = { method: 'GET' };

    const dadosNotificacao = document.querySelector('.itensNotificacao')
    const notificacaoModal = document.querySelector('.notificacoes')

    fetch(`http://localhost:3000/verSolicitacao/${id}`, options)
        .then(response => response.json())
        .then(res => {
            let solicitacaoAmizade = res.criadorListaAmigo.filter(element => element.status == 0)
            solicitacaoAmizade.forEach((e) => {
                let notificaoAmizade = dadosNotificacao.cloneNode(true)
                notificaoAmizade.classList.remove("model")

                notificaoAmizade.querySelector('.idSolicitacao').innerHTML = e.amigo.id
                notificaoAmizade.querySelector('.nomeSolicitacao').innerHTML = e.amigo.nome + " mandou uma solicitação de amizade"

                notificacaoModal.appendChild(notificaoAmizade)
            })
        })
}

function responderSolicitacaoAmizader(resposta, teste) {

    let idCriadorLista = Number(teste.parentNode.parentNode.children[0].children[0].innerHTML)
    let { id } = user


    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: `{"RespUsuario":${resposta}}`
    };

    fetch(`http://localhost:3000/solicitacaoAmizade/${idCriadorLista}/${id}`, options)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(response => console.log(response))
}

// function adicionarAmigo() {
//     console.log('oi')
// }

// function visitarPerfil() {
//     console.log('oi')
// }

const tab = document.querySelector('[data-target]'),
    tabContent = document.querySelector('[data-content]')

tab.addEventListener('click', () => {
    tabContent.classList.forEach((e) => {
        if (e == 'active') {
            tabContent.classList.remove('active')
        } else {
            tabContent.classList.add('active')
        }
    })
})

function sair() {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "../login/index.html"
}


const menuInteresses = document.querySelector('.menuInteresses')

menuInteresses.addEventListener('click', () => {
    let partidasInteressado = document.querySelector('.partidasInteressado')

    partidasInteressado.classList.toggle('model')

})

const menuNotificacoes = document.querySelector('.menuNotificacoes')

menuNotificacoes.addEventListener('click', () => {

    let notificacoes = document.querySelector('.notificacoes')

    notificacoes.classList.toggle('model')
})
const menuConfiguracoes = document.querySelector('.menuConfiguracoes')

menuConfiguracoes.addEventListener('click', () => {
    let configuracoes = document.querySelector('.configuracoes')

    configuracoes.classList.toggle('model')
})


// function listarNotificacoes() {

//     const user = JSON.parse(localStorage.getItem('usuario'))

//     let { id } = user


//     const options = { method: 'GET' };

//     fetch(`http://localhost:3000/verSolicitacao/${id}`, options)
//         .then(response => response.json())
//         .then(response => console.log(response))
// }

// listarNotificacoes()
notificaoAmizade()
listaAmigos()
// usuario()