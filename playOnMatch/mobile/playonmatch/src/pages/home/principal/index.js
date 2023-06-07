import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Main({ navigation }) {
    const [encontros, setEncontros] = useState([])
    const [lida, setLida] = useState([]);
    const [token, setToken] = useState([]);

    const getData = async () => {
        try {
            let id = await AsyncStorage.getItem("idLogin");
            setLida(id)
        } catch (err) {
            console.log(err);
        }
    }

    if (lida.length == 0) getData();

    const getToken = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            setToken(token)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetch('http://10.87.207.7:3000/listarEncontros')
            .then(res => { return res.json() })
            .then(data => { setEncontros(data) })
    })

    if (token.length == 0) getToken();

    const verificarParticipacao = (encontroId) => {
        const encontro = encontros.find((encontro) => encontro.id === encontroId);

        if (encontro) {
            const criador = encontro.EncontroUsuario.find((participante) => participante.idCriador.id == lida);

            const participante = encontro.EncontroUsuario.find((participante) => participante.idParticipante && participante.idParticipante.id == lida && participante.idCriador.id != lida);

            if (criador) {
                return (
                    <View>
                        <TouchableOpacity onPress={() => { encerrarPartida(encontroId) }}>
                            <Text style={styles.textoBtnCancelar}>Encerrar Partida</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { attPartida(encontro.id, encontro.descricao, encontro.dataHora, encontro.titulo, encontro.id_local) }}>
                            <Text style={styles.textoBtnAttPartida}>Atualizar Partida</Text>
                        </TouchableOpacity>
                    </View>
                )

            } else if (participante) {
                return <TouchableOpacity onPress={() => { removerParticipante(encontroId) }}>
                    <Text style={styles.textoBtnCancelar}>Cancelar participação</Text>
                </TouchableOpacity>
            } else {
                return <TouchableOpacity onPress={() => { addParticipante(encontroId) }}>
                    <Text style={styles.textoBtnParticipar}>Participar</Text>
                </TouchableOpacity>
            }
        }
        return null;
    };

    const addParticipante = (idPartida) => {
        const options1 = { method: 'POST' };

        fetch(`http://10.87.207.7:3000/adicionarParticipante/${idPartida}/${lida}`, options1)
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
            .catch(err => console.error(err));
    }

    const removerParticipante = (idPartida) => {
        const options2 = { method: 'DELETE' };

        fetch(`http://10.87.207.7:3000/excluirParticipante/${idPartida}/${lida}`, options2)
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
            .catch(err => console.error(err));
    }

    const encerrarPartida = (idPartida) => {

        const options3 = {
            method: 'PUT',
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        };

        fetch(`http://10.87.207.7:3000/finalizarEncontro/${lida}/${idPartida}`, options3)
            .then(response => response.json())
            .then(response => {
                window.location.reload()
            })
            .catch(err => console.error(err));
    }

    const attPartida = (id, descricao, dataHora, titulo, id_local) => {

        let data = {
            id: id,
            descricao: descricao,
            dataHora: dataHora,
            titulo: titulo,
            id_local: id_local
        }

        AsyncStorage.setItem("infosAttPartida", JSON.stringify(data))

        navigation.navigate('attEvento')
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
                            if (e.dataFim == null) {
                                return (
                                    <View>
                                        {
                                            <View style={styles.infos} key={e.id}>
                                                <Text style={styles.texto}>{e.titulo} </Text>
                                                <Text style={styles.texto}>Descricao: {e.descricao} </Text>
                                                <Text style={styles.texto}>Local: {e.local.nome} </Text>
                                                <Text style={styles.texto}>Endereço: {e.local.rua} </Text>
                                                <Text style={styles.texto}>Data: {e.dataHora} </Text>
                                                {verificarParticipacao(e.id)}
                                            </View>
                                        }
                                    </View>
                                )
                            }
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
        color: 'white',
        marginTop: '10px',
        backgroundColor: '#1A1E26',
        border: '1px solid white',
        borderRadius: '5px',
        width: '140px',
        height: '25px',
        textAlign: 'center'
    },
    textoBtnCancelar: {
        color: 'white',
        marginTop: '10px',
        backgroundColor: '#1A1E26',
        border: '1px solid white',
        borderRadius: '5px',
        width: '140px',
        height: '25px',
        textAlign: 'center'
    },
    textoBtnAttPartida: {
        color: 'white',
        marginTop: '10px',
        backgroundColor: '#1A1E26',
        border: '1px solid white',
        borderRadius: '5px',
        width: '140px',
        height: '25px',
        textAlign: 'center'
    }
})