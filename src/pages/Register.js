import React,{ useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet, KeyboardAvoidingView, Alert, TouchableWithoutFeedback, Keyboard, ScrollView, Picker } from 'react-native'
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
    list: {
        flex: 1,
        paddingHorizontal: 15
    },
    descriptionLabel: {
        paddingHorizontal: 5,
        marginTop: 75
    },
    observationLabel: {
        fontSize: 11,
        paddingBottom: 10,
        paddingHorizontal: 5,
        paddingBottom: 10,
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
    },
    aboutButton: {
        backgroundColor: colors.primary,
        borderRadius: 30

    },
    textDescription: {
        fontSize: 12,
        marginTop: 10,
        fontWeight: 'normal'
    },
    textDescriptionTitle: {
        fontSize: 12,
        marginTop: 10,
        fontWeight: '700'
    },
    itemInput: {
        width: '100%',
        height: 68,
        marginTop: 15
    },
    itemInputTextArea: {
        width: '99%',
        height: 107,
        marginTop: 15
    },
    dateInput: {
        width: '50%',
        height: 68,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    labelInput: {
        fontSize: 12
    },
    inner: {
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        height: 100,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
      },
    btnContainer: {
    backgroundColor: "white",
    marginTop: 12
    },
    saveButtom: {
        alignSelf: 'flex-end',
        marginTop: 15,
        backgroundColor: colors.primary
    },
    buttonPicker: {
        marginTop: 10,
    },
    inputLabel: {
        fontWeight: 'bold'
    }
});

export default function Register({ navigation }) {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const [datePicked, setDate] = useState('00/00/0000');
    const [timePicked, setTime] = useState('00:00');
    const [placeSelected, setPlace] = useState('HOSP. JOÃO LÚCIO');
    const [contact, setContact] = useState('');
    const [otherPlace, setOtherPlace] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [donate, setDonate] = useState('');
    const [macAdress, setMacAdress] = useState('');
 
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
        setDate(moment(date).format('DD/MM/YYYY'))
        hideDatePicker();
    };

    const handleConfirmTime = (date) => {
        setTime(moment(date).format('HH:mm'))
        hideTimePicker();
    };

    const selectPlace = (place) => {
        setPlace(place)
    };

    async function handleMacAdress(){
        const adress = await getMacAddress()
        setMacAdress(adress)
    };

    function createInfoAlert(title, message){
        Alert.alert(
            title,
            message,
            [
                { text: "Ok", onPress: () => {} }
            ],
            { cancelable: false }
        );
    }

    useEffect(() => {
        handleMacAdress()
    }, [])

    async function registerData() {
        if(datePicked === '00/00/0000'){
            createInfoAlert('Preencha todos os dados', 'O campo data está vazio ☹️')
        }else if(timePicked === '00:00'){
            createInfoAlert('Preencha todos os dados', 'O campo hora está vazio ☹️')
        }else if(placeSelected === 'OUTRO' && (otherPlace.length === 0 || otherPlace === ' ')){
            createInfoAlert('Preencha todos os dados', 'O campo outro local está vazio ☹️')
        }else if(name.length === 0 || name === ' '){
            createInfoAlert('Preencha todos os dados', 'O campo nome está vazio ☹️')
        }else if(contact.length === 0 || contact === ' '){
            createInfoAlert('Preencha todos os dados', 'O campo contato está vazio ☹️')
        }else if(description.length === 0 || description === ' '){
            createInfoAlert('Preencha todos os dados', 'O campo descrição está vazio ☹️')
        }else{
            console.log(datePicked)
            console.log(timePicked)
            console.log(moment(datePicked,'DD/MM/YYYY').format('DD-MM-YYYY'))
            console.log(moment(timePicked,'HH:mm').format('HH:mm:ss'))
            const body = {
                "active": true,
                "contact": contact,
                "date": moment(datePicked,'DD/MM/YYYY').format('YYYY-MM-DD')+" "+moment(timePicked,'HH:mm').format('HH:mm:ss'),
                "description": description,
                "donate": donate,
                "macAdress": macAdress,
                "name": name,
                "place": placeSelected === 'OUTRO' ? otherPlace : placeSelected
            }
            const data = await registerEvent(body)
            console.log("register ",data)
            if(data.name !== undefined && data.name !== null ){
                createInfoAlert('Salvo', 'Evento salvo com sucesso!')
                setDate('00/00/0000')
                setTime('00:00')
                setPlace('HOSP. JOÃO LÚCIO')
                setOtherPlace('')
                setName('')
                setContact('')
                setDescription('')
                setDonate('')
            }else{
                createInfoAlert('Erro', 'Não foi possível salvar seu evento ☹️')
            }
            
        }
        
    }

    return (
        <View style={styles.container}>
            <WavyHeader customStyles={styles.svgCurve} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Cadastrar evento</Text>
            </View>
            <KeyboardAvoidingView style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        <Text style={styles.descriptionLabel}>Por favor, não cadastre dados falsos.</Text>
                        <Text style={styles.observationLabel}>* Obrigatório.</Text>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Item onPress={showDatePicker} style={styles.dateInput} stackedLabel>
                            <Label style={styles.inputLabel}>* Data</Label>
                                <Text style={{marginTop: 25}}>{datePicked}</Text>
                            </Item>
                            <Item onPress={showTimePicker} style={styles.dateInput} stackedLabel>
                                <Label style={styles.inputLabel}>* Hora</Label>
                                <Text style={{marginTop: 25}}>{timePicked}</Text>
                            </Item>
                        </View>
                        
                        <Item style={styles.itemInput} stackedLabel>
                            <Label style={styles.inputLabel}>* Local do evento</Label>
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: '100%' }}
                                selectedValue={placeSelected}
                                onValueChange={selectPlace}
                                >
                                    <Picker.Item label="HOSP. JOÃO LÚCIO" value="HOSP. JOÃO LÚCIO" />
                                    <Picker.Item label="SPA DA GALILEIA" value="SPA DA GALILEIA" />
                                    <Picker.Item label="SPA ZONA SUL" value="SPA ZONA SUL" />
                                    <Picker.Item label="SPA COROADO" value="SPA COROADO" />
                                    <Picker.Item label="GETULIO VARGAS" value="GETULIO VARGAS" />
                                    <Picker.Item label="28 DE AGOSTO" value="28 DE AGOSTO" />
                                    <Picker.Item label="PLATAO ARAUJO" value="PLATAO ARAUJO" />
                                    <Picker.Item label="FUNDACAO CECON" value="FUNDACAO CECON" />
                                    <Picker.Item label="SPA ALVORADA" value="SPA ALVORADA" />
                                    <Picker.Item label="UPA CAMPOS SALES" value="UPA CAMPOS SALES" />
                                    <Picker.Item label="HOSP GERALDO ROCHA" value="HOSP GERALDO ROCHA" />
                                    <Picker.Item label="CHAPOT PREVOST" value="CHAPOT PREVOST" />
                                    <Picker.Item label="UBS MORRO DA LIBERDADE" value="UBS MORRO DA LIBERDADE" />
                                    <Picker.Item label="MATERNIDADE ALVORADA" value="MATERNIDADE ALVORADA" />
                                    <Picker.Item label="MATERNIDADE NAZIRA DAOU" value="MATERNIDADE NAZIRA DAOU" />
                                    <Picker.Item label="MATERNIDADE AZILDA MARREIRO" value="MATERNIDADE AZILDA MARREIRO" />
                                    <Picker.Item label="MATERNIDADE MOURA TAPAJÓS" value="MATERNIDADE MOURA TAPAJÓS" />
                                    <Picker.Item label="OUTRO" value="OUTRO" />
                                </Picker>
                        </Item>
                        {
                            placeSelected === "OUTRO" ? 
                            <Item style={styles.itemInput} stackedLabel>
                                <Label style={styles.inputLabel}>* Outro local</Label>
                                <Input value={otherPlace} onChangeText={value => setOtherPlace(value)} />
                            </Item>
                            :
                            null                        
                        }
                        
                        <Item style={styles.itemInput} stackedLabel>
                        <Label style={styles.inputLabel}>* Seu nome</Label>
                            <Input onChangeText={value => setName(value)} value={name} />
                        </Item>
                        <Item style={styles.itemInput} stackedLabel>
                            <Label style={styles.inputLabel}>* Seu contato</Label>
                            <Input onChangeText={value => setContact(value)} value={contact} />
                        </Item>
                        <Item style={styles.itemInputTextArea} stackedLabel>
                            <Label style={styles.inputLabel}>* Descrição da ação</Label>
                            <Textarea onChangeText={value => setDescription(value)} value={description} style={{width: '100%'}} rowSpan={3} bordered/>
                        </Item>
                        <Item style={styles.itemInput} stackedLabel>
                            <Label style={styles.inputLabel}>PIX / Link doação (sujeito à aprovação)</Label>
                            <Input onChangeText={value => setDonate(value)} value={donate} />
                        </Item>
                        <Button onPress={() => registerData()} style={styles.saveButtom}>
                            <Text>Salvar</Text>
                        </Button>
                    </ScrollView>
                    
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
            />
      </View>
    )
}
