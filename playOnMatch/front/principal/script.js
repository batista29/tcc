const read = document.querySelector('.read');
const readInfo = document.querySelector('.readInfo');
const readLocal = document.querySelector('.readLocal');

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
                tabela.querySelector('.descricao').innerHTML = 'descricao: ' + dados.descricao

                var date = new Date(dados.data);
                let dataFormatada = date.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });


                tabela.querySelector('.data').innerHTML = 'data: ' + dataFormatada
                tabela.querySelector('.titulo').innerHTML = 'titulo: ' + dados.titulo
                tabela.querySelector('.nomeLocal').innerHTML = 'nomeLocal: ' + dados.local.nome
                tabela.querySelector('.capacidadeLocal').innerHTML = 'capacidadeLocal: ' + dados.local.capacidade
                tabela.querySelector('.cepLocal').innerHTML = 'endereço: ' + dados.local.endereco
                read.appendChild(tabela)
            });

        })
        .catch(err => console.error(err));
}

function adicionarEncontro() {

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

    console.log(dados)

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
}


function abrirModal() {
    let modalAparecer = document.querySelector(".readInferior");
    modalAparecer.classList.add("modal")
}

function fecharModal() {
    let modalAparecer = document.querySelector(".readInferior");
    modalAparecer.classList.remove("modal")
}