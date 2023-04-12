const read = document.querySelector('.read');
const readInfo = document.querySelector('.readInfo');
const readLocal = document.querySelector('.readLocal');

function carregar() {
    const options = { method: 'GET' };

    fetch('http://localhost:3000/listarEncontros', options)
        .then(response => response.json())
        .then(res => {
            res.forEach(dados => {

                let tabela = readInfo.cloneNode(true)
                tabela.classList.remove("model")
                tabela.querySelector('.descricao').innerHTML = 'descricao: ' + dados.descricao
                tabela.querySelector('.data').innerHTML = 'data: ' + dados.data
                tabela.querySelector('.titulo').innerHTML = 'titulo: ' + dados.titulo
                tabela.querySelector('.nomeLocal').innerHTML = 'nomeLocal: ' + dados.local.nome
                tabela.querySelector('.capacidadeLocal').innerHTML = 'capacidadeLocal: ' + dados.local.capacidade
                tabela.querySelector('.cepLocal').innerHTML = 'cepLocal: ' + dados.local.cep
                read.appendChild(tabela)
            });

        })
        .catch(err => console.error(err));
}