import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, Dimensions } from 'react-native';
import { Rating } from 'react-native-ratings';
import HTML from 'react-native-render-html';
const WIDTH = Dimensions.get('window').width;

class StaffDetails extends Component {
    constructor(props) {
        super(props);
        this.staffDetails = this.props.route.params.item;
        this.state = {
            staffDetails: this.staffDetails
        };
    }

    render() {
        const { staffDetails } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ marginBottom: 50 }} >
                        <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                            <Image source={{ uri: staffDetails.property.profilepic ? staffDetails.property.profilepic : 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
                                style={{ alignItems: 'center', height: 100, width: 100, marginTop: 10, borderRadius: 100, borderColor: '#FFFFFF', borderWidth: 1 }}
                            />
                        </View>
                        <View>
                            <Text style={{ flex: 1, fontSize: 16, color: '#000000', textAlign: 'center' }}>{staffDetails.property.fullname}</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                <View style={styles.listview}>
                                    <Text style={{ fontSize: 16, color: '#000000', textAlign: 'center', marginTop: 10 }}>{staffDetails.property.mobile_number}</Text>
                                    <Text style={{ fontSize: 16, color: '#000000', textAlign: 'center', marginTop: 5 }}>{staffDetails.property.email}</Text>
                                    <View style={{ marginTop: 10 }}>
                                        <Rating readonly startingValue="{5}" ratingCount={5} />
                                    </View>
                                    <View style={{ alignItems: 'center', marginTop: 10, padding: 5, marginLeft: 10, marginRight: 5, marginBottom: 20 }}>
                                        <HTML baseFontStyle={{ fontSize: 14, textTransform: 'capitalize', textAlign: 'center' }}
                                            html={`<html>${staffDetails && staffDetails.property.about_me} </html>`} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default StaffDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    listview: {
        flexDirection: 'column',
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: 10,
        width: WIDTH - 40,
        marginBottom: 10
    }
})