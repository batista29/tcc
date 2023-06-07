const btnC = document.querySelector(".btn-login-entrar");

btnC.addEventListener("click", function (event) {
    event.preventDefault();
});

const btnL = document.querySelector(".btn-cadastro-cadastrar");

btnL.addEventListener("click", function (event) {
    event.preventDefault();
});

function estilizarBotoes() {
    let btnLogin = document.querySelector('.btn-login')
    let btnCadastro = document.querySelector('.btn-cadastro')

    let formularioCadastro = document.querySelector('.formulario-cadastro')
    let formularioLogin = document.querySelector('.formulario-login')


    btnLogin.addEventListener('click', function () {

        formularioCadastro.style.display = "none"
        formularioLogin.style.display = ""

        btnLogin.style.color = '#5D75A6'
        btnLogin.style.opacity = '200';
        btnLogin.style.filter = 'none';

        btnCadastro.style.color = 'white';
        btnCadastro.style.opacity = 0.3;
    })

    btnCadastro.addEventListener('click', function () {

        formularioCadastro.style.display = "flex"
        formularioLogin.style.display = "none"

        btnCadastro.style.color = '#5D75A6'
        btnCadastro.style.opacity = '200';
        btnCadastro.style.filter = 'none';


        btnLogin.style.color = 'white';
        btnLogin.style.opacity = 0.3;
    })
}

function cadastrarUsuario() {

    let erroC = document.querySelector('.error-cadastro')

    let inpNome = document.getElementById('nome').value
    let inpEmail = document.getElementById('email').value
    let inpSenha = document.getElementById('senha').value
    let inpData = document.getElementById('data').value

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
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        if (inpData.split('-')[0] <= 2020 && inpData.split('-')[0] >= 1903) {
            fetch('http://localhost:3000/criarUsuario', options)
                .then(response => {
                    if (response.status == 201) {
                        erroC.style.color = '#00f63e'
                        erroC.innerHTML = "Cadastrado com sucesso"
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)
                    }

                    return response.json()
                })
                .then(res => {
                    if (res.erro === "Email já existente") {
                        erroC.style.color = "red"
                        erroC.innerHTML = "Email ja Cadastrado"
                    }
                })
        } else {
            erroC.innerHTML = 'data inválida'
            erroC.style.color = "red"
        }
    }
}

function loginUsuario() {

    let erroL = document.querySelector('.error-login')


    let inpEmail = document.querySelector('.inpEmail').value
    let inpSenha = document.querySelector('.inpSenha').value

    let dados = {
        email: inpEmail.trim(),
        senha: inpSenha.trim()
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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
                console.log(res.mensagem)
                if (res.mensagem === 'Usuário não encontrado') {
                    erroL.style.color = "red"
                    erroL.innerHTML = res.mensagem
                }
                if (res.mensagem === 'Senha incorreta') {
                    erroL.style.color = "red"
                    erroL.innerHTML = res.mensagem
                }
                if (res.mensagem === 'Seu login foi bem-sucedido') {
                    erroL.style.color = "#00f63e"
                    erroL.innerHTML = 'Seja bem-vindo!'
                    localStorage.setItem("usuario", JSON.stringify({ 'id': res.usuario.id, 'token': res.usuario.token }))
                    setTimeout(function () {
                        window.location.href = '../principal/index.html'
                    }, 700);
                }
            })
    }
}

let slideIndex = 0;

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("img-carrosel");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 4000);
}
estilizarBotoes()
showSlides()