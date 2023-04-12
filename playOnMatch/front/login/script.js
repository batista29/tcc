
const btnC = document.querySelector(".Cadastro");

btnC.addEventListener("click", function (event) {
    event.preventDefault();
});

const btnL = document.querySelector(".Login");

btnL.addEventListener("click", function (event) {
    event.preventDefault();
});

function estilizarBotoes() {
    let btnLogin = document.querySelector('.login')
    let btnCadastro = document.querySelector('.cadastro')

    let formularioCadastro = document.querySelector('.formulario.cadastro')
    let formularioLogin = document.querySelector('.formulario.login')

    // btnLogin.addEventListener('mouseenter', function () {
    //     btnLogin.style.color = '#04D939'
    //     btnLogin.style.opacity = '';
    //     btnLogin.style.filter = '';
    // });

    // btnCadastro.addEventListener('mouseenter', function () {
    //     btnCadastro.style.color = '#04D939'
    //     btnCadastro.style.opacity = '';
    //     btnCadastro.style.filter = '';
    // });


    btnLogin.addEventListener('click', function () {

        formularioCadastro.style.display = "none"
        formularioLogin.style.display = "flex"

        btnLogin.style.color = '#04D939'
        btnLogin.style.opacity = '';
        btnLogin.style.filter = '';

        btnCadastro.style.color = 'white';
        btnCadastro.style.opacity = 0.3;
        btnCadastro.style.filter = blur('1px');
    })

    btnCadastro.addEventListener('click', function () {

        formularioCadastro.style.display = "flex"
        formularioLogin.style.display = "none"

        btnCadastro.style.color = '#04D939'
        btnCadastro.style.opacity = '200';
        btnCadastro.style.filter = 'none';


        btnLogin.style.color = 'white';
        btnLogin.style.opacity = 0.3;
        btnLogin.style.filter = blur('1px');
    })
}

function cadastrarUsuario() {

    let erroC = document.querySelector('.error.cadastro')

    let inpNome = document.getElementById('inpNome').value
    let inpEmail = document.getElementById('inpEmail').value
    let inpSenha = document.getElementById('inpSenha').value
    let inpData = document.getElementById('inpData').value
    let inpCep = document.getElementById('inpCep').value

    if (inpNome.length == 0 || inpEmail.length == 0 || inpSenha.length == 0 || inpData.length == 0) {
        erroC.style.color = "red"
        erroC.innerHTML = "Campo Vazio"
    } else {
        let date = new Date(inpData);
        let newDate = date.toISOString()

        let dados = {
            nome: inpNome.trim(),
            email: inpEmail.trim(),
            senha: inpSenha.trim(),
            nascimento: newDate.trim(),
            cep: inpCep.trim()
        }

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        };

        fetch('http://localhost:3000/criarUsuario', options)
            .then(response => {
                if (response.status == 201) {
                    erroC.style.color = '#00f63e'
                    erroC.innerHTML = "Cadastrado com sucesso"
                }
                console.log(response)
                return response.json()
            })
            .then(res => {
                if (res.erro === "Email já existente") {
                    erroC.style.color = "red"
                    erroC.innerHTML = "Email ja Cadastrado"
                }
                console.log(res)
            })
    }
}

function loginUsuario() {

    let erroL = document.querySelector('.error.login')


    let inpEmail = document.querySelector('.inpEmail').value
    let inpSenha = document.querySelector('.inpSenha').value

    let dados = {
        email: inpEmail.trim(),
        senha: inpSenha.trim()
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    };

    if (inpEmail.length == 0 || inpSenha == 0) {
        erroL.style.color = "red"
        erroL.innerHTML = "Campo Vazio"
    } else {
        fetch('http://localhost:3000/login', options)
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(res => {
                console.log(res)
                if (res.menssagem === 'usuario não encontrado') {
                    erroL.style.color = "red"
                    erroL.innerHTML = res.menssagem
                }
                if (res.menssagem === 'senha incorreta') {
                    erroL.style.color = "red"
                    erroL.innerHTML = res.menssagem
                }
                if (res.menssagem === 'Seu login foi bem-sucedido') {
                    erroL.style.color = "#00f63e"
                    erroL.innerHTML = 'Seja bem-vindo!'
                    setTimeout(function () {
                        window.location.href = './teste.html'
                    }, 3000);

                }
            })
    }


}

// function validarEmail(email) {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(email);
// }


// const email = "exemplo@dominio.com";
// if (validarEmail(email)) {
//     console.log("O email é válido.");
// } else {
//     console.log("O email é inválido.");
// }


estilizarBotoes()