const read = document.querySelector('.read');
const readInfo = document.querySelector('.readInfo');
const readLocal = document.querySelector('.readLocal');

const filterPartida = document.querySelector('.filtroPartidas')

function carregar() {

    const options = {
        method: 'GET'
    };

    fetch('http://localhost:3000/listarEncontros', options)
        .then(response => response.json())
        .then(res => {
            res.forEach(dados => {

                let tabela = readInfo.cloneNode(true)

                // tabela.classList.add("readInfo2")
                tabela.classList.remove("model")

                var date = new Date(dados.data);

                var horas = dados.data.split('T')[1].split('.')[0]

                let dataFormatada = date.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                tabela.querySelector('.idLocal').innerHTML = "#" + dados.id
                tabela.querySelector('.titulo').innerHTML = dados.titulo

                tabela.querySelector('.data').innerHTML = dataFormatada + "-" + horas
                tabela.querySelector('.endereco').innerHTML = dados.local.endereco


                read.appendChild(tabela)
            });
        })
        .catch(err => console.error(err));
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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    };

    fetch('http://localhost:3000/criarEncontro', options)
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

filterPartida.addEventListener('input', filterCards)

function filterCards() {

    setTimeout(() => {
        let partidas = document.querySelectorAll('.readInfo');

        partidas.forEach((e) => {
            if (!e.children[0].children[1].children[0].innerHTML.slice(1) == '') {

                let id = e.children[0].children[1].children[0].innerHTML.slice(1)
                let titulo = e.children[0].children[1].children[1].innerHTML

                let dado = {
                    id: id,
                    titulo: titulo
                }

                titulo = titulo.toLowerCase()

                let filter = filterPartida.value.toLowerCase()

                if (!dado.id.includes(filter) || !dado.titulo.includes(filter)) {
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