import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { FontAwesome5 } from '@expo/vector-icons';

export default class AppointmentBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.statusbar}>
                    <TextInput
                        style={styles.statInput}
                        placeholder="Type here to search"
                        type='clear'
                        placeholderTextColor="#D3D4DA"
                        returnKeyType="next"
                    />
                    <FontAwesome5 name="search" size={24} color='#000000' style={{ alignItems: "flex-end", justifyContent: 'flex-end', marginRight: hp('2%') }} />
                </View>
                <View style={{ marginTop: hp('3%'), justifyContent: 'center', alignItems: 'center', marginBottom: hp('7%'), }}>
                    <Image source={require('../../../assets/image/Layer51.png')} style={{ width: wp('90%'), height: hp('40%'), }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: hp('-5%') }}>
                    <Text style={{ fontSize: hp('3%'), }}>Body Massage</Text>
                    <Text style={{ fontSize: hp('3%'), }}>₹ 79 </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('2%'), }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                    <View>
                        <Text style={{ width: wp('25%'), textAlign: 'center', fontSize: hp('3%'), color: '#FEBC42' }}>Details</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={styles.book} onPress={() => { this.props.navigation.navigate('AppointmentsBooked') }}>
                        <FontAwesome5 name="check-circle" size={24} color='#FFFFFF' style={{ margin: hp('1%'), }} />
                        <Text style={{ fontSize: hp('3%'), color: '#FFFFFF' }}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    statusbar: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: hp('5%'),
        width: wp('90%'),
        height: hp('6.5%'),
        marginLeft: hp('2.5%'),
        alignItems: "center",
        justifyContent: 'center'

    },
    statInput: {
        fontSize: hp('2.5%'),
        flex: 1,
        padding: hp('2%'),
        alignItems: "center",
    },
    book: {
        flexDirection: 'row',
        backgroundColor: "#FEBC42",
        marginTop: hp('15%'),
        width: wp('60%'),
        height: hp('6.5%'),
        alignItems: "center",
        justifyContent: 'center'
    }
})


