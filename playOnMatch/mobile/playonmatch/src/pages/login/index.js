import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity } from "react-native";
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {

  const [email, setEmail] = useState('doly@gmail.com')
  const [senha, setSenha] = useState('doly')

  let dados = {
    email: email,
    senha: senha
  }

  const userLogin = () => {
    if (dados.email.length == 0 || dados.senha.length == 0) {
      alert("Senha ou email em branco")
    } else {
      fetch("http://192.168.0.3:3000/login", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      }
      )
        .then(res => {
          return res.json()
        })
        .then(data => {
          if (data.mensagem == 'Senha incorreta') {
            alert('Senha incorreta')
          } else if (data.mensagem == 'Seu login foi bem-sucedido') {
            let id = Number(data.usuario.id)
            let token = data.usuario.token
            AsyncStorage.setItem('idLogin', id)
            AsyncStorage.setItem('token', token)
            navigation.navigate("Main")
          } else if (data.mensagem == 'Usuário não encontrado') {
            alert('Usuário não encontrado')
          } else {
            alert("Erro ao efetuar login")
            window.location.reload()
          }
        })
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.texto1}>LOGIN</Text>
        <Text style={styles.texto}>Digite o seu e-mail</Text>
        <TextInput
          style={styles.inputs}
          value={email}
          onChangeText={(value) => {
            setEmail(value)
          }}
        ></TextInput>
        <Text style={styles.texto}>Digite a sua senha</Text>
        <TextInput secureTextEntry={true}
          style={styles.inputs}
          value={senha}
          onChangeText={(value) => {
            setSenha(value)
          }}
        ></TextInput>
        <TouchableOpacity
          style={styles.botaoEntrar}
          onPress={() => {
            userLogin()
          }}
        >
          <Text style={styles.textoBtn}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#1A1E26',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#283040',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 350,
    border: '2px solid #B9B4D9'
  },
  inputs: {
    backgroundColor: '#fff',
    border: '1px solid #B9B4D9',
    width: 200,
    height: 25,
    marginBottom: 20
  },
  texto: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 30
  },
  texto1: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'sans-serif',
    marginBottom: 20
  },
  textoBtn: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'sans-serif',
  },
  botaoEntrar: {
    height: 30,
    width: 200,
    marginTop: 10,
    alignItems: 'center',
    border: '1px solid #B9B4D9',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#1A1E26'
  }
});