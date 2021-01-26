import React,{ useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet, Linking, Alert, SafeAreaView, RefreshControl, FlatList, Picker } from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Text, Fab, Icon, Button, Form, Textarea, Item, Input, Label } from 'native-base'
import WavyHeader from '../components/WavyHeader';
import colors from '../colors'
import { getMacAddress } from 'react-native-device-info';
import moment from 'moment'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { listContacts } from '../api';

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
        marginTop: 80
    },
    observationLabel: {
        fontSize: 17,
        marginTop: 15,
        textAlign: 'center'
    },
    observationLabelLink: {
        fontSize: 17,
        marginTop: 15,
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
    },
    textPlace: {
        width: '100%',
        fontSize: 18
    }
});

export default function Contacts({ navigation }) {

    const [contactsData, setContactsData] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        getData()
    }, [])

    const onRefresh = React.useCallback(() => {
        getData()
    }, []);

    async function getData() {
        setRefreshing(true);
        const data = await listContacts()
        try{
            data['-MRxuFd1z37RymKKm3PL'].forEach((contact, i) => {
                contact.key = i+""
            });
            setContactsData(data['-MRxuFd1z37RymKKm3PL'])
        }catch(e){}
        setRefreshing(false);
    }

    return (
        <View style={styles.container}>
            <WavyHeader customStyles={styles.svgCurve} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Contatos</Text>
            </View>
            <Text style={styles.descriptionLabel}>Contatos pra ajudar na entrega da sua ajuda</Text>
            <SafeAreaView style={styles.list}>
                <FlatList
                style={{marginBottom: 150}}
                    data={contactsData}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem={({ item }) =>
                        <Card>
                            <CardItem style={styles.cardItem}>
                                    <Body style={styles.cardBody}>
                                        <Text style={styles.textPlace}>
                                            {item.place}
                                        </Text>
                                        <Text style={styles.textDescription}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.textDescription}>
                                            {item.contact}
                                        </Text>
                                    </Body>
                                </CardItem>
                        </Card>
                    }
                />
            </SafeAreaView>
        </View>
    )
}
