import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity } from "react-native";
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [cep, setCep] = useState('')

  let dados = {
    email: email,
    senha: senha
  }

  const userLogin = () => {
    fetch("", {
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
        console.log(data)
        if (data.mensagem == 'Senha incorreta') {
          alert('Senha incorreta')
        } else if (data.mensagem == 'Seu login foi bem-sucedido') {
          navigation.navigate("Home")
        }else if(data.mensagem == 'Usuário não encontrado'){
          alert('Usuário não encontrado')
        }
      })
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
        <TextInput
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
          <Text style={styles.texto}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#272f33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#0f0f3a',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 350,
    border:'2px solid #00f63e'
  },
  inputs: {
    backgroundColor: '#fff',
    border: '1px solid black',
    width: 200,
    marginBottom: 20
  },
  texto: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 20,
    marginBottom: 5
  },
  texto1: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'sans-serif',
    marginBottom: 20
  },
  botaoEntrar: {
    height: 25,
    width: 200,
    alignItems: 'center',
    border: '1px solid white',
    marginTop: 10
  }
});