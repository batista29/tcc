import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Picker } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil({ navigation }) {

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
                AsyncStorage.setItem("infosLogin", JSON.stringify(data))
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
    }, 500)

    let date = new Date(perfil.nascimento);
    let dataNascimentoFormatada = date.toLocaleDateString("pt-BR", {
        timeZone: "UTC",
    });

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View>
                    <Text style={styles.textoPerfil}>{perfil.nome}</Text>
                    <Text style={styles.textoPerfil}>{perfil.email}</Text>
                    <Text style={styles.textoPerfil}>{dataNascimentoFormatada}</Text>
                    <TouchableOpacity style={styles.btnAttPerfil}>
                        <Text style={styles.textAttPerfil} onPress={() => {
                            navigation.navigate("attPerfil")
                        }}>
                            Atualizar perfil</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.second}>
                <ScrollView>
                    <View style={styles.secondInfo}>
                        <Text style={styles.textoInfo}>Histórico</Text>
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
                                        <Text style={styles.textoInfo}>Local: {e.local.nome}</Text>
                                        <Text style={styles.textoInfo}>Cidade: {e.local.cidade} - {e.local.pais}</Text>
                                        <Text style={styles.textoInfo}>Data e hora: {dataFormatada} - {horasFormatada}</Text>
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
        backgroundColor: '#1A1E26',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    main: {
        height: '140px',
        width: '200px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #B9B4D9',
        backgroundColor: '#405173'
    },
    secondInfo: {
        alignItems: 'center',
    },
    textoInfo: {
        fontSize: '20px',
        color: 'white'
    },
    textoPerfil: {
        fontSize: '20px',
        color: 'white'
    },
    infos: {
        height: '150px',
        width: '320px',
        backgroundColor: '#1A1E26',
        marginTop: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #B9B4D9',
        marginBottom: '20px'
    },
    second: {
        height: '470px',
        width: '350px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #B9B4D9',
        backgroundColor: '#405173'
    },
    btnAttPerfil: {

    },
    textAttPerfil: {
        fontSize: '15px',
        color: '#ffbf00',
    }
})