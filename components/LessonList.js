import React, {Component} from 'react'
import {View, Alert, StyleSheet} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class LessonList extends Component {
    static navigationOptions = {title: 'Lessons'}

    constructor(props) {
        super(props)
        this.state = {
            lessons: [],
            courseId: 1,
            moduleId: 1
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        const moduleId = navigation.getParam("moduleId")
        fetch("http://192.168.125.2:8080/api/course/" + courseId + "/module/" + moduleId + "/lesson")
            .then(response => (response.json()))
            .then(lessons => this.setState({lessons}))
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.lessons.map(
                    (lesson, index) => (
                        <ListItem style={styles.niceText}
                            onPress={() => this.props.navigation
                                .navigate("WidgetList", {lessonId: lesson.id})}
                            leftIcon={{name: 'apps'}}
                            key={index}
                            title={lesson.title}/>))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#ff7408',
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


export default LessonList