import React, { useState, useEffect } from 'react';
import { Picker, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';

const YearPicker = () => {
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

  const [nome, setNome] = useState('teste3');
  const [email, setEmail] = useState('teste3@gmail.com');
  const [senha, setSenha] = useState('123');

  let dados = {
    nome: nome,
    email: email,
    senha: senha,
    nascimento: dataEnviar,
  }

  const cadastrarPessoa = () => {
    if (dados.nome.length == 0 || dados.email.length == 0 || dados.senha.length == 0 || dados.nascimento.length < 19) {
      alert('Algum campo vazio')
    } else {
      fetch("http://10.87.207.7:3000/criarUsuario", {
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
        .then(data => {
          console.log(data)
          if (data.erro == 'Email já existente') {
            alert('Esse e-mail já existente')
          } else if (data.mensagem == "OK") {
            alert("Usuario criado")
            window.location.reload()
          } else {
            alert("Erro ao criar")
            window.location.reload()
          }
        })
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

          <TextInput secureTextEntry={true} style={styles.inputs} placeholder='Insira a sua senha'
            value={senha}
            onChangeText={(value) => {
              setSenha(value)
            }}>
          </TextInput>
        </View>

        <View style={styles.divSelect}>

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
            cadastrarPessoa()
          }}>
            <Text style={styles.textBtnCriar}>Criar</Text>
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
    backgroundColor: '#012340',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerData: {
    height: '650px',
    width: '350px',
    backgroundColor: '#008F8C',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid white'
  },
  selecionarData: {
    width: '220px',
    height: '40px',
    marginBottom: '40px',
  },
  btnCriar: {
    border: '1px solid white',
    width: '220px',
    height: '45px',
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