import React, { useState, useEffect } from 'react';
import { Picker, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const YearPicker = ({ navigation }) => {
    //pegar ano
    const startYear = 1901;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const years = [];

    for (let year = startYear; year <= currentYear; year++) {
        years.push(year.toString());
    }

    const [selectedYear, setSelectedYear] = useState([]);

    const handleYearChange = (value) => {
        setSelectedYear(value);
    };

    //pegar dia
    const startDay = 1;
    const days = [];

    for (let day = startDay; day <= 31; day++) {
        days.push(day.toString());
    }

    const [selectedDay, setSelectedDay] = useState([]);

    const handleDayChange = (value) => {
        setSelectedDay(value);
    };

    //pegar mês
    const startMonth = 1;
    const months = [];

    for (let month = startMonth; month <= 12; month++) {
        months.push(month.toString());
    }

    const [selectedMonth, setSelectedMonth] = useState([]);

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

    const [lida, setLida] = useState([]);
    const [token, setToken] = useState([]);
    const [infosLogin, setInfosLogin] = useState([]);

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

    if (token.length == 0) getToken();

    const getInfosLogin = async () => {
        try {
            let infosLogin = await AsyncStorage.getItem("infosLogin");
            setInfosLogin(JSON.parse(infosLogin))
        } catch (err) {
            console.log(err);
        }
    }

    if (infosLogin.length == 0) getInfosLogin();

    const [nome, setNome] = useState([]);
    const [email, setEmail] = useState([]);
    const [senha, setSenha] = useState([]);

    let dados = {
        nome: nome,
        email: email,
        nascimento: dataEnviar,
    }

    if (dados.nome.length == 0) {
        dados.nome = infosLogin.nome
    }

    if (dados.email.length == 0) {
        dados.email = infosLogin.email
    }

    if (dados.nascimento.length < 19) {
        dados.nascimento = infosLogin.nascimento
    }

    const editarPerfil = () => {
        if (dados.nome.length == 0 || dados.email.length == 0 || dados.nascimento.length < 19) {
            alert('Algum campo vazio')
        } else {
            const options = {
                method: 'PUT',
                headers: {
                    authorization: token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            };

            fetch(`http://localhost:3000/atualizarUsuario/${lida}?=`, options)
                .then(response => {
                    if (response.status == 200) {
                        navigation.navigate("Perfil")
                    }
                })
                .then(response => console.log(response))
                .catch(err => console.error(err));
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.pickerData}>
                <View style={styles.divInputs}>
                    <TextInput style={styles.inputs} placeholder='Insira o seu nome'
                        value={nome}
                        onChangeText={(value) => {
                            setNome(value)
                        }}>
                    </TextInput>

                    <TextInput style={styles.inputs} placeholder='Insira o seu email'
                        value={email}
                        onChangeText={(value) => {
                            setEmail(value)
                        }}>
                    </TextInput>
                </View>

                <View style={styles.divSelect}>
                    <Text style={styles.textDate}>Data de nascimento:</Text>
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

                    <TouchableOpacity style={styles.btnCriar} onPress={() => {
                        editarPerfil()
                    }}>
                        <Text style={styles.textBtnCriar}>Atualizar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default YearPicker;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1A1E26',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerData: {
        height: '670px',
        width: '350px',
        backgroundColor: '#283040',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #B9B4D9'
    },
    selecionarData: {
        width: '220px',
        height: '40px',
        marginBottom: '40px',
    },
    btnCriar: {
        border: '1px solid white',
        width: '220px',
        height: '40px',
        backgroundColor: '#012340',
        justifyContent: 'center',
        textAlign: 'center'
    },
    textBtnCriar: {
        color: 'white',
        fontSize: '20px'
    },
    divInputs: {
        marginBottom: '25px'
    },
    inputs: {
        width: '220px',
        height: '40px',
        marginBottom: '10px',
        border: '1px solid black',
        marginTop: '20px',
        backgroundColor: 'white',
        color: 'black',
    },
    textDate: {
        fontSize: '20px',
        color: 'white',
    }
})