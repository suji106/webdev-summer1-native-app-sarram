import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FixedHeader from './elements/FixedHeader'

export default class App extends React.Component {
    render() {
        return (
            <View>
                {/*<StatusBar barStyle="light-content"/>*/}
                <FixedHeader/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff91a',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
