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

            ids.push(e.encontro)

        });

        setEncontro(ids)
    }, 100)

    let date = new Date(perfil.nascimento);
    let dataNascimentoFormatada = date.toLocaleDateString("pt-BR", {
        timeZone: "UTC",
    });

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View>
                    <Text>{perfil.nome}</Text>
                    <Text>{perfil.email}</Text>
                    <Text>{dataNascimentoFormatada}</Text>
                </View>
            </View>
            <View style={styles.second}>
                <ScrollView>
                    <View>
                        {
                            encontro.map((e, index) => {

                                let date = new Date(e.dataHora);
                                let dataFormatada = date.toLocaleDateString("pt-BR", {
                                    timeZone: "UTC",
                                });
                                let horas = e.dataHora.split('T')[1].split('.')[0].split(':')
                                let horasFormatada = horas[0] + ':' + horas[1]

                                return (
                                    <View key={index} style={styles.infos}>
                                        <Text style={styles.texto}>Local: {e.local.nome}</Text>
                                        <Text style={styles.texto}>Cidade: {e.local.cidade} - {e.local.pais}</Text>
                                        <Text style={styles.texto}>Data e hora: {dataFormatada} - {horasFormatada}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#012340',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    main: {
        height: '100px',
        width: '200px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid white',
        backgroundColor: '#008F8C'
    },
    texto: {
        fontSize: '17px',
        color: 'white'
    },
    infos: {
        height: '150px',
        width: '300px',
        backgroundColor: '#a6dced',
        marginTop: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #00f63e',
        marginBottom: '20px'
    },
    second: {
        height: '470px',
        width: '350px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #ffffff'
    }
})