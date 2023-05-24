import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'

export default function principal({ navigation }) {
    const [encontros, setEncontros] = useState([])

    useEffect(() => {
        fetch('http://10.87.207.7:3000/listarEncontros')
            .then(res => { return res.json() })
            .then(data => { setEncontros(data) })
    })

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnCadastroPartida} onPress={() => {
                navigation.navigate("NewLocalPartida")
            }}>
                <Text style={styles.textBtnAdd}>+</Text>
            </TouchableOpacity>
            <ScrollView>
                <View>
                    {
                        encontros.map((e, index) => {
                            return (
                                <View key={index} style={styles.infos}>
                                    <Text style={styles.texto}>{e.titulo} </Text>
                                    <Text style={styles.texto}>Descricao: {e.descricao} </Text>
                                    <Text style={styles.texto}>Local: {e.local.nome} </Text>
                                    <Text style={styles.texto}>Endereço: {e.local.endereco} </Text>
                                    <Text style={styles.texto}>Data: {e.dataHora} </Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#012340',
        alignItems: 'center',
    },
    infos: {
        height: '200px',
        width: '350px',
        backgroundColor: '#a6dced',
        marginTop: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #00f63e'
    },
    texto: {
        fontSize: '20px',
    },
    btnCadastroPartida: {
        height: '40px',
        width: '40px',
        backgroundColor: '#0caba8',
        marginTop: '20px',
        marginBottom: '10px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '25px'
    },
    textBtnAdd: {
        color: '#fff',
        fontSize: '20px',
    }
})