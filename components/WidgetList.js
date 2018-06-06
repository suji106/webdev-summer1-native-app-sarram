import React, {Component} from 'react'
import {View, ScrollView, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'

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
            courseId: 1,
            moduleId: 1,
            lessonId: 1
        }
        this.addAssignment = this.addAssignment.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        fetch("http://192.168.125.2:8080/api/lesson/" + lessonId + "/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }

    addAssignment(){
        this.props.navigation
            .navigate("Assignment", {func: "createAssignment", lessonId: this.state.lessonId})
    }

    render() {
        return (
            <ScrollView style={{padding: 15}}>
                {this.state.widgets.map(
                    (widget, index) => (
                        <ListItem
                            onPress={() => {
                                console.log(widget);
                                if (widget.widgetType === "Exam")
                                    this.props.navigation
                                        .navigate("QuestionList", {examId: widget.id, lessonId: this.state.lessonId})

                                if (widget.widgetType === "Assignment")
                                    this.props.navigation
                                        .navigate("Assignment", {assignmentId: widget.id, lessonId: this.state.lessonId})
                                }
                            }
                            key={index}
                            subtitle={widget.description}
                            title={widget.title}/>))}
                <Button onPress={this.addAssignment} title='Add Assignment'/>
                <Button onPress={this.addAssignment} title='Add Exam'/>
            </ScrollView>
        )
    }
}

export default WidgetList