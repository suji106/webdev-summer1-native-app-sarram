import React from 'react'
import {Header} from 'react-native-elements'

const FixedHeader = () => (
    <Header
        centerComponent={{
            text: 'Course Manager',
            style: {color: '#f8ffff'},
            fontSize: 50,
        }}
        />
)

export default FixedHeader