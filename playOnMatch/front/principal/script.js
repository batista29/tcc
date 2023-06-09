const read = document.querySelector('.read');
const readInfo = document.querySelector('.readInfo');
const readLocal = document.querySelector('.readLocal');

const filtroTituloPartidas = document.querySelector('.filtroTituloPartidas')
const filtroDatePartidas = document.querySelector('.filtroDatePartidas')

const user = JSON.parse(localStorage.getItem('usuario'))


if (!sessionStorage.getItem('pegarLocalização')) {

    const localizacaoUsuario = JSON.parse(localStorage.getItem("localização"));

    if (localizacaoUsuario == null) {
        let local = document.querySelector('.localizacao')

        local.classList.remove('model')
    }
}

const btnAlterarLocal = document.querySelector('.btnAlterarLocal')

btnAlterarLocal.addEventListener('click', () => {
    let local = document.querySelector('.localizacao')

    local.classList.remove('model')
})

const fecharModalLocalizacao = document.querySelector('.fecharModalLocalizacao')

function local() {
    const localizacaoUsuario = JSON.parse(localStorage.getItem("localização"));

    if (localizacaoUsuario == null) {
        fecharModalLocalizacao.classList.add('model')
    }
    fecharModalLocalizacao.addEventListener('click', () => {


        let local = document.querySelector('.localizacao')

        local.classList.add('model')
    })
}


function pegarLocalizacaoUsuario() {
    let pais = document.getElementById('select-pais').value;
    let estado = document.getElementById('select-estado').value;
    let cidade = document.getElementById('select-cidade').value;

    if (pais == "" || estado == "" || cidade == "") {
        let error = document.querySelector('.error')
        error.innerHTML = 'Campo Vazio'
    } else {

        localStorage.setItem("localização", JSON.stringify({ "pais": pais, "estado": estado, "cidade": cidade }))

        let modalLocalizacao = document.querySelector('.localizacao')

        window.location.reload()

        modalLocalizacao.classList.add("model")

        sessionStorage.setItem('pegarLocalização', 'true');
    }
}

function buscarEstados() {
    var selectPais = document.getElementById('select-pais');
    var selectEstado = document.getElementById('select-estado');

    selectEstado.innerHTML = '<option value="">Selecione um estado</option>';

    if (selectPais.value) {
        var estados;

        if (selectPais.value === 'Brasil') {
            estados = ['São Paulo', 'Rio de Janeiro', 'Minas Gerais'];
        } else if (selectPais.value === 'Estados Unidos') {
            estados = ['California', 'New York', 'Texas'];
        }

        for (var i = 0; i < estados.length; i++) {
            var option = document.createElement('option');
            option.value = estados[i];
            option.textContent = estados[i];
            selectEstado.appendChild(option);
        }
    }
}

function buscarCidades() {
    var selectEstado = document.getElementById('select-estado');
    var selectCidade = document.getElementById('select-cidade');

    selectCidade.innerHTML = '<option value="">Selecione uma cidade</option>';

    if (selectEstado.value) {
        var cidades;

        if (selectEstado.value === 'São Paulo') {
            cidades = ['São Paulo', 'Campinas', 'Jaguariúna'];
        } else if (selectEstado.value === 'Rio de Janeiro') {
            cidades = ['Rio de Janeiro', 'Niterói', 'Nova Iguaçu'];
        } else if (selectEstado.value === 'Minas Gerais') {
            cidades = ['Belo Horizonte', 'Uberlândia', 'Contagem'];
        } else if (selectEstado.value === 'California') {
            cidades = ['Los Angeles', 'San Francisco', 'San Diego'];
        } else if (selectEstado.value === 'New York') {
            cidades = ['Nova York', 'Buffalo', 'Rochester'];
        } else if (selectEstado.value === 'Texas') {
            cidades = ['Houston', 'Austin', 'Dallas'];
        }

        for (var i = 0; i < cidades.length; i++) {
            var option = document.createElement('option');
            option.value = cidades[i];
            option.textContent = cidades[i];
            selectCidade.appendChild(option);
        }
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
            if (localizacaoUsuario) {

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
            }
        })
    qntdDeNotificacao()
}


function listaLocais() {
    const options1 = { method: 'GET' };

    fetch('http://localhost:3000/listarLocais', options1)
        .then(response => response.json())
        .then(res => {

            let opcao = document.getElementById("consulta")
            let opcao2 = document.getElementById("consulta2")
            const localizacaoUsuario = JSON.parse(localStorage.getItem("localização"));

            opcao.innerHTML = "";
            opcao2.innerHTML = "";

            if (localizacaoUsuario) {
                let nwDados = res.filter(e => e.pais == localizacaoUsuario.pais && e.cidade == localizacaoUsuario.cidade && e.estado === localizacaoUsuario.estado)

                nwDados.forEach(function (valor) {
                    var optionElement = document.createElement("option");
                    optionElement.innerHTML = " " + valor.id + " - " + valor.nome
                    console.log(optionElement)

                    opcao.appendChild(optionElement);
                })

                nwDados.forEach(function (valor) {
                    var optionElement = document.createElement("option");
                    optionElement.innerHTML = " " + valor.id + " - " + valor.nome
                    console.log(optionElement)

                    opcao2.appendChild(optionElement);
                })
            }
        })
}

function adicionarEncontro() {

    let consulta = document.getElementById('consulta')
    let nwLocal = consulta.value.split('-')[0]

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

            console.log()

            const participantes = document.querySelector('.participantes')
            const infoParticipante = document.querySelector('.infoParticipantes')
            const btnCancelar = document.querySelector('.btnCancelarParticipacao')
            const btnParticipar = document.querySelector('.btnParticiparDoEvento')

            let detalhesEncontro = document.querySelector('.descricaoModalEncontro')
            let infoEncontro = document.querySelector('.infoEncontro')

            let dados = infoEncontro.cloneNode(true)
            dados.classList.remove('model')

            let data = new Date(res.dataHora);

            let nwData = data.toLocaleDateString("pt-BR", {
                timeZone: "UTC",
            });

            dados.querySelector('.tituloEncontro').innerHTML = res.titulo
            dados.querySelector('.descricaoEncontro').innerHTML = res.descricao
            dados.querySelector('.enderecoEncontro').innerHTML = res.local.cidade + "-" + res.local.pais
            dados.querySelector('.nomeEncontro').innerHTML = res.local.nome
            dados.querySelector('.dataEncontro').innerHTML = nwData + " - "+ res.dataHora.split("T")[1].split('.')[0]

            detalhesEncontro.appendChild(dados)

            let encontro = res.EncontroUsuario.filter((e => e.status == 1))

            encontro.forEach((e) => {

                let nomeParticipante = e.idParticipante.nome

                let dados = infoParticipante.cloneNode(true)
                dados.classList.remove('model')

                dados.querySelector('.idParticipante').innerHTML = e.idParticipante.id
                dados.querySelector('.nomeParticipante').innerHTML = nomeParticipante

                let options2 = { method: 'GET' };

                fetch(`http://localhost:3000/perfil/${e.idParticipante.id}/foto`, options2)
                    .then(response => {
                        return response.blob();
                    })
                    .then(blob => {
                        const imageUrl = URL.createObjectURL(blob);
                        dados.querySelector('.imguser').src = imageUrl
                    })

                let { id } = user

                if (e.idCriador.id === id) {
                    let encerrarEncontro = document.querySelector('.encerrarEncontro')
                    let btnAtualizarEncontro1 = document.querySelector('.btnAtualizarEncontro1')

                    encerrarEncontro.classList.remove("model")
                    btnAtualizarEncontro1.classList.remove("model")
                }

                let btnOptions = dados.querySelector('.btnOptions')

                if (e.idParticipante.id == id) {
                    btnOptions.classList.add('model')
                }

                if (btnOptions.classList.contains('model')) {
                    dados.style.cursor = 'pointer'
                }

                let amizade = e.idParticipante.criadorListaAmigo.filter(e => e.amigo.id == id)

                dados.querySelector('.idParticipante').innerText

                amizade.forEach(e => {

                    if (e.amigo.id == id && e.status == 1) {
                        btnOptions.innerHTML = "Amigos"
                        dados.style.cursor = 'pointer'
                    }

                    if (e.amigo.id == id && e.status == 0 && id == e.remetente) {
                        btnOptions.innerHTML = "Solicitado"
                    }

                    if (e.amigo.id == id && e.status == 0 && id != e.remetente) {
                        btnOptions.innerHTML = "Responder solicitação"
                    }

                })

                if (btnOptions.innerText == "Amigos" || btnOptions.classList.contains('model')) {
                    dados.addEventListener("click", function () {
                        let id = this.children[0].innerHTML

                        acessarPerfilAmigo(id)
                    })
                }

                btnOptions.addEventListener('click', function () {
                    let idParticipante = this.parentNode.children[0].innerHTML

                    if (btnOptions.innerText == 'Adicionar') {
                        enviarSolicitacao(idParticipante)
                    } else if (btnOptions.innerText == "Solicitado") {
                        abrirModalCancelarSolicitacao(idParticipante)
                    } else if (btnOptions.innerText == "Responder solicitação") {
                        modalResponderSolicitacao(idParticipante)
                    }
                })
                participantes.appendChild(dados)
            })

            let { id } = user
            let nw = res.EncontroUsuario.filter(element => element.idParticipante.id == id)
            nw.forEach((e => {
                if (e.idParticipante.id == id) {
                    btnCancelar.disabled = false
                    btnParticipar.disabled = true
                } else {
                    btnCancelar.disabled = true
                    btnParticipar.disabled = false
                }
                if(e.idCriador.id == id){
                    btnCancelar.disabled = true
                    btnParticipar.disabled = true
                }
            }))

        })
}

function adicionarParticipante() {

    let idPartida = JSON.parse(localStorage.getItem("idPartida"))

    let { id } = user

    const options = { method: 'POST' };

    fetch(`http://localhost:3000/adicionarParticipante/${idPartida}/${id}`, options)
        .then(response => {
            console.log(response)
            response.json()
        })
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        .catch(err => console.error(err));
}

function removerParticipante() {
    let idPartida = JSON.parse(localStorage.getItem("idPartida"))

    let { id } = user

    console.log(id)

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
    amigos()
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

    localStorage.setItem("perfil", JSON.stringify(id))
    window.location.href = "../perfil/index.html"
}

const perfil = document.querySelector('.perfil')
const per = document.querySelector('.friends')

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

                amigo.forEach((e) => {

                    let info = friendsInfo.cloneNode(true)
                    info.classList.remove("model")

                    info.addEventListener('click', function () {

                        acessarPerfilAmigo(this.children[1].innerHTML)
                    })

                    info.querySelector('.idAmigo').innerHTML = e.amigo.id
                    info.querySelector('.nomeAmigo').innerHTML = e.amigo.nome

                    let options2 = { method: 'GET' };

                    fetch(`http://localhost:3000/perfil/${e.amigo.id}/foto`, options2)
                        .then(response => {
                            return response.blob();
                        })
                        .then(blob => {
                            const imageUrl = URL.createObjectURL(blob);
                            info.querySelector('.imguser').src = imageUrl
                        })

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

function acessarPerfilAmigo(idAmigo) {

    let { token } = user
    let { id } = user

    const options = {
        method: 'GET',
        headers: {
            authorization: token
        }
    };

    console.log(idAmigo)

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


function responderSolicitacaoAmizader(resposta, idUsuario) {

    let { id } = user

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: `{"RespUsuario":${resposta}}`
    };

    fetch(`http://localhost:3000/solicitacaoAmizade/${idUsuario}/${id}`, options)
        .then(response => {
            console.log(response)
            window.location.reload()
            return response.json()
        })
        .then(response => {
            console.log(response)
        })
}

function sair() {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "../login/index.html"
}


function abrirModalNotificacao() {
    let notificacoes = document.querySelector('.notificacoes')

    notificacoes.classList.toggle('model')
}


const imgPerfil = document.querySelector('.imgPerfil')

imgPerfil.addEventListener('click', () => {

    let verPerfil = document.querySelector('.verPerfil')

    verPerfil.classList.toggle('model')
})

const imgPerfil2 = document.querySelector('.imgPerfil2')

imgPerfil2.addEventListener('click', () => {

    let verPerfil = document.querySelector('.verPerfil')

    verPerfil.classList.toggle('model')
})

function modalAbrirConvidarAmigo() {
    let modalAparecer = document.querySelector(".modalConvidarAmigo");
    modalAparecer.classList.remove("model")


}

function fecharModalConvidarAmigo() {
    let modalAparecer = document.querySelector(".modalConvidarAmigo");
    modalAparecer.classList.add("model")

    localStorage.removeItem("participantes");
}

async function participantes() {
    let options3 = { method: 'GET' };

    let idPartida = JSON.parse(localStorage.getItem("idPartida"))
    if (idPartida) {
        const response = await fetch(`http://localhost:3000/listarEncontro/${idPartida}`, options3)
        const data = await response.json()
        let participante = data.EncontroUsuario.filter(e => e.status == 1 || e.status == 0)
        return participante
    }
}

function amigos() {
    let { id } = user

    let inputsConvidarAmigo = document.querySelector('.inputsConvidarAmigo')
    let infoConvidarAmigos = document.querySelector('.infoConvidarAmigos')

    const options = { method: 'GET' };

    fetch(`http://localhost:3000/verSolicitacao/${id}`, options)
        .then(response => response.json())
        .then(async res => {
            let amigo = res.criadorListaAmigo.filter(e => e.status === 1)

            for (const e of amigo) {
                let dados = infoConvidarAmigos.cloneNode(true)
                dados.classList.remove("model")

                dados.querySelector('.idAmigoConvite').innerHTML = e.amigo.id
                dados.querySelector('.nomeAmigoConvite').innerHTML = e.amigo.nome

                let options2 = { method: 'GET' };

                fetch(`http://localhost:3000/perfil/${e.amigo.id}/foto`, options2)
                    .then(response => {
                        return response.blob();
                    })
                    .then(blob => {
                        const imageUrl = URL.createObjectURL(blob);
                        dados.querySelector('.imgAmigo2').src = imageUrl
                    })

                let participantesPromise = participantes()

                const participante = await participantesPromise;
                console.log(participante)
                let isParticipante = participante.some(p => p.idParticipante.id === e.amigo.id && p.status == 1);
                let convidado = participante.some(p => p.idParticipante.id === e.amigo.id && p.status == 0);

                if (isParticipante) {
                    dados.querySelector('.btnConvidar').innerHTML = 'participante';
                }
                if (convidado) {
                    dados.querySelector('.btnConvidar').innerHTML = 'convidado';
                }
                inputsConvidarAmigo.appendChild(dados);
            }
        })
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
    let local = document.querySelector('#consulta2')

    console.log()

    let data = {};

    if (atualizarTituloEncontro.value) {
        data.titulo = atualizarTituloEncontro.value;
    }

    if (atualizarDescricaoEncontro.value) {
        data.descricao = atualizarDescricaoEncontro.value;
    }

    if (local.value) {
        data.id_local = Number(local.innerHTML.split(' ')[1]);
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

    window.location.reload()
}

function abrirModalConviteAmizade() {
    let modalMandarSolicitacao = document.querySelector('.modalMandarSolicitacao')
    modalMandarSolicitacao.classList.remove('model')
}

function listarUsuarios() {
    const options = { method: 'GET' };

    let dadosUser = document.querySelector('.dadosUser')
    let usuariosPesquisa = document.querySelector('.usuariosPesquisa')

    let { id } = user

    fetch('http://localhost:3000/listarUsuarios', options)
        .then(response => response.json())
        .then(response => {
            response.forEach((e) => {
                let dados = usuariosPesquisa.cloneNode(true)

                dados.querySelector('.idUserAdicionar').innerHTML = e.id
                dados.querySelector('.nomeUserAdicionar').innerHTML = e.nome
                let btnAddAmigo = dados.querySelector('.btnAddAmigo')

                let amigos = e.criadorListaAmigo.filter((e => e.amigo.id == id && e.status == 1))
                let solicitado = e.criadorListaAmigo.filter((e => e.amigo.id == id && e.status == 0 && e.remetente == id))
                let responder = e.criadorListaAmigo.filter((e => e.amigo.id == id && e.status == 0 && e.remetente != id))

                amigos.forEach((e => {
                    btnAddAmigo.innerHTML = 'Amigos';
                }))

                responder.forEach((e => {
                    btnAddAmigo.innerHTML = 'Responder';
                }))

                solicitado.forEach((e => {
                    btnAddAmigo.innerHTML = 'Solicitado';
                }))

                if (id == e.id) {
                    btnAddAmigo.style.display = 'none';
                }

                if (btnAddAmigo.innerHTML == 'Amigos') {
                    btnAddAmigo.addEventListener('click', function () {
                        let idUsuario = this.parentNode.children[0].innerHTML

                        acessarPerfilAmigo(idUsuario)
                    })
                }

                if (btnAddAmigo.innerHTML == 'Solicitado') {
                    btnAddAmigo.addEventListener('click', function () {
                        let idUsuario = this.parentNode.children[0].innerHTML

                        abrirModalCancelarSolicitacao(idUsuario)
                    })
                }

                if (btnAddAmigo.innerHTML == 'Responder') {
                    btnAddAmigo.addEventListener('click', function () {
                        let idUsuario = this.parentNode.children[0].innerHTML
                        modalResponderSolicitacao(idUsuario)
                    })
                }

                if (btnAddAmigo.innerHTML == 'Adicionar') {
                    btnAddAmigo.addEventListener('click', function () {
                        let idUsuario = this.parentNode.children[0].innerHTML
                        enviarSolicitacao(idUsuario)

                    })
                }

                let options2 = { method: 'GET' };

                fetch(`http://localhost:3000/perfil/${e.id}/foto`, options2)
                    .then(response => {
                        return response.blob();
                    })
                    .then(blob => {
                        const imageUrl = URL.createObjectURL(blob);
                        dados.querySelector('.imgUsuario').src = imageUrl
                    })
                dadosUser.appendChild(dados)
            })
        })
}

const inputCampo = document.getElementById('input');
inputCampo.addEventListener('input', onChangeInput)

function onChangeInput() {

    setTimeout(() => {
        let usuariosPesquisa = document.querySelectorAll('.usuariosPesquisa')

        if (inputCampo.value === '') {
            usuariosPesquisa.forEach((e) => {
                e.style.display = 'none';
            });
        } else {
            usuariosPesquisa.forEach((e) => {

                if (e.children[2].innerHTML != ' ') {

                    e.classList.remove('model')

                    let titulo = e.children[2].innerHTML
                    titulo = titulo.toLowerCase()

                    let filter = inputCampo.value.toLowerCase()

                    if (!titulo.includes(filter)) {
                        e.style.display = 'none'
                    } else {
                        e.style.display = "flex"
                    }
                } else {
                    e.style.display = 'none'
                }

            })
        }


    }, 100);
}


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

    let botao = idAmigo

    idAmigo = idAmigo.parentNode.children[0].innerHTML

    let idPartida = JSON.parse(localStorage.getItem("idPartida"))

    const options = { method: 'POST' };

    if (botao.innerText == "Convidar") {
        fetch(`http://localhost:3000/convidarAmigo/${idPartida}/${idAmigo}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(err => console.error(err));
    }
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

            localStorage.setItem("notificações2", JSON.stringify(solicitacaoAmizade.length))

            solicitacaoAmizade.forEach((e) => {

                let notificaoAmizade = dadosNotificacao.cloneNode(true)
                notificaoAmizade.classList.remove("model")

                notificaoAmizade.querySelector('.idSolicitacao').innerHTML = e.amigo.id
                notificaoAmizade.querySelector('.nomeSolicitacao').innerHTML = e.amigo.nome + " mandou uma solicitação de amizade"

                let btn1 = notificaoAmizade.querySelector('#btn1')
                let btn2 = notificaoAmizade.querySelector('#btn2')

                btn1.addEventListener("click", function () {
                    let idUsuario = this.parentNode.parentNode.children[0].children[0].innerHTML
                    responderSolicitacaoAmizader(1, idUsuario)
                })

                btn2.addEventListener("click", function () {
                    let idUsuario = this.parentNode.parentNode.children[0].children[0].innerHTML
                    responderSolicitacaoAmizader(2, idUsuario)
                })

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

            localStorage.setItem("notificações", JSON.stringify(conviteEncontros.length))


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

    console.log(idAmigo)

    let { id } = user
    const options = { method: 'POST' };

    fetch(`http://localhost:3000/enviarSolicitacao/${id}/${idAmigo}`, options)
        .then(response => {
            return response.json()
        })
        .then(response => {
            window.location.reload()

            console.log(response)
        })
}

function abrirModalCancelarSolicitacao(idParticipante) {

    let modalCancelarSolicitacao = document.querySelector('.modalCancelarSolicitacao')

    modalCancelarSolicitacao.classList.remove('model')

    const options = { method: 'GET' };
    let bntCancelarSolicitacao = document.querySelector(".bntCancelarSolicitacao")

    let { id } = user

    fetch(`http://localhost:3000/listarUsuario/${id}`, options)
        .then(response => response.json())
        .then(response => {

            let lista1 = response.criadorListaAmigo.filter(e => e.remetente == id && idParticipante == e.idAmigo)
            let lista2 = response.amigo.filter(e => e.remetente == id && idParticipante == e.idCriador)

            console.log(lista1)
            console.log(lista2)

            bntCancelarSolicitacao.addEventListener('click', () => {
                const options = { method: 'DELETE' };

                fetch(`http://localhost:3000/cancelarSolicitacao/${lista1[0].id}/${lista2[0].id}`, options)
                    .then(response => {
                        window.location.reload()
                        return response.json()
                    })
                    .then(response => console.log(response))
                    .catch(err => console.error(err));
            })
        })
}

function fecharCancelamentoDeSolicitacao() {
    let modalCancelarSolicitacao = document.querySelector('.modalCancelarSolicitacao')

    modalCancelarSolicitacao.classList.add('model')
}

function usuario() {
    let options = { method: 'GET' };

    let { id } = user

    fetch(`http://localhost:3000/perfil/${id}/foto`, options)
        .then(response => {
            return response.blob();
        })

        .then(blob => {
            let imgPerfil = document.querySelector('.imgPerfil')
            let imgPerfil2 = document.querySelector('.imgPerfil2')
            let imgVerPerfil = document.querySelector('.imgVerPerfil')

            const imageUrl = URL.createObjectURL(blob);

            imgVerPerfil.src = imageUrl
            imgPerfil.src = imageUrl
            imgPerfil2.src = imageUrl
        })
}

function qntdDeNotificacao() {
    const notificacao1 = JSON.parse(localStorage.getItem('notificações')) || 0
    const notificacao2 = JSON.parse(localStorage.getItem('notificações2')) || 0

    let totalDeNotificacao = notificacao1 + notificacao2

    let count = document.querySelector('.count')
    let count2 = document.querySelector('.count2')

    count.innerHTML = totalDeNotificacao
    count2.innerHTML = totalDeNotificacao
}

function modalResponderSolicitacao(id) {
    let modalResponderSolicitacaoAmizade = document.querySelector('.modalResponderSolicitacaoAmizade')

    modalResponderSolicitacaoAmizade.classList.remove('model')

    console.log(modalResponderSolicitacaoAmizade)

    let btnAceitarAmizade = document.getElementById('btnRespAceitarAmizade')
    let btnRecusarAmizade = document.getElementById('btnRespRecusarAmizade')

    btnAceitarAmizade.addEventListener("click", function () {
        responderSolicitacaoAmizader(1, id)
    })

    btnRecusarAmizade.addEventListener("click", function () {
        responderSolicitacaoAmizader(2, id)
    })
}

function fecharModalResponderSolicitacao() {
    let modalResponderSolicitacaoAmizade = document.querySelector('.modalResponderSolicitacaoAmizade')

    modalResponderSolicitacaoAmizade.classList.add('model')
}

let imgAmigo = document.querySelector('.imgAmigo')

imgAmigo.addEventListener('click', function () {
    let friends = document.querySelector('.friends')

    if (friends.style.display === 'block') {
        friends.style.display = 'none'
    } else {
        friends.style.display = 'block'
    }
})

let imgFriends2 = document.querySelector('.imgFriends2')

imgFriends2.addEventListener('click', function () {
    let friends = document.querySelector('.friends')

    if (friends.style.display === 'block') {
        friends.style.display = 'none'
    } else {
        friends.style.display = 'block'
    }
})

usuario()
verConvite()
listaLocais()
notificaoAmizade()
listaAmigos()
local()
listarUsuarios()