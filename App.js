import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableWithoutFeedback,
  keyboard,
  Keyboard, 
  Alert
} from 'react-native';
import Clima from './components/Clima';
import Formulario from './components/Formulario';


const App = () => {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const [consultar, guardarConsultar] = useState(false)
  const [resultado, guardarResultado] = useState({})
  const [bgcolor, guardarBgcolor] = useState('rgb(71, 149, 212)')

  const {ciudad, pais} = busqueda;


  useEffect(() => {
    const consultarClima = async () => {
      if(consultar) {
        //console.log('Consultando Api...')
        const api = 'd3967b1637f65142b95672ef157d9a91'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${api}`
  
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();

          guardarResultado(resultado)
          guardarConsultar(false)

          //Modifica los colores de fondo basado en la temperatura

          const kelvin = 273.15;
          const {main} = resultado
          const actual = main.temp - kelvin;

          if(actual < 10) {
            guardarBgcolor('rgb(105, 108, 149)')
          } else if ( actual >= 10 && actual < 25) {
            guardarBgcolor('rgb(71, 149, 212)')
          } else {
            guardarBgcolor('rgb(178, 28, 61)')
          }

        } catch (error) {
          mostrarAlerta()
        }
      }
    }
    consultarClima()
  },[consultar])

  const mostrarAlerta = () => {
    Alert.alert(
        'Error',
        'No hay resultados, intenta con otra ciudad o país',
        [{ text: 'OK'}]
    )

}


  const ocultarTeclado = () => {
    Keyboard.dismiss();
  }

  const bgColorApp = {
    backgroundColor: bgcolor
  }
  
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => ocultarTeclado()}
      >
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima 
              resultado={resultado}
            />
            <Formulario 
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
            />

          </View>
        </View>
      </TouchableWithoutFeedback>
    
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
