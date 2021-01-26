import React,{ useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet, Linking, Alert, TouchableWithoutFeedback, Keyboard, ScrollView, Picker } from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Text, Fab, Icon, Button, Form, Textarea, Item, Input, Label } from 'native-base'
import WavyHeader from '../components/WavyHeader';
import colors from '../colors'
import { getMacAddress } from 'react-native-device-info';
import moment from 'moment'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { registerEvent } from '../api';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingHorizontal: 20,
    },
    descriptionLabel: {
        fontSize: 17,
        paddingHorizontal: 5,
        marginTop: 95,
        textAlign: 'justify'
    },
    observationLabel: {
        fontSize: 17,
        marginTop: 15,
        textAlign: 'center'
    },
    observationLabelContact: {
        fontSize: 17,
        marginTop: 15,
        textAlign: 'center'
    },
    observationLabelLink: {
        fontSize: 17,
        textAlign: 'center',
        color: colors.primary,
        marginBottom: 40
    },
    headerContainer: {
        paddingHorizontal: 30,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        top: -110,
        zIndex: 10
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'left',
        marginTop: 5,
        position: 'absolute',
        zIndex: 11
    }
});

export default function About({ navigation }) {
    return (
        <View style={styles.container}>
            <WavyHeader customStyles={styles.svgCurve} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Sobre</Text>
            </View>
            <View style={{justifyContent: 'space-between', display: 'flex', flex: 1}}>
                <View>
                    <Text style={styles.descriptionLabel}>
                        Esse aplicativo foi desenvolvido de forma voluntária para ajudar na organização das ações de ajuda que estão sendo realizadas às famílias e aos profissionais de saúde nos hospitais de Manaus. O principal intuito é permitir que caso esteja interessado em realizar alguma ação saiba quais já estão realizadas no local em determinado dia.
                    </Text>
                    <Text style={styles.observationLabel}>
                        Versão 1.0.0
                    </Text>
                </View>

                <View>
                    <Text style={styles.observationLabel}>
                        Desenvolvidores: Elikson e Adilson.
                    </Text>
                    <Text style={styles.observationLabelContact}>
                        contato@elikson.com.br
                    </Text>
                    <Text onPress={() => Linking.openURL('http://elikson.com.br')} style={styles.observationLabelLink}>
                        http://elikson.com.br
                    </Text>
                </View>
                
            </View>
        </View>
    )
}
