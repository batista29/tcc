import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Picker } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function attEvento({ navigation }) {

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

    //pegar a hora
    const startHour = 0;
    const hours = [];

    for (let hour = startHour; hour <= 23; hour++) {
        hours.push(hour.toString());
    }

    const [selectedHour, setSelectedHour] = useState('00');

    const handleHourChange = (value) => {
        setSelectedHour(value);
    };

    //pegar os minutos
    const startMinute = 0;
    const minutes = [];

    for (let minute = startMinute; minute <= 59; minute++) {
        minutes.push(minute.toString());
    }

    const [selectedMinute, setSelectedMinute] = useState('00');

    const handleMinuteChange = (value) => {
        setSelectedMinute(value);
    };


    if (selectedDay.length < 2) {
        var diaFormatado = "0" + selectedDay
    } else {
        var diaFormatado = selectedDay
    }

    if (selectedMonth.length < 2) {
        var mesFormatado = "0" + selectedMonth
    } else {
        var mesFormatado = selectedMonth
    }

    if (selectedHour.length < 2) {
        var horaFormatada = "T0" + selectedHour
    } else {
        var horaFormatada = "T" + selectedHour
    }

    if (selectedMinute.length < 2) {
        var minutoFormatada = ":0" + selectedMinute + ':00Z'
    } else {
        var minutoFormatada = ":" + selectedMinute + ':00Z'
    }

    var dataEnviar = `${selectedYear}-${mesFormatado}-${diaFormatado}${horaFormatada}${minutoFormatada}`

    const [locais, setLocais] = useState([])
    const [selectedLocal, setSelectedLocal] = useState('1')

    const handleLocalChange = (value) => {
        setSelectedLocal(value);
    };

    const [descricao, setDescricao] = useState("")
    const [titulo, setTitulo] = useState("")
    const [infosPartida, setInfosPartida] = useState([]);

    const getInfosAttPartida = async () => {
        try {
            let infosAttPartida = await AsyncStorage.getItem("infosAttPartida");
            setInfosPartida(JSON.parse(infosAttPartida))
        } catch (err) {
            console.log(err);
        }
    }

    if (infosPartida.length == 0) getInfosAttPartida();

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

    if (dados.descricao.length == 0) {
        dados.descricao = infosPartida.descricao
    }
    if (dados.dataHora.length == 0) {
        dados.dataHora = infosPartida.dataHora
    }
    if (dados.titulo.length == 0) {
        dados.titulo = infosPartida.titulo
    }

    const [token, setToken] = useState([]);

    const getToken = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            setToken(token)
        } catch (err) {
            console.log(err);
        }
    }

    if (token.length == 0) getToken();

    console.log(infosPartida.id)
    const attEncontro = () => {
        fetch(`http://10.87.207.7:3000/editarEncontro/${lida}/${infosPartida.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: token
            },
            body: JSON.stringify(dados)
        }
        )
            .then(res => {
                console.log(res)
            })
            .then(data => { console.log(data) })
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

                <Text style={styles.textDate}>Selecione o horário</Text>
                <Text style={styles.textDate}>Hora:</Text>
                <Picker style={styles.selecionar}
                    selectedValue={selectedHour}
                    onValueChange={handleHourChange}
                >
                    {hours.map((hours) => (
                        <Picker.Item key={hours} label={hours} value={hours} />
                    ))}
                </Picker>

                <Text style={styles.textDate}>Minuto</Text>
                <Picker style={styles.selecionar}
                    selectedValue={selectedMinute}
                    onValueChange={handleMinuteChange}
                >
                    {minutes.map((minute) => (
                        <Picker.Item key={minute} label={minute} value={minute} />
                    ))}
                </Picker>


                <TouchableOpacity style={styles.btnCadastrar} onPress={() => {
                    attEncontro()
                }}>
                    <Text style={styles.textBtnCadastrar}>Atualizar</Text>
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
        height: '700px',
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
        marginTop: '15px',
        color: 'black'
    },
    textBtnCadastrar: {
        color: 'black'
    },
    selecionar: {
        width: '220px',
        height: '35px',
        marginBottom: '5px',
        marginTop: '5px',
        border: '2px solid #1A1E26',
    },
    textDate: {
        color: 'white',
        marginTop: '15px',
        fontSize: '15px'
    }
})