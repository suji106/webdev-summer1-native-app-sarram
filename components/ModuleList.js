import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class ModuleList extends Component {
    static navigationOptions = {title: 'Modules'}

    constructor(props) {
        super(props)
        this.state = {
            modules: [],
            courseId: 1
        }
    }

    componentDidMount() {
        const courseId = this.props.navigation.getParam("courseId", 1);
        this.setState({
            courseId: courseId
        })
        fetch('http://192.168.125.2:8080/api/course/' + courseId + '/module')
            .then(response => (response.json()))
            .then(modules => this.setState({modules: modules}))
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.modules.map((module, index) => (
                    <ListItem style={styles.niceText}
                        onPress={() => this.props.navigation
                            .navigate("LessonList", {
                                courseId:
                                this.state.courseId, moduleId: module.id
                            })}
                        leftIcon={{name: 'view-module'}}
                        key={index}
                        title={module.title}/>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'orange',
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


export default ModuleList