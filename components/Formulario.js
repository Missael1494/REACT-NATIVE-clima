import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    Alert,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Animated
  } from 'react-native';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

    const {pais, ciudad} = busqueda;

    const [animacionboton, setanimacionboton] = useState(new Animated.Value(1))

    const consultarClima = () => {
        if(pais.trim() === '' || ciudad.trim() === '')  {
            mostrarAlerta();
            return;
        }

        // consultar la api
        guardarConsultar(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y país para la busqueda',
            [{ text: 'Entendido'}]
        )

    }

    const animacionEntrada = () => {
        Animated.spring( animacionboton, {
            toValue: .9
        }).start();
    }

    const animacionSalida = () => {
        Animated.spring( animacionboton, {
            toValue: 1, 
            friction: 4,
            tension: 30
        }).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionboton}]
    }

  return (
    <>
        <View style={StyleSheet.formulario}>
            <View>
                <TextInput 
                    value={ciudad}
                    onChangeText={ ciudad => guardarBusqueda({
                        ...busqueda,
                        ciudad
                    })}
                    style={styles.input}
                    placeholder="Ciudad"
                    placeholderTextColor="#666"
                />
            </View>
            <View>
                <Picker
                    selectedValue={pais}
                    style={styles.picker}
                    itemStyle={{ height: 120, backgroundColor: '#FFF'}}
                    onValueChange={
                        pais => guardarBusqueda({
                            ...busqueda, 
                            pais
                        })
                    }
                >
                    <Picker.Item label='-- Seleccione un país --' value="" />
                    <Picker.Item label='Estados unidos' value="US" />
                    <Picker.Item label='México' value="MX" />
                    <Picker.Item label='Argentina' value="AR" />
                    <Picker.Item label='Colombia' value="CO" />
                    <Picker.Item label='Costa Rica' value="CR" />
                    <Picker.Item label='España' value="ES" />
                    <Picker.Item label='Perú' value="PE" />


                </Picker>
            </View>
            <TouchableWithoutFeedback
                onPressIn={() => animacionEntrada()}
                onPressOut={() => animacionSalida()}
                onPress={() => consultarClima()}
            >
                <Animated.View style={[styles.btnBuscar, estiloAnimacion]} >
                    <Text style={[styles.textoBuscar]} >Buscar Clima</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    picker: {
        height: 60, 
        backgroundColor: '#FFF'
    },
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center',
    },
    textoBuscar: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18,
    }

})

export default Formulario