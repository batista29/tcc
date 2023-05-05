import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'

export default function principal() {
    const [encontros, setEncontros] = useState([])

    useEffect(() => {
        fetch('http://10.87.207.35:3000/listarEncontros')
            .then(res => { return res.json() })
            .then(data => { setEncontros(data) })
    })

    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    encontros.map((e, index) => {
                        console.log(e)
                        return (
                            <View key={index} style={styles.infos}>
                                <Text style={styles.texto}>{e.titulo} </Text>
                                <Text style={styles.texto}>Descricao: {e.descricao} </Text>
                                <Text style={styles.texto}>Local: {e.local.nome} </Text>
                                <Text style={styles.texto}>Endereço: {e.local.endereco} </Text>
                                <Text style={styles.texto}>Data: {e.data} </Text>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#012340',
        alignItems: 'center',
    },
    infos:{
        height:'200px',
        width:'350px',
        backgroundColor:'#a6dced',
        marginTop:'20px',
        alignItems: 'center',
        justifyContent:'center',
        border:'2px solid #00f63e'
    },
    texto:{
        fontSize:'20px',
    }
})