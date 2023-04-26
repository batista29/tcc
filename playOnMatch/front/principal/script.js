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
                console.log(dados.id)

                dados.EncontroUsuario.forEach((e)=>{
                })

                let tabela = readInfo.cloneNode(true)
                tabela.classList.remove("model")

                var date = new Date(dados.data);

                var horas = dados.data.split(' ')
                console.log(horas)
                let dataFormatada = date.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                tabela.querySelector('.idLocal').innerHTML = "#"+ dados.id
                tabela.querySelector('.titulo').innerHTML = dados.titulo

                tabela.querySelector('.data').innerHTML = dataFormatada + "-" 
                tabela.querySelector('.endereco').innerHTML = dados.local.endereco
                read.appendChild(tabela)
            });

        })
        // .catch(err => console.error(err));
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