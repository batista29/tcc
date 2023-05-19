import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Picker } from 'react-native'

export default function NewPartida() {

    //pegar ano
    const startYear = 1901;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const years = [];

    for (let year = startYear; year <= currentYear; year++) {
        years.push(year.toString());
    }

    const [selectedYear, setSelectedYear] = useState('1901');

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

    const [descricao, setDescricao] = useState([])
    const [dataHora, setDataHora] = useState('2023-01-01T22:00:00Z')
    const [titulo, setTitulo] = useState([])

    // console.log(locais)

    useEffect(() => {
        fetch('http://10.87.207.35:3000/listarLocais')
            .then(res => { return res.json() })
            .then(data => {
                data.map((e, index) => {
                    setLocais(e)
                })
            })
    })

    let dados = {
        descricao: descricao,
        dataHora: dataHora,
        titulo: titulo,
        id_local: 1
    }

    const cadastrarEncontro = () => {
        fetch("http://10.87.207.35:3000/criarEncontro/1", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        }
        )
            .then(res => {
                return res.json()
            })
            .then(data => { console.log(data) })
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <TextInput style={styles.inputs} placeholder='Titulo do encontro'
                    value={titulo}
                    onChangeText={(value) => {
                        setTitulo(value)
                    }}>
                </TextInput>
                <TextInput style={styles.inputs} placeholder='Descrição do encontro'
                    value={descricao}
                    onChangeText={(value) => {
                        setDescricao(value)
                    }}>
                </TextInput>
                <Text style={styles.textDate}>Selecione o dia</Text>
                <Picker style={styles.selecionarData}
                    selectedValue={selectedDay}
                    onValueChange={handleDayChange}
                >
                    {days.map((day) => (
                        <Picker.Item key={day} label={day} value={day} />
                    ))}
                </Picker>

                <Text style={styles.textDate}>Selecione o mês</Text>

                <Picker style={styles.selecionarData}
                    selectedValue={selectedMonth}
                    onValueChange={handleMonthChange}
                >
                    {months.map((month) => (
                        <Picker.Item key={month} label={month} value={month} />
                    ))}
                </Picker>

                <Text style={styles.textDate}>Selecione o ano</Text>

                <Picker style={styles.selecionarData}
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
        backgroundColor: '#008F8C',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        height: '330px',
        width: '330px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid white',
        backgroundColor: '#012340'
    },
    inputs: {
        color: 'white',
        border: '1px solid white',
        marginTop: '30px',
        height: '30px',
        width: '200px'
    },
    btnCadastrar: {
        width: '150px',
        height: '30px',
        border: '1px solid #0FC2C0',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '15px',
        marginTop: '30px'
    },
    textBtnCadastrar: {
        color: 'white'
    }
})