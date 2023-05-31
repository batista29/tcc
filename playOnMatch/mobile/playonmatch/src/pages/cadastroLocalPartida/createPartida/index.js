import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Picker } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewPartida({ navigation }) {

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

    //pegar ano=
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const nextYear = currentYear + 1;
    const years = [];

    for (let year = currentYear; year <= nextYear; year++) {
        years.push(year.toString());
    }

    const [selectedYear, setSelectedYear] = useState(currentYear);

    const handleYearChange = (value) => {
        setSelectedYear(value);
    };

    //pegar dia
    const startDay = 1;
    const days = [];

    for (let day = startDay; day <= 31; day++) {
        days.push(day.toString());
    }

    const [selectedDay, setSelectedDay] = useState('01');

    const handleDayChange = (value) => {
        setSelectedDay(value);
    };

    //pegar mês
    const startMonth = 1;
    const months = [];

    for (let month = startMonth; month <= 12; month++) {
        months.push(month.toString());
    }

    const [selectedMonth, setSelectedMonth] = useState('01');

    const handleMonthChange = (value) => {
        setSelectedMonth(value);
    };

    if (selectedDay.length < 2) {
        var diaFormatado = "0" + selectedDay + 'T00:00:00Z'
    } else {
        var diaFormatado = selectedDay + 'T00:00:00Z'
    }

    if (selectedMonth.length < 2) {
        var mesFormatado = "0" + selectedMonth
    } else {
        var mesFormatado = selectedMonth
    }

    var dataEnviar = `${selectedYear}-${mesFormatado}-${diaFormatado}`

    const [locais, setLocais] = useState([])
    const [selectedLocal, setSelectedLocal] = useState([])

    const handleLocalChange = (value) => {
        setSelectedLocal(value);
    };

    const [descricao, setDescricao] = useState("")
    const [titulo, setTitulo] = useState("")

    useEffect(() => {
        fetch('http://10.87.207.7:3000/listarLocais')
            .then(res => { return res.json() })
            .then(data => {
                setLocais(data)
            })
    })

    let dados = {
        descricao: descricao,
        dataHora: dataEnviar,
        titulo: titulo,
        id_local: Number(selectedLocal)
    }

    const cadastrarEncontro = () => {
        if (dados.descricao.length == 0 || dados.dataHora.length == 0 || dados.titulo.length == 0 || dados.id_local.length == 0 || "") {
            alert("Algum campo vazio")
        } else {
            fetch(`http://10.87.207.7:3000/criarEncontro/${lida}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            }
            )
                .then(res => {
                    if (res.status == 201) {
                        alert("Sucesso")
                        navigation.navigate("Main")
                    } else {
                        alert("Erro")
                    }
                })
                .then(data => { console.log(data) })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.textDate}>Titulo do encontro</Text>
                <TextInput style={styles.inputs} placeholder='Titulo do encontro'
                    value={titulo}
                    onChangeText={(value) => {
                        setTitulo(value)
                    }}>
                </TextInput>
                <Text style={styles.textDate}>Descrição do encontro</Text>
                <TextInput style={styles.inputs} placeholder='Descrição do encontro'
                    value={descricao}
                    onChangeText={(value) => {
                        setDescricao(value)
                    }}>
                </TextInput>

                <Text style={styles.textDate}>Selecione o Local</Text>
                <Picker style={styles.selecionar}
                    selectedValue={selectedLocal}
                    onValueChange={handleLocalChange}
                >
                    {locais.map((dados) => (
                        < Picker.Item key={dados.id} label={dados.nome} value={dados.id} />
                    ))}
                </Picker>

                <Text style={styles.textDate}>Selecione o dia</Text>
                <Picker style={styles.selecionar}
                    selectedValue={selectedDay}
                    onValueChange={handleDayChange}
                >
                    {days.map((day) => (
                        <Picker.Item key={day} label={day} value={day} />
                    ))}
                </Picker>

                <Text style={styles.textDate}>Selecione o mês</Text>

                <Picker style={styles.selecionar}
                    selectedValue={selectedMonth}
                    onValueChange={handleMonthChange}
                >
                    {months.map((month) => (
                        <Picker.Item key={month} label={month} value={month} />
                    ))}
                </Picker>

                <Text style={styles.textDate}>Selecione o ano</Text>

                <Picker style={styles.selecionar}
                    selectedValue={selectedYear}
                    onValueChange={handleYearChange}
                >
                    {years.map((year) => (
                        <Picker.Item key={year} label={year} value={year} />
                    ))}
                </Picker>


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
        backgroundColor: '#1A1E26',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        height: '650px',
        width: '330px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #B9B4D9',
        backgroundColor: '#405173'
    },
    inputs: {
        color: 'black',
        border: '2px solid #1A1E26',
        marginTop: '10px',
        width: '220px',
        height: '35px',
        marginBottom: '20px',
        backgroundColor: 'white'
    },
    btnCadastrar: {
        width: '200px',
        height: '35px',
        border: '2px solid #1A1E26',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '30px',
        color: 'black'
    },
    textBtnCadastrar: {
        color: 'black'
    },
    selecionar: {
        width: '220px',
        height: '35px',
        marginBottom: '20px',
        marginTop: '5px',
        border: '2px solid #1A1E26',
    },
    textDate: {
        color: 'white',
        marginTop: '10px',
        fontSize: '15px'
    }
})