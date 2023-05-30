import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Main({ navigation }) {
    const [encontros, setEncontros] = useState([])
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
        fetch('http://10.87.207.7:3000/listarEncontros')
            .then(res => { return res.json() })
            .then(data => { setEncontros(data) })
    })

    const addParticipante = (idPartida) => {
        const options = { method: 'POST' };

        fetch(`http://10.87.207.7:3000/adicionarParticipante/${idPartida}/${lida}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
            .catch(err => console.error(err));
    }

    const removerParticipante = (idPartida) => {
        const options = { method: 'DELETE' };

        fetch(`http://10.87.207.7:3000/excluirParticipante/${idPartida}/${lida}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
            .catch(err => console.error(err));
    }

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
                                <View>
                                    {
                                        e.EncontroUsuario.map((i) => {
                                            console.log(i.idCriador.id)
                                            if (i.idCriador.id == lida) {
                                                return (
                                                    <View key={index} style={styles.infos}>
                                                        <Text style={styles.texto}>{e.titulo} </Text>
                                                        <Text style={styles.texto}>Descricao: {e.descricao} </Text>
                                                        <Text style={styles.texto}>Local: {e.local.nome} </Text>
                                                        <Text style={styles.texto}>Endereço: {e.local.endereco} </Text>
                                                        <Text style={styles.texto}>Data: {e.dataHora} </Text>
                                                        <View style={styles.botoes}>
                                                            <TouchableOpacity onPress={() => { addParticipante(e.id) }}>
                                                                <Text style={styles.textoBtnParticipar}>encerrar</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                            if (i.idParticipante.id == lida) {
                                                return (
                                                    <View key={index} style={styles.infos}>
                                                        <Text style={styles.texto}>{e.titulo} </Text>
                                                        <Text style={styles.texto}>Descricao: {e.descricao} </Text>
                                                        <Text style={styles.texto}>Local: {e.local.nome} </Text>
                                                        <Text style={styles.texto}>Endereço: {e.local.endereco} </Text>
                                                        <Text style={styles.texto}>Data: {e.dataHora} </Text>
                                                        <View style={styles.botoes}>
                                                            <TouchableOpacity onPress={() => { removerParticipante(e.id) }}>
                                                                <Text style={styles.textoBtnCancelar}>Cancelar</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )
                                            } if (i.idParticipante.id !== lida) {
                                                return (
                                                    <View key={index} style={styles.infos}>
                                                        <Text style={styles.texto}>{e.titulo} </Text>
                                                        <Text style={styles.texto}>Descricao: {e.descricao} </Text>
                                                        <Text style={styles.texto}>Local: {e.local.nome} </Text>
                                                        <Text style={styles.texto}>Endereço: {e.local.endereco} </Text>
                                                        <Text style={styles.texto}>Data: {e.dataHora} </Text>
                                                        <View style={styles.botoes}>
                                                            <TouchableOpacity onPress={() => { addParticipante(e.id) }}>
                                                                <Text style={styles.textoBtnParticipar}>addParticipante</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                        })
                                    }
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
        backgroundColor: '#1A1E26',
        alignItems: 'center',
    },
    infos: {
        height: '250px',
        width: '350px',
        backgroundColor: '#283040',
        marginTop: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid #B9B4D9',
        marginBottom: '20px'
    },
    texto: {
        fontSize: '20px',
        color: 'white'
    },
    btnCadastroPartida: {
        height: '40px',
        width: '40px',
        backgroundColor: '#405173',
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
    },
    botoes: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '2vh',
        width: '100%',
        justifyContent: 'space-around'
    },
    textoBtnParticipar: {
        color: '#7CFC00'
    },
    textoBtnCancelar: {
        color: '#FF4E00'
    }
})