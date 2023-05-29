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

const estadosPorPais = {
    'Brasil': ['Rio de Janeiro', 'São Paulo', 'Minas Gerais'],
    'Argentina': ['Buenos Aires', 'Córdoba', 'Santa Fé'],
    'Alemanha': ['Berlim', 'Munique', 'Hamburgo'],
    'selulite': ['estado1', 'estado2', 'estado3']
};

const cidadesPorEstado = {
    'Rio de Janeiro': ['Rio de Janeiro', 'Niterói', 'Petrópolis'],
    'São Paulo': ['São Paulo', 'Campinas', 'Guarulhos'],
    'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Juiz de Fora'],
    'Buenos Aires': ['Buenos Aires', 'La Plata', 'Mar del Plata'],
    'Córdoba': ['Córdoba', 'Villa Carlos Paz', 'Río Cuarto'],
    'Santa Fé': ['Santa Fé', 'Rosário', 'Venado Tuerto'],
    'Berlim': ['Berlim', 'Hamburgo', 'Munique'],
    'Munique': ['Munique', 'Nuremberg', 'Augsburg'],
    'Hamburgo': ['Hamburgo', 'Bremen', 'Lübeck'],
    'estado1': ['cidade1', 'cidade2', 'cidade3'],
    'estado2': ['cidade4', 'cidade5', 'cidade6'],
    'estado3': ['cidade7', 'cidade8', 'cidade9']
};

const datalistPaises = document.getElementById('opcoes-pais');
const datalistEstados = document.getElementById('opcoes-estados');
const datalistCidades = document.getElementById('opcoes-cidades');



paises.forEach(function (pais) {
    const option = document.createElement('option');
    option.value = pais;
    datalistPaises.appendChild(option);
});

function atualizarEstados() {
    const paisSelecionado = document.getElementById('pais').value;
    const estados = estadosPorPais[paisSelecionado] || [];
    datalistEstados.innerHTML = '';
    datalistCidades.innerHTML = '';
    estados.forEach(function (estado) {
        const option = document.createElement('option');
        option.value = estado;
        datalistEstados.appendChild(option);
    });
}

function atualizarCidades() {
    const estadoSelecionado = document.getElementById('estado').value;
    const cidades = cidadesPorEstado[estadoSelecionado] || [];
    datalistCidades.innerHTML = '';
    cidades.forEach(function (cidade) {
        const option = document.createElement('option');
        option.value = cidade;
        datalistCidades.appendChild(option);
    });
}

function pegarLocalizacaoUsuario() {
    let pais = document.getElementById('pais').value;
    let estado = document.getElementById('estado').value;
    let cidade = document.getElementById('cidade').value;

    if (pais == "" || estado == "" || cidade == "") {
        let error = document.querySelector('.error')
        error.innerHTML = 'Campo Vazio'
    } else {
        localStorage.setItem("localização", JSON.stringify({ "pais": pais, "estado": estado, "cidade": cidade }))

        let modalLocalizacao = document.querySelector('.localizacao')

        window.location.reload()

        modalLocalizacao.classList.add("model")
    }
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
                if (dados.dataFim == null) {
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

                    read.appendChild(tabela)
                }
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


function adicionarEncontro() {

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

    if (dados.descricao.length == 0 || dados.dataHora.length == 0 || dados.titulo.length == 0 || dados.id_local.length == 0) {
        alert("Digite todos os dados pedidos")
    } else {
        let { id } = user

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        };

        fetch(`http://localhost:3000/criarEncontro/${id}`, options)
            .then(response => response.json())
            .then(response => {
                alert("Evento criado")
                window.location.reload()
            })
    }
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

            let encontro = res.EncontroUsuario.filter((e => e.status == 1))

            encontro.forEach((e) => {

                let nomeParticipante = e.idParticipante.nome
                let idParticipante = e.idParticipante.id

                let dados = infoParticipante.cloneNode(true)
                dados.classList.remove('model')

                dados.querySelector('.idParticipante').innerHTML = "#" + idParticipante
                dados.querySelector('.nomeParticipante').innerHTML = nomeParticipante

                let { id } = user
                let btnAdicionarAmigo = dados.querySelector('.btnAdicionarAmigo')

                // if (e.idCriador.id == id) {
                //     let encerrarEncontro = document.querySelector('.encerrarEncontro')
                //     let btnAtualizarEncontro = document.querySelector('.btnAtualizarEncontro')
                //     btnCancelar.classList.add("model")
                //     btnParticipar.classList.add("model")
                //     encerrarEncontro.classList.remove("model")
                //     btnAtualizarEncontro.classList.remove("model")
                // } else {
                //     let encerrarEncontro = document.querySelector('.encerrarEncontro')
                //     let btnAtualizarEncontro = document.querySelector('.btnAtualizarEncontro')
                //     encerrarEncontro.classList.add("model")
                //     btnAtualizarEncontro.classList.add("model")
                // }

                // if (id == e.idParticipante.id) {
                //     btnAdicionarAmigo.classList.add('model')
                // }
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
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        .catch(err => console.error(err));
}

function removerParticipante() {
    let idPartida = JSON.parse(localStorage.getItem("idPartida"))

    let { id } = user

    const options = { method: 'DELETE' };

    fetch(`http://localhost:3000/excluirParticipante/${idPartida}/${id}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        .catch(err => console.error(err));
}

function abrirModalPartida(id) {

    id = id.children[0].children[0].children[0].innerHTML.slice(1)

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

            console.log()

            if (!e.children[0].children[0].children[1].innerHTML == '') {

                let titulo = e.children[0].children[0].children[1].innerHTML
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

function formatarData(campo) {
    const valorSemMascara = campo.value.replace(/\D/g, '');

    const valorFormatado = valorSemMascara.replace(/^(\d{2})(\d)/g, '$1/$2').replace(/^(\d{2}\/\d{2})(\d)/g, '$1/$2');

    campo.value = valorFormatado;

    setTimeout(() => {
        let partidas = document.querySelectorAll('.readInfo');

        partidas.forEach((e) => {

            console.log(e.children[0].children[1].children[1].children[1].innerHTML.split('-')[0])

            if (!e.children[0].children[1].children[1].children[1].innerHTML.split('-')[0] == '') {

                let dataHTML = e.children[0].children[1].children[1].children[1].innerHTML.split('-')[0]

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

                let inputsConvidarAmigo = document.querySelector('.inputsConvidarAmigo')
                let infoConvidarAmigos = document.querySelector('.infoConvidarAmigos')

                let amigo = res.criadorListaAmigo.filter(e => e.status === 1)

                amigo.forEach((e) => {

                    let info = friendsInfo.cloneNode(true)
                    info.classList.remove("model")

                    info.addEventListener('click', function () {

                        acessarPerfilAmigo(this.children[0].innerHTML.slice(1))

                    })

                    info.querySelector('.idAmigo').innerHTML = "#" + e.amigo.id
                    info.querySelector('.nomeAmigo').innerHTML = e.amigo.nome

                    allFriends.appendChild(info)

                    let dados = infoConvidarAmigos.cloneNode(true)
                    dados.classList.remove("model")

                    dados.querySelector('.idAmigoConvite').innerHTML = e.amigo.id
                    dados.querySelector('.nomeAmigoConvite').innerHTML = e.amigo.nome

                    inputsConvidarAmigo.appendChild(dados)
                })
            })
    }, 100)
}

// var btnTopo = document.getElementById("btnTopo");

// btnTopo.addEventListener("click", function () {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// });


const encerrarPartida = document.querySelector('.encerrarEncontro')

function cancelarEncontro() {

    let idPartida = JSON.parse(localStorage.getItem("idPartida"))
    console.log(idPartida)

    let { token } = user
    let { id } = user

    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: token
        },
        body: JSON.stringify({})
    };

    fetch(`http://localhost:3000/finalizarEncontro/${id}/${idPartida}`, options)
        .then(response => {
            console.log(response)
            window.location.reload()
            return response.json()
        })
        .then(res => console.log(res))
}

// let friends_info = document.querySelector('.friends_info')

function acessarPerfilAmigo(idAmigo) {

    let { token } = user
    let { id } = user

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
            window.location.reload()
            return response.json()
        })
        .then(response => console.log(response))
}

function sair() {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "../login/index.html"
}

const menuNotificacoes = document.querySelector('.menuNotificacoes')
const imgConfiguracao = document.querySelector('.imgConfiguracao')
const imgNotificacoes = document.querySelector('.imgNotificacoes')
const menuConfiguracoes = document.querySelector('.menuConfiguracoes')
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

menuNotificacoes.addEventListener('click', (event) => {

    let notificacoes = document.querySelector('.notificacoes')

    notificacoes.classList.toggle('model')
})


menuConfiguracoes.addEventListener('click', () => {
    let configuracoes = document.querySelector('.configuracoes')

    configuracoes.classList.toggle('model')

})

imgConfiguracao.addEventListener('click', function (event) {

    tabContent.classList.forEach((e) => {

        let configuracoes = document.querySelector('.configuracoes')

        if (e == 'active') {
            tabContent.classList.remove('active')

            configuracoes.classList.remove('model')

        } else {
            tabContent.classList.add('active')
            let configuracoes = document.querySelector('.configuracoes')

            configuracoes.classList.add('model')

            let notificacoes = document.querySelector('.notificacoes')

            notificacoes.classList.add('model')
        }
    })
})


imgNotificacoes.addEventListener('click', function (event) {


    tabContent.classList.forEach((e) => {
        if (e == 'active') {
            tabContent.classList.remove('active')
            let notificacoes = document.querySelector('.notificacoes')

            notificacoes.classList.remove('model')
        } else {
            tabContent.classList.add('active')

            let configuracoes = document.querySelector('.configuracoes')

            configuracoes.classList.add('model')
            let notificacoes = document.querySelector('.notificacoes')

            notificacoes.classList.add('model')
        }
    })
})

function abrirModalConfigEncontro() {
    let modalConfigEncontro = document.querySelector('.modalConfigEncontro')

    if (modalConfigEncontro.classList.contains("model")) {
        modalConfigEncontro.classList.remove("model")
    } else {
        modalConfigEncontro.classList.add("model")
    }
}

function modalAbrirConvidarAmigo() {
    let modalAparecer = document.querySelector(".modalConvidarAmigo");
    modalAparecer.classList.remove("model")
}

function fecharModalConvidarAmigo() {
    let modalAparecer = document.querySelector(".modalConvidarAmigo");
    modalAparecer.classList.add("model")
}

function modalAbrirAtualizarEncontro() {
    let modalAparecer = document.querySelector(".modalAtualizarEncontro");
    modalAparecer.classList.remove("model")
}

function fecharModalAtualizarEncontro() {
    let modalAparecer = document.querySelector(".modalAtualizarEncontro");
    modalAparecer.classList.add("model")
}

function atualizarEncontro() {

    let atualizarTituloEncontro = document.querySelector('.atualizarTituloEncontro')
    let atualizarDescricaoEncontro = document.querySelector('.atualizarDescricaoEncontro')
    // let atualizarDataEncontro = document.querySelector('.atualizarDataEncontro')
    // let atualizarHoraEncontro = document.querySelector('.atualizarHoraEncontro')
    let local = document.querySelector('#consulta')

    let data = {};

    if (atualizarTituloEncontro.value) {
        data.titulo = atualizarTituloEncontro.value;
    }

    if (atualizarDescricaoEncontro.value) {
        data.descricao = atualizarDescricaoEncontro.value;
    }

    if (local.value) {
        data.local = local.value;
    }

    let { token } = user
    let { id } = user

    let idPartida = JSON.parse(localStorage.getItem("idPartida"))

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: token
        },
        body: JSON.stringify(data)
    };

    fetch(`http://localhost:3000/editarEncontro/${id}/${idPartida}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            window.location.reload()
        })
}

function convidarAmigosParaEncontro() {
    setTimeout(() => {
        const options = { method: 'GET' };

        let { id } = user

        fetch(`http://localhost:3000/verSolicitacao/${id}`, options)
            .then(response => response.json())
            .then(res => {
                let inputsConvidarAmigo = document.querySelector('.inputsConvidarAmigo')
                let infoConvidarAmigos = document.querySelector('.infoConvidarAmigos')

                let amigo = res.criadorListaAmigo.filter(e => e.status === 1)

                amigo.forEach((e) => {
                    console.log(e)
                    let info = infoConvidarAmigos.cloneNode(true)

                    info.classList.remove("model")

                    info.querySelector('.idAmigoConvite').innerHTML = e.amigo.id
                    info.querySelector('.nomeAmigoConvite').innerHTML = e.amigo.nome

                    inputsConvidarAmigo.appendChild(info)
                })
            })
    }, 100)
}

let btnAbrirModalCriaLocal = document.querySelector('.btnAbrirModalCriaLocal')

btnAbrirModalCriaLocal.addEventListener("click", function (event) {
    event.preventDefault()

    let modalCriarLocal = document.querySelector('.modalCriarLocal')

    modalCriarLocal.classList.remove("model")
})

let btnFecharModalCriarLocal = document.querySelector('.btnFecharModalCriarLocal')

btnFecharModalCriarLocal.addEventListener('click', function (event) {
    let modalCriarLocal = document.querySelector('.modalCriarLocal')

    modalCriarLocal.classList.add("model")
})

function fecharModalConviteAmizade() {
    let modalMandarSolicitacao = document.querySelector('.modalMandarSolicitacao')
    modalMandarSolicitacao.classList.add('model')
}

function abrirModalConviteAmizade() {
    let modalMandarSolicitacao = document.querySelector('.modalMandarSolicitacao')
    modalMandarSolicitacao.classList.remove('model')
}

function filtrarDadosAPI(input) {
    fetch('http://localhost:3000/listarUsuarios')
        .then(response => response.json())
        .then(data => {

            const filtrados = data.filter(item => `#${item.id} ${item.nome}`.toLocaleLowerCase().includes(input.toLocaleLowerCase()));

            const divResultados = document.getElementById('resultados');
            divResultados.innerHTML = '';

            filtrados.forEach(item => {
                let { id } = user
                const resultado = document.querySelector('.usuariosPesquisa').cloneNode(true);

                resultado.classList.remove('model')

                resultado.querySelector('.idUserAdicionar').innerHTML = '#' + item.id;
                resultado.querySelector('.nomeUserAdicionar').textContent = item.nome;

                let btnAddAmigo = resultado.querySelector('.btnAddAmigo')

                if (id == item.id) {
                    btnAddAmigo.classList.add('model')
                }

                let infoAmigo = item.criadorListaAmigo.filter(e => e.amigo.id == id)
                infoAmigo.forEach(e => {

                    // if (e.amigo.id == id && e.status == 0 && id != e.remetente) {
                    //     btnAddAmigo.innerHTML = "aguardando"
                    // }

                    if (e.amigo.id == id && e.status == 1) {
                        btnAddAmigo.innerHTML = "Amigos"
                    }

                    if (e.amigo.id == id && e.status == 0 && id == e.remetente) {
                        btnAddAmigo.innerHTML = "Solicitado"
                    }

                    if (e.amigo.id == id && e.status == 0 && id != e.remetente) {
                        btnAddAmigo.innerHTML = "Aceitar solicitação"
                    }

                })

                btnAddAmigo.addEventListener('click', function () {

                    if (btnAddAmigo.innerText === "Adicionar") {
                        enviarSolicitacao(this.parentNode.children[0].innerHTML.slice(1))
                    } else if (btnAddAmigo.innerText === "Solicitado") {
                        abrirModalCancelarSolicitacao()
                    } else if (btnAddAmigo.innerText === "Amigos") {
                        acessarPerfilAmigo(this.parentNode.children[0].innerHTML.slice(1))
                    }
                })

                divResultados.appendChild(resultado);
            });

        })
        .catch(error => {
            console.log('Erro ao buscar dados da API:', error);
        });
}

// Função que é executada quando o usuário digita no campo de input
function onChangeInput(event) {
    const input = event.target.value;
    filtrarDadosAPI(input);
}

// Obtém o campo de input
const inputCampo = document.getElementById('input');
// Adiciona o evento de digitação ao campo de input
inputCampo.addEventListener('input', onChangeInput);


function criarLocal() {

    let localizacaoUsuario = JSON.parse(localStorage.getItem("localização"));
    let inpNomeLocal = document.querySelector('.inpNomeLocal')
    let inpRuaLocal = document.querySelector('.inpRuaLocal')
    let inpBairroLocal = document.querySelector('.inpBairroLocal')

    let dados = {
        nome: inpNomeLocal.value,
        rua: inpRuaLocal.value,
        bairro: inpBairroLocal.value,
        cidade: localizacaoUsuario.cidade,
        estado: localizacaoUsuario.estado,
        pais: localizacaoUsuario.pais
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    };

    fetch('http://localhost:3000/criarLocal', options)
        .then(response => {
            window.location.reload()
            response.json()
        })
        .then(response => {
            console.log(response)
        })
}

function convidarAmigosParaEncontro(idAmigo) {
    idAmigo = idAmigo.parentNode.children[0].innerHTML
    let idPartida = JSON.parse(localStorage.getItem("idPartida"))

    const options = { method: 'POST' };

    fetch(`http://localhost:3000/convidarAmigo/${idPartida}/${idAmigo}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

function notificaoAmizade() {

    let { id } = user

    const options = { method: 'GET' };

    const dadosNotificacao = document.querySelector('.itensNotificacao')
    const notificacaoModal = document.querySelector('.notificacoes')

    fetch(`http://localhost:3000/verSolicitacao/${id}`, options)
        .then(response => response.json())
        .then(res => {

            let solicitacaoAmizade = res.criadorListaAmigo.filter(element => element.status == 0 && element.remetente != id)
            solicitacaoAmizade.forEach((e) => {

                let notificaoAmizade = dadosNotificacao.cloneNode(true)
                notificaoAmizade.classList.remove("model")

                notificaoAmizade.querySelector('.idSolicitacao').innerHTML = e.amigo.id
                notificaoAmizade.querySelector('.nomeSolicitacao').innerHTML = e.amigo.nome + " mandou uma solicitação de amizade"

                notificacaoModal.appendChild(notificaoAmizade)
            })
        })
}

function verConvite() {
    const options = { method: 'GET' };

    let { id } = user

    fetch(`http://localhost:3000/verConvite/${id}`, options)
        .then(response => response.json())
        .then(response => {
            let notificacoes = document.querySelector('.notificacoes')
            let itensNotificacao = document.querySelector('.itensNotificacaoConvite')

            let conviteEncontros = response.participante.filter((e) => e.status == 0)

            conviteEncontros.forEach((e) => {
                let info = itensNotificacao.cloneNode(true)
                info.classList.remove('model')

                info.querySelector('.nomeSolicitacaoConvite ').innerHTML = e.idCriador.nome + ": convidou você para uma partida"

                notificacoes.appendChild(info)
            })
        })
        .catch(err => console.error(err));
}

function responderConvite(resposta) {

    let { id } = user

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: `{"respConvite":${resposta}}`
    };

    fetch(`http://localhost:3000/responderConvite/${id}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        .catch(err => console.error(err));
}

function enviarSolicitacao(idAmigo) {

    let { id } = user
    console.log(idAmigo)
    const options = { method: 'POST' };

    fetch(`http://localhost:3000/enviarSolicitacao/${id}/${idAmigo}`, options)
        .then(response => response.json())
        .then(response => {
            window.location.reload()
            console.log(response)
        })
}

function abrirModalCancelarSolicitacao() {
    let modalCancelarSolicitacao = document.querySelector('.modalCancelarSolicitacao')

    modalCancelarSolicitacao.classList.remove('model')
}

function fecharCancelamentoDeSolicitacao() {
    let modalCancelarSolicitacao = document.querySelector('.modalCancelarSolicitacao')

    modalCancelarSolicitacao.classList.add('model')

}


verConvite()
listaLocais()
notificaoAmizade()
listaAmigos()
// listarUsuarios()