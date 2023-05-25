import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Picker } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewPartida() {

    const [perfil, setPerfil] = useState([]);
    const [lida, setLida] = useState([]);

    const [encontro, setEncontro] = useState([]);

    const getData = async () => {
        try {
            let id = await AsyncStorage.getItem("idLogin");
            setLida(id)
        } catch (err) {
            console.log(err);
        }
    }

    if (lida.length == 0) getData();

    useEffect(() => {
        fetch(`http://10.87.207.7:3000/perfil/${lida}`)
            .then(res => { return res.json() })
            .then(data => {
                setPerfil(data)
            })
    })


    setTimeout(() => {
        let data = perfil.participante || []

        let ids = []

        data.forEach(e => {

            ids.push(e.encontro.id)

        });

        setEncontro(ids)
    }, 100)

    console.log(encontro)


    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#012340',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        height: '400px',
        width: '330px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid white',
        backgroundColor: '#008F8C'
    },
    texto: {
        fontSize: '20px',
        color: 'white'
    },
})