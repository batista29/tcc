const read = document.querySelector('.read');
const readInfo = document.querySelector('.readInfo');
const readLocal = document.querySelector('.readLocal');

const filtroTituloPartidas = document.querySelector('.filtroTituloPartidas')
const filtroDatePartidas = document.querySelector('.filtroDatePartidas')

const user = JSON.parse(localStorage.getItem('usuario'))


if (!sessionStorage.getItem('pegarLocalização')) {

    let local = document.querySelector('.localizacao')

    local.classList.remove('model')
}

const btnAlterarLocal = document.querySelector('.btnAlterarLocal')

btnAlterarLocal.addEventListener('click', () => {
    // sessionStorage.setItem('pegarLocalização', 'false');
    let local = document.querySelector('.localizacao')

    local.classList.remove('model')
})

const fecharModalLocalizacao = document.querySelector('.fecharModalLocalizacao')

fecharModalLocalizacao.addEventListener('click', () => {
    let local = document.querySelector('.localizacao')

    local.classList.add('model')
})

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
            cidades = ['São Paulo', 'Campinas', 'Guarulhos'];
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
}


function listaLocais() {
    const options1 = { method: 'GET' };

    fetch('http://localhost:3000/listarLocais', options1)
        .then(response => response.json())
        .then(res => {

            let opcao = document.getElementById("opcoes")
            const localizacaoUsuario = JSON.parse(localStorage.getItem("localização"));

            opcao.innerHTML = "";

            if (localizacaoUsuario) {
                let nwDados = res.filter(e => e.pais == localizacaoUsuario.pais && e.cidade == localizacaoUsuario.cidade)

                nwDados.forEach(function (valor) {
                    var optionElement = document.createElement("option");
                    optionElement.value = "#" + valor.id + " - " + valor.nome

                    opcao.appendChild(optionElement);
                })
            }


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
            dados.querySelector('.dataEncontro').innerHTML = nwData

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
                        if (response.ok) {
                            return response.blob();
                        } else {
                            throw new Error('Imagem não encontrada');
                        }
                    })
                    .then(blob => {
                        const imageUrl = URL.createObjectURL(blob);
                        dados.querySelector('.imguser').src = imageUrl
                    })
                    .catch(error => {
                        console.log(error);
                        dados.querySelector('.imguser').src = '../../docs/imgs/perfilPadrao.jpg'
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
                            if (response.ok) {
                                return response.blob();
                            } else {
                                throw new Error('Imagem não encontrada');
                            }
                        })
                        .then(blob => {
                            const imageUrl = URL.createObjectURL(blob);
                            info.querySelector('.imguser').src = imageUrl
                        })
                        .catch(error => {
                            console.log(error);
                            info.querySelector('.imguser').src = '../../docs/imgs/perfilPadrao.jpg'
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
        .then(response => console.log(response))
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

function modalAbrirConvidarAmigo() {
    let modalAparecer = document.querySelector(".modalConvidarAmigo");
    modalAparecer.classList.remove("model")

    function participantes() {
        let options3 = { method: 'GET' };

        let idPartida = JSON.parse(localStorage.getItem("idPartida"))

        return fetch(`http://localhost:3000/listarEncontro/${idPartida}`, options3)
            .then(response => response.json())
            .then(response => {
                let participante = response.EncontroUsuario.filter(e => e.status == 1)
                return participante
            })
    }

    function amigos() {
        let { id } = user

        let inputsConvidarAmigo = document.querySelector('.inputsConvidarAmigo')
        let infoConvidarAmigos = document.querySelector('.infoConvidarAmigos')

        const options = { method: 'GET' };

        fetch(`http://localhost:3000/verSolicitacao/${id}`, options)
            .then(response => response.json())
            .then(res => {
                let amigo = res.criadorListaAmigo.filter(e => e.status === 1)

                amigo.forEach((e) => {

                    let dados = infoConvidarAmigos.cloneNode(true)
                    dados.classList.remove("model")

                    dados.querySelector('.idAmigoConvite').innerHTML = e.amigo.id
                    dados.querySelector('.nomeAmigoConvite').innerHTML = e.amigo.nome

                    let participantesPromise = participantes()
                    participantesPromise
                        .then(participante => {
                            participante.forEach(e => {
                                // console.log(e.id)
                                if (dados.querySelector('.idAmigoConvite').innerHTML == e.id) {
                                    dados.querySelector('.btnConvidar').innerHTML = 'participante';
                                }
                            })

                            inputsConvidarAmigo.appendChild(dados);
                        })
                })
            })
    }



    amigos()

}

function fecharModalConvidarAmigo() {
    let modalAparecer = document.querySelector(".modalConvidarAmigo");
    modalAparecer.classList.add("model")

    localStorage.removeItem("participantes");
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

function filtrarDadosAPI(input) {
    fetch('http://localhost:3000/listarUsuarios')
        .then(response => response.json())
        .then(data => {

            const filtrados = data.filter(item => `${item.nome}`.toLowerCase().includes(input.toLowerCase()));

            const divResultados = document.getElementById('resultados');

            if (input === '') {
                divResultados.innerHTML = '';
                return
            }

            divResultados.innerHTML = '';

            if (filtrados) {
                filtrados.forEach(item => {
                    const resultado = document.querySelector('.usuariosPesquisa').cloneNode(true);

                    resultado.classList.remove('model')

                    resultado.querySelector('.idUserAdicionar').innerHTML = '#' + item.id;
                    resultado.querySelector('.nomeUserAdicionar').textContent = item.nome;

                    let options2 = { method: 'GET' };

                    fetch(`http://localhost:3000/perfil/${item.id}/foto`, options2)
                        .then(response => {
                            if (response.ok) {
                                return response.blob();
                            } else {
                                throw new Error('Imagem não encontrada');
                            }
                        })
                        .then(blob => {
                            const imageUrl = URL.createObjectURL(blob);
                            resultado.querySelector('.imguser').src = imageUrl
                        })
                        .catch(error => {
                            console.log(error);
                            resultado.querySelector('.imguser').src = '../../docs/imgs/perfilPadrao.jpg'
                        })


                    let btnAddAmigo = resultado.querySelector('.btnAddAmigo')

                    let { id } = user

                    if (id == item.id) {
                        btnAddAmigo.classList.add('model')
                    }

                    let infoAmigo = item.criadorListaAmigo.filter(e => e.amigo.id == id)
                    infoAmigo.forEach(e => {

                        if (e.amigo.id == id && e.status == 1) {
                            btnAddAmigo.innerHTML = "Amigos"
                        }

                        if (e.amigo.id == id && e.status == 0 && id == e.remetente) {
                            btnAddAmigo.innerHTML = "Solicitado"
                        }

                        if (e.amigo.id == id && e.status == 0 && id != e.remetente) {
                            btnAddAmigo.innerHTML = "Responder solicitação"
                        }

                    })

                    btnAddAmigo.addEventListener('click', function () {
                        let idParticipante = this.parentNode.children[0].innerHTML.slice(1)
                        if (btnAddAmigo.innerText === "Adicionar") {
                            enviarSolicitacao(idParticipante)
                        } else if (btnAddAmigo.innerText === "Solicitado") {
                            abrirModalCancelarSolicitacao(idParticipante)
                        } else if (btnAddAmigo.innerText === "Amigos") {
                            acessarPerfilAmigo(idParticipante)
                        }
                    })
                    divResultados.appendChild(resultado);
                });
            }



        })
        .catch(error => {
            console.log('Erro ao buscar dados da API:', error);
        });
}

function onChangeInput(event) {
    const input = event.target.value;
    filtrarDadosAPI(input);
}

const inputCampo = document.getElementById('input');
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

    let botao = idAmigo

    idAmigo = idAmigo.parentNode.children[0].innerHTML

    let idPartida = JSON.parse(localStorage.getItem("idPartida"))

    const options = { method: 'POST' };

    if (botao.innerText == "Convidar") {
        fetch(`http://localhost:3000/convidarAmigo/${idPartida}/${idAmigo}`, options)
            .then(response => response.json())
            .then(response => console.log(response))
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
            console.log('oi')

            window.location.reload()
            return response.json()
        })
        .then(response => {
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

            let btnConvidar = document.querySelector('.btnConvidar')
            console.log(btnConvidar)

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
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Imagem não encontrada');
            }
        })

        .then(blob => {
            let imgPerfil = document.querySelector('.imgPerfil')
            let imgVerPerfil = document.querySelector('.imgVerPerfil')

            const imageUrl = URL.createObjectURL(blob);

            imgVerPerfil.src = imageUrl
            imgPerfil.src = imageUrl
        })
        .catch(error => {
            let imgPerfil = document.querySelector('.imgPerfil')

            console.log(error);
            imgPerfil.src = '../../docs/imgs/perfilPadrao.jpg'
        })
}

function qntdDeNotificacao() {
    const notificacao1 = JSON.parse(localStorage.getItem('notificações'))
    const notificacao2 = JSON.parse(localStorage.getItem('notificações2'))

    let totalDeNotificacao = notificacao1 + notificacao2

    let count = document.querySelector('.count')

    count.innerHTML = totalDeNotificacao
}

function modalResponderSolicitacao(id) {
    let modalResponderSolicitacaoAmizade = document.querySelector('.modalResponderSolicitacaoAmizade')

    modalResponderSolicitacaoAmizade.classList.remove('model')

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

qntdDeNotificacao()
usuario()
verConvite()
listaLocais()
notificaoAmizade()
listaAmigos()
// listarUsuarios()