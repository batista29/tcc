import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity } from "react-native";
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro({ navigation }) {

  const [nome, setNome] = useState([])
  const [email, setEmail] = useState([])
  const [senha, setSenha] = useState([])
  const [nascimento, setNascimento] = useState('2023-01-01T22:00:00.000Z')

  let dados = {
    nome: nome,
    email: email,
    senha: senha,
    nascimento: nascimento
  }

  console.log(dados)

  const createUser = () => {
    fetch("http://10.87.207.35:3000/criarUsuario", {
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
      .then(response => { console.log(response) })
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.texto1}>CADASTRE-SE</Text>
        <Text style={styles.texto}>Digite o seu nome</Text>
        <TextInput
          style={styles.inputs}
          value={nome}
          onChangeText={(value) => {
            setNome(value)
          }}
        ></TextInput>
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
        <Text style={styles.texto}>Digite a sua nascimento</Text>
        <TextInput
          style={styles.inputs}
          value={nascimento}
          onChangeText={(value) => {
            setNascimento(value)
          }}
        ></TextInput>
        <TouchableOpacity
          style={styles.botaoEntrar}
          onPress={() => {
            createUser()
          }}
        >
          <Text style={styles.texto}>CRIAR</Text>
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
    height: 500,
    width: 350,
    border: '2px solid #00f63e'
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