import React, {Component} from 'react'
import {View, ScrollView, Alert, Button, StyleSheet, TouchableHighlight} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}

    constructor(props) {
        super(props)
        this.state = {
            widgets: [{
                id: 1,
                title: 'quiz 678',
                description: 'mcq',
                widgetType: 'Exam'
            }],
            courseId: 0,
            moduleId: 0,
            lessonId: ""
        }
        this.addAssignment = this.addAssignment.bind(this);
        this.addExam = this.addExam.bind(this);
        this.renderAll = this.renderAll.bind(this);
        this.getIcon = this.getIcon.bind(this);
    }

    componentDidMount() {
        console.log("mountingWidgetList");
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        console.log(lessonId);
        fetch("http://192.168.125.2:8080/api/lesson/" + lessonId + "/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets: widgets, lessonId: lessonId}))
    }

    renderAll() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        fetch("http://192.168.125.2:8080/api/lesson/" + lessonId + "/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets: widgets, lessonId: lessonId}))
    }

    addAssignment() {
        this.props.navigation
            .navigate("CreateAssignment", {lessonId: this.state.lessonId})
    }

    addExam() {
        this.props.navigation
            .navigate("CreateExam", {lessonId: this.state.lessonId})
    }

    getIcon(type) {
        if (type === "Assignment") {
            return 'assignment'
        }

        else {
            return 'border-color'
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.widgets.map(
                    (widget, index) => (
                        <ListItem style={styles.niceText}
                                  onPress={() => {
                                      if (widget.widgetType === "Exam")
                                          this.props.navigation
                                              .navigate("QuestionList", {
                                                  examId: widget.id, lessonId: this.state.lessonId,
                                                  func: this.renderAll
                                              })

                                      if (widget.widgetType === "Assignment")
                                          this.props.navigation
                                              .navigate("Assignment", {
                                                  assignmentId: widget.id, lessonId: this.state.lessonId,
                                                  func: this.renderAll
                                              })
                                  }
                                  }
                                  key={index}
                                  leftIcon={{name: this.getIcon(widget.widgetType)}}
                                  subtitle={widget.widgetType}
                                  title={widget.title}/>))}
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.addAssignment}>
                    <Text>
                        Add Assignment
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.addExam}>
                    <Text>
                        Add Exam
                    </Text>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#ff5903',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#ffc515',
        padding: 25,
        borderWidth: 2,
        borderColor: '#ff711a',
        marginTop: 10,
        marginBottom: 10
    },
    rows: {
        flexDirection: 'row',
        backgroundColor: 'pink',
        justifyContent: 'space-between',
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

export default WidgetList