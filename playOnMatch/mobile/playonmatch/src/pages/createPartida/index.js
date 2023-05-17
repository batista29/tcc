import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'

export default function NewPartida() {

    const [locais, setLocais] = useState([])

    const [descricao, setDescricao] = useState([])
    const [dataHora, setDataHora] = useState('2023-01-01T22:00:00Z')
    const [titulo, setTitulo] = useState([])

    // console.log(locais)

    useEffect(() => {
        fetch('http://10.87.207.35:3000/listarLocais')
            .then(res => { return res.json() })
            .then(data => {
                data.map((e, index) => {
                    setLocais(e)
                })
            })
    })

    let dados = {
        descricao: descricao,
        dataHora: dataHora,
        titulo: titulo,
        id_local: 1
    }

    const cadastrarEncontro = () => {
        fetch("http://10.87.207.35:3000/criarEncontro/1", {
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
            .then(data => { console.log(data) })
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <TextInput style={styles.inputs} placeholder='Titulo do encontro'
                    value={titulo}
                    onChangeText={(value) => {
                        setTitulo(value)
                    }}>
                </TextInput>
                <TextInput style={styles.inputs} placeholder='Descrição do encontro'
                    value={descricao}
                    onChangeText={(value) => {
                        setDescricao(value)
                    }}>
                </TextInput>
                <TextInput style={styles.inputs} placeholder='Data e Hora do encontro'
                    value={dataHora}
                    onChangeText={(value) => {
                        setDataHora(value)
                    }}>
                </TextInput>
                <TouchableOpacity style={styles.btnCadastrar} onPress={() => {
                    cadastrarEncontro()
                }}>
                    <Text style={styles.textBtnCadastrar}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#008F8C',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        height: '330px',
        width: '330px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid white',
        backgroundColor: '#012340'
    },
    inputs: {
        color: 'white',
        border: '1px solid white',
        marginTop: '30px',
        height: '30px',
        width: '200px'
    },
    btnCadastrar: {
        width: '150px',
        height: '30px',
        border: '1px solid #0FC2C0',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '15px',
        marginTop: '30px'
    },
    textBtnCadastrar: {
        color: 'white'
    }
})