import React, {Component} from 'react'
import {View, Alert, StyleSheet} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class CourseList extends Component {
    static navigationOptions = {title: 'Courses'}

    constructor(props) {
        super(props);
        // fetch('http://s-arram-java-native.herokuapp.comz/api/course')
        fetch('http://192.168.125.2:8080/api/course')
            .then(response => (response.json()))
            .then(courses => {
                this.setState({courses: courses})
            })
        this.state = {
            courses: [{
                id: 0,
                title: ''
            }]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.courses.map((course, index) => (
                    <ListItem style={styles.niceText}
                        onPress={() => this.props.navigation.navigate("ModuleList",
                            {courseId: course.id})}
                        title={course.title}
                        leftIcon={{name: 'collections-bookmark'}}
                        key={index}/>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#ffd80d',
        color: 'red'
    },
    rows: {
        flexDirection: 'row',
        backgroundColor: 'pink',
        justifyContent: 'space-between'
    },
    niceText: {
        fontSize: 25,
        color: 'blue',
        backgroundColor: 'powderblue'
    },
    description: {
        padding: 20,
        fontSize: 15
    },
    formBox: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1
    }
});

export default CourseList