import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Picker } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewPartida() {

    const [perfil, setPerfil] = useState([]);
    const [lida, setLida] = useState([]);

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
                console.log(data)
                setPerfil(data)
            })
    })

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View>
                    <Text style={styles.texto}>{perfil.nome}</Text>
                    <Text style={styles.texto}>{perfil.email}</Text>
                    <Text style={styles.texto}>{perfil.nascimento}</Text>
                </View>
                <View>
                    <ScrollView>
                        <View></View>
                    </ScrollView>
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