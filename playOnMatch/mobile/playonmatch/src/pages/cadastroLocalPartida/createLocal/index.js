import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

export default function NewPartida({ navigation }) {

    const [nome, setNome] = useState("")
    const [rua, setRua] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [pais, setPais] = useState("")

    let dados = {
        nome: nome,
        rua: rua,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        pais: pais
    }

    const cadastrarLocal = () => {
        if (dados.nome.length == 0 || dados.rua.length == 0 || dados.bairro.length == 0 || dados.cidade.length == 0 || dados.estado.length == 0 || dados.pais.length == 0) {
            alert("Algum campo vazio")
        } else {
            fetch(`http://10.87.207.7:3000/criarLocal`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            }
            )
                .then(res => {
                    console.log(res)
                    if (res.status == 201) {
                        alert("Sucesso")
                        navigation.navigate("NewPartida")
                    } else {
                        alert("Erro")
                    }
                })
                .then(data => { console.log(data) })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.texto}>Digite o nome do local</Text>
                <TextInput style={styles.input}
                    value={nome} onChangeText={(value) => {
                        setNome(value)
                    }}
                    placeholder='Nome...'>
                </TextInput>
                <Text style={styles.texto}>Digite o nome da rua</Text>
                <TextInput style={styles.input}
                    value={rua} onChangeText={(value) => {
                        setRua(value)
                    }}
                    placeholder='Rua...'>

                </TextInput>
                <Text style={styles.texto}>Digite o nome do bairro</Text>
                <TextInput style={styles.input}
                    value={bairro} onChangeText={(value) => {
                        setBairro(value)
                    }}
                    placeholder='Bairro...'>

                </TextInput>
                <Text style={styles.texto}>Digite o nome da cidade</Text>
                <TextInput style={styles.input}
                    value={cidade} onChangeText={(value) => {
                        setCidade(value)
                    }}
                    placeholder='Cidade...'>

                </TextInput>
                <Text style={styles.texto}>Digite o nome do estado</Text>
                <TextInput style={styles.input}
                    value={estado} onChangeText={(value) => {
                        setEstado(value)
                    }}
                    placeholder='Estado...'>

                </TextInput>
                <Text style={styles.texto}>Digite o nome do País</Text>
                <TextInput style={styles.input}
                    value={pais} onChangeText={(value) => {
                        setPais(value)
                    }}
                    placeholder='País...'>

                </TextInput>
                <TouchableOpacity style={styles.btnCriar} onPress={() => {
                    cadastrarLocal()
                }}>
                    <Text style={styles.textoBtn}>Criar Local</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1A1E26',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        height: '630px',
        width: '330px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #B9B4D9',
        backgroundColor: '#405173'
    },
    texto: {
        color: 'white',
        fontSize: '15px',
        marginTop: '15px',
        marginBottom: '5px'
    },
    textoBtn: {
        color: 'black',
        fontSize: '15px',
    },
    input: {
        marginBottom: '10px',
        border: '2px solid #1A1E26',
        height: '35px',
        width: '200px',
        backgroundColor: 'white'
    },
    btnCriar: {
        height: '30px',
        width: '200px',
        border: '2px solid #1A1E26',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: '20px',
        backgroundColor: 'white'
    }
})