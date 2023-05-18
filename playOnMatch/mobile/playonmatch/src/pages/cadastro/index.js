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

  const [selectedYear, setSelectedYear] = useState('');

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  //pegar dia
  const startDay = 1;
  const days = [];

  for (let day = startDay; day <= 31; day++) {
    days.push(day.toString());
  }

  const [selectedDay, setSelectedDay] = useState('');

  const handleDayChange = (value) => {
    setSelectedDay(value);
  };

  //pegar mês
  const startMonth = 1;
  const months = [];

  for (let month = startMonth; month <= 12; month++) {
    months.push(month.toString());
  }

  const [selectedMonth, setSelectedMonth] = useState('');

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
  console.log(dataEnviar)

  const [nome, setNome] = useState('teste3');
  const [email, setEmail] = useState('teste3@gmail.com');
  const [senha, setSenha] = useState('123');

  let dados = {
    nome: nome,
    email: email,
    senha: senha,
    nascimento: dataEnviar,
  }
  console.log(dados)

  const cadastrarPessoa = () => {
    fetch("http://10.87.207.35:3000/criarUsuario", {
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
      <View style={styles.inpInfos}>
        <Text>Infos</Text>
      </View>
      <View style={styles.pickerData}>

        <Picker style={styles.selecionarData}
          selectedValue={selectedDay}
          onValueChange={handleDayChange}
        >
          {days.map((day) => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>

        <Picker style={styles.selecionarData}
          selectedValue={selectedMonth}
          onValueChange={handleMonthChange}
        >
          {months.map((month) => (
            <Picker.Item key={month} label={month} value={month} />
          ))}
        </Picker>

        <Picker style={styles.selecionarData}
          selectedValue={selectedYear}
          onValueChange={handleYearChange}
        >
          {years.map((year) => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>

        <TouchableOpacity onPress={() => {
          cadastrarPessoa()
        }}>
          <Text>Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default YearPicker;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#008F8C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selecionarData: {
    width: '200px',
    height: '35px',
    marginTop: '10px'
  },
  pickerData: {
    flex: 1
  },
  inpInfos: {
    flex: 2
  }
})