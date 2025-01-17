import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Platform, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BookService } from '../../Services/BookService/BookService'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import Loader from '../../Components/Loader/Loading';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class AppointmentsBooked extends Component {
    constructor(props) {
        super(props);
        this.serviceDetails = this.props.route.params.serviceDetails;
        this.state = {
            userID: null,
            memberID: null,
            userData: null,
            fullname: null,
            fullnameError: null,
            username: null,
            usernameError: null,
            mobilenumber: null,
            mobilenumberError: null,
            serviceDate: null,
            serviceDateError: null,
            serviceTime: null,
            serviceTimeError: null,
            isDatePickerVisible: false,
            isTimePickerVisibility: false,
            loading: false,
        }
        this.setFullName = this.setFullName.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.setMobileNumber = this.setMobileNumber.bind(this);
        this.setServiceDate = this.setServiceDate.bind(this);
        this.setServiceTime = this.setServiceTime.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();
        this.TeardTextInputRef = React.createRef();
        this.FourthTextInputRef = React.createRef();
        this.FiftethTextInputRef = React.createRef();
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleConfirmDate = (date) => {
        this.setState({ serviceDate: moment(date).format('YYYY-MM-DD') });
        this.hideDatePicker();
    };

    showTimePicker = () => {
        this.setState({ isTimePickerVisibility: true });
    };

    hideTimePicker = () => {
        this.setState({ isTimePickerVisibility: false });
    };

    handleConfirmTime = (time) => {
        this.setState({ serviceTime: moment(time).format('HH:mm') });
        this.hideTimePicker();
    };

    componentDidMount() {
        this.getdata()
    }

    setFullName(fullname) {
        if (!fullname || fullname.length <= 0) {
            return this.setState({ fullnameError: 'User Name cannot be empty', fullname: fullname });
        }
        return this.setState({ fullname: fullname, fullnameError: null })
    }

    setUserName(email) {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            return this.setState({ usernameError: 'Email cannot be empty', username: email });
        }
        if (!re.test(email)) {
            return this.setState({ usernameError: 'Ooops! We need a valid email address' });
        }
        return this.setState({ username: email, usernameError: null })
    }

    setMobileNumber(mobilenumber) {
        const reg = /^[0]?[789]\d{9}$/;
        if (!mobilenumber || mobilenumber.length <= 0) {
            return this.setState({ mobilenumberError: 'Mobile Number cannot be empty', mobilenumber: mobilenumber });
        }
        if (!reg.test(mobilenumber)) {
            return this.setState({ mobilenumberError: 'Ooops! We need a valid Mobile Number' });
        }
        return this.setState({ mobilenumber: mobilenumber, mobilenumberError: null })
    }

    setServiceDate(serviceDate) {
        if (!serviceDate || serviceDate.length <= 0) {
            return this.setState({ serviceDateError: 'service Date cannot be empty', serviceDate: serviceDate });
        }
        return this.setState({ serviceDate: serviceDate, serviceDateError: null })
    }

    setServiceTime(serviceTime) {
        if (!serviceTime || serviceTime.length <= 0) {
            return this.setState({ serviceTimeError: 'Service Time cannot be empty', serviceTime: serviceTime });
        }
        return this.setState({ serviceTime: serviceTime, serviceTimeError: null })
    }

    resetScreen() {
        this.setState({
            fullname: null,
            fullnameError: null,
            username: null,
            usernameError: null,
            mobilenumber: null,
            mobilenumberError: null,
            serviceDate: null,
            serviceDateError: null,
            serviceTime: null,
            serviceTimeError: null,
        })
    }

    getdata = async () => {
        var getUser = await AsyncStorage.getItem('@authuser')
        if (getUser == null || getUser && getUser.length == 0) {
            setTimeout(() => {
                this.props.navigation.replace('LoginScreen')
            }, 3000);
        } else {
            const user = JSON.parse(getUser)
            this.setState({
                fullname: user.property.fullname,
                username: user.property.primaryemail,
                mobilenumber: user.property.mobile,
                userID: user.addedby,
                memberID: user._id
            })
        }

    }

    onPressSubmit = () => {
        const { fullname, username, mobilenumber, serviceDate, serviceTime, userID, memberID, } = this.state;
        if (!fullname || !username || !mobilenumber || !serviceDate || !serviceTime) {
            this.setFullName(fullname)
            this.setUserName(username)
            this.setMobileNumber(mobilenumber)
            this.setServiceDate(serviceDate)
            this.setServiceTime(serviceTime)
            return;
        }
        const body = {
            attendee: memberID,
            appointmentdate: serviceDate,
            onModel: "Member",
            refid: this.serviceDetails._id,
            host: userID,
            charges: this.serviceDetails.charges,
            duration: this.serviceDetails.duration,
            timeslot: {
                starttime: serviceTime
            },
        }
        this.setState({ loading: true });
        try {
            BookService(body).then(response => {
                if (response != null) {
                    this.setState({ loading: false });
                    if (Platform.OS === 'android') {
                        ToastAndroid.show("Booking Success", ToastAndroid.LONG);
                    } else {
                        alert('Booking Success');
                    }
                    this.props.navigation.navigate('BookHistory', { response })
                }
            })
        }
        catch (error) {
            this.setState({ loading: false })
            if (Platform.OS === 'android') {
                ToastAndroid.show("Booking Failed", ToastAndroid.LONG);
            } else {
                alert('Booking Failed');
            }
        }
    }

    render() {
        const { fullname, mobilenumber, serviceTime, serviceDate, username, fullnameError, usernameError, mobilenumberError, serviceDateError, serviceTimeError } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={fullnameError == null ? styles.TextInput : styles.TextInputError}
                                defaultValue={fullname}
                                placeholder="Name"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                                onChangeText={(fullname) => this.setFullName(fullname)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={usernameError == null ? styles.TextInput : styles.TextInputError}
                                placeholder="Email"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"
                                defaultValue={username}
                                blurOnSubmit={false}
                                onSubmitEditing={() => { this.TeardTextInputRef.current.focus() }}
                                ref={this.secondTextInputRef}
                                onChangeText={(email) => this.setUserName(email)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={mobilenumberError == null ? styles.TextInput : styles.TextInputError}
                                defaultValue={mobilenumber}
                                placeholder="Phone_No"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"
                                keyboardType="numeric"
                                ref={this.TeardTextInputRef}
                                onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={serviceDateError == null ? styles.TextInput : styles.TextInputError}
                                defaultValue={serviceDate}
                                placeholder="YYYY-MM-DD"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"
                                onTouchStart={this.showDatePicker}
                                onChangeText={(serviceDate) => this.setServiceDate(serviceDate)}
                            />
                            <DateTimePickerModal
                                isVisible={this.state.isDatePickerVisible}
                                mode="date"
                                onConfirm={this.handleConfirmDate}
                                onCancel={this.hideDatePicker}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={serviceTimeError == null ? styles.TextInput : styles.TextInputError}
                                defaultValue={serviceTime}
                                placeholder="HH-MM"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="done"
                                onTouchStart={this.showTimePicker}
                                onChangeText={(serviceTime) => this.setServiceTime(serviceTime)}
                                onSubmitEditing={() => this.onPressSubmit()}
                            />
                            <DateTimePickerModal
                                isVisible={this.state.isTimePickerVisibility}
                                mode="time"
                                onConfirm={this.handleConfirmTime}
                                onCancel={this.hideTimePicker}
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.book} onPress={() => this.onPressSubmit()} >
                            {this.state.loading === true ? <Loader /> :
                                <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Book </Text>
                            }
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderRadius: 100,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: '#FFFFFF',
        width: WIDTH - 60,
        height: 50,
        margin: 10,
        alignItems: "center"
    },
    TextInput: {
        fontSize: 14,
        flex: 1,
        padding: 10,
        borderColor: '#FFFFFF'
    },
    TextInputError: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderRadius: 100,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: '#FF0000',
        width: WIDTH - 60,
        height: 50,
        alignItems: "center",
        borderWidth: 1
    },
    book: {
        flexDirection: 'row',
        backgroundColor: "#FEBC42",
        marginTop: 30,
        width: WIDTH / 2 + 30,
        height: 50,
        alignItems: "center",
        justifyContent: 'center'
    }
})