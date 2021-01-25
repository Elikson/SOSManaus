import { useEffect, useState } from 'react'
import * as React from 'react'
import {
    View,
    FlatList,
    StyleSheet,
    ScrollView,
    RefreshControl,
    SafeAreaView,
    Dimensions,
    Pressable,
    Alert
} from 'react-native'
import { listEvents } from '../api'
import { Container, Header, Content, Card, CardItem, Body, Text, Fab, Icon, Button } from 'native-base'
import { Circle } from 'react-native-svg'
import WavyHeader from '../components/WavyHeader';
import colors from '../colors'
import { getMacAddress } from 'react-native-device-info';
import moment from 'moment'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16
    },
    list: {
        flex: 1,
        paddingHorizontal: 15
    },
    descriptionLabel: {
        paddingTop: 45,
        paddingBottom: 10,
        paddingHorizontal: 20
    },
    headerContainer: {
        paddingHorizontal: 30,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        top: -110
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'left',
        marginTop: 5
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        borderColor: 'black',
        borderStyle: 'solid',
        borderBottomWidth: 1
    },
    aboutButton: {
        backgroundColor: colors.primary,
        borderRadius: 30

    },
    cardBody: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textPlace: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    textDate: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    textDatePast: {
        fontSize: 13,
        fontWeight: 'bold',
        textDecorationLine: 'line-through'
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
    cardItem: {
        display: 'flex',
        flexDirection: 'column'
    }
});

export default function List({ navigation }) {

    const [refreshing, setRefreshing] = React.useState(false);
    const [eventsData, setEventsData] = React.useState([]);

    function createTwoButtonAlert(event){
        console.log("pressed")
        Alert.alert(
            event.place+" - "+moment(event.date).format('DD/MM HH:mm'),
            "Descrição: "+event.description+"\n\n"
            +"Organizador: "+event.name+"\n\n"
            +"Contato: "+event.contact+"\n\n"
            +"PIX/Colaboração: "+event.donate+"\n"
            +"(verifique a veracidade do evento antes de fazer sua doação)",
            [
                { text: "OK", onPress: () => {} }
            ],
            { cancelable: false }
        );
    }
        

    const onRefresh = React.useCallback(() => {
        getData()
    }, []);

    async function getData() {
        setRefreshing(true);
        const data = await listEvents()
        var keys = Object.keys(data)
        var dataFiltered = []
        keys.forEach(key => {
            data[key].key = key
            dataFiltered.push(data[key])
        });
        dataFiltered.sort(function(eventA,eventB){
            return moment(eventA.date).format('YYYYMMDDHHmm') ? -1 : moment(eventB.date).format('YYYYMMDDHHmm') ? 1 : 0;
        });
        setEventsData(dataFiltered)
        setRefreshing(false);
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <View style={styles.container}>
            <WavyHeader customStyles={styles.svgCurve} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>SOS Manaus</Text>
                <Pressable android_ripple={{ color: colors.third, radius: 17 }}
                    onPress={() => navigation.navigate('About')}
                    iconLeft style={styles.aboutButton} rounded>
                    <Icon style={{ fontSize: 35, color: colors.third }} name='alert-circle-outline' />
                </Pressable>
            </View>
            <Text style={styles.descriptionLabel}>Últimos eventos</Text>
            <SafeAreaView style={styles.list}>
                <FlatList
                    data={eventsData}
                    renderItem={({ item }) =>
                        <Card>
                            <Pressable android_ripple={{ color: colors.third }} 
                            onPress={() => createTwoButtonAlert(item)}>
                                <CardItem style={styles.cardItem}>
                                    <Body style={styles.cardBody}>
                                        <Text style={styles.textPlace}>
                                            {item.place}
                                        </Text>
                                        {
                                            moment(item.date).format('YYYYMMDDHHmm') > moment().format('YYYYMMDDHHmm') ?
                                            <Text style={styles.textDate}>
                                                {moment(item.date).format('DD/MM HH:mm')}
                                            </Text>
                                            :
                                            <Text style={styles.textDatePast}>
                                                {moment(item.date).format('DD/MM HH:mm')}
                                            </Text>
                                        }
                                    </Body>
                                    <Body style={styles.cardBody}>
                                        <Text style={styles.textDescription}>
                                            DESCRIÇÃO: {item.description}
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Pressable>
                        </Card>
                    }
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            </SafeAreaView>
            <Fab
                style={{ backgroundColor: colors.primary }}
                position="bottomRight"
                onPress={() => navigation.navigate('Register')}>
                <Icon name="add" />
            </Fab>
        </View>
    )
}
