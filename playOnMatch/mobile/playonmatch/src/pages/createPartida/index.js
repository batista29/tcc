import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'

export default function NewPartida() {

    const [locais, setLocais] = useState([])

    console.log(locais)

    useEffect(() => {
        fetch('http://10.87.207.35:3000/listarLocais')
            .then(res => { return res.json() })
            .then(data => {
                data.map((e, index) => {
                    setLocais(e)
                })
            })
    })

    return (
        <View style={styles.container}>
            <Text>oi</Text>
            <TextInput style={styles.inputs} placeholder='Titulo do encontro'></TextInput>
            <TextInput style={styles.inputs} placeholder='Descrição do encontro'></TextInput>
            <TextInput style={styles.inputs} placeholder='Data e Hora do encontro'></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#012340',
        alignItems: 'center',
    },
    inputs: {
        color: 'white',
        border: '1px solid white',
        marginTop: '2vh'
    }
})