import React, {Component} from 'react'
import {View, Alert, StyleSheet, TextInput} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import WidgetList from "./WidgetList";

class CreateAssignment extends Component {
    static navigationOptions = {title: 'Assignment'}

    constructor(props) {
        super(props)
        this.state = {
            assignment: {
                id: props.id,
                text: "t t t t t",
                title: "title",
                description: "description",
                points: 35,
                widgetType: "",
            },
            assignmentId: "",
            lessonId: props.lessonId,
            viewer: ""
        }

        this.createAssignment = this.createAssignment.bind(this);
        this.submitDescription = this.submitDescription.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        //const assignmentId = navigation.getParam("assignmentId")
        const lessonId = navigation.getParam("lessonId")
        this.setState({lessonId: lessonId})
        // fetch("http://192.168.125.2:8080/api/assignment/" + assignmentId)
        //     .then(response => (response.json()))
        //     .then(assignment => this.setState({assignment: assignment, assignmentId: assignmentId, lessonId: lessonId}))
    }

    updateForm(newState) {
        this.setState(newState)
    }

    viewAssignment() {
        var assignment = this.state.assignment;
        return (
            <View>
                <View style={styles.rows}>
                    <Text style={styles.niceText}>
                        {assignment.title}
                    </Text>
                    <Text style={styles.niceText}>
                        {assignment.points}pts
                    </Text>
                </View>
                <Text style={styles.description}>
                    {assignment.description}
                </Text>
                <FormInput placeholder='give the answer here'/>
                <Button title='Submit'/>
            </View>
        )
    }

    submitDescription() {
        console.log("submittingDescription");
        console.log(this.state.assignment);
        var assignment = this.state.assignment;
        var assg_json = {
            text: assignment.text,
            title: assignment.title,
            points: assignment.points,
            description: assignment.description,
            widgetType: "Assignment",
        };

        var json_body = JSON.stringify(assg_json);

        fetch("http://192.168.125.2:8080/api/lesson/" + this.state.lessonId + "/assignment", {
            body: json_body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        console.log(this.props);
        this.props.navigation
            .navigate("WidgetList", {lessonId: this.state.lessonId})
    }

    createAssignment() {
        var assignment = this.state.assignment;

        console.log("creatingAssignment");

        return (
            <View>
                <View>
                    <FormInput placeholder='Enter title here!'
                               onChangeText={
                                   text => (
                                       this.updateForm({
                                           assignment: {
                                               text: assignment.text,
                                               title: text,
                                               points: assignment.points,
                                               description: assignment.description,
                                               widgetType: assignment.widgetType,
                                           }
                                       }))
                               }/>
                    <FormInput placeholder='Enter points here'
                               onChangeText={
                                   text => this.updateForm({
                                       assignment: {
                                           text: assignment.text,
                                           title: assignment.title,
                                           points: text,
                                           description: assignment.description,
                                           widgetType: assignment.widgetType,
                                       }
                                   })
                               }/>
                </View>
                <Text style={styles.description}>
                    {assignment.description}
                </Text>
                <TextInput multiline={true}
                           style={{
                               height: 100,
                               backgroundColor: 'white',
                               borderBottomWidth: 0,
                               borderWidth: 2
                           }}

                           placeholder='Give the description here'
                           onChangeText={
                               text => this.updateForm({
                                   assignment: {
                                       text: assignment.text,
                                       title: assignment.title,
                                       points: assignment.points,
                                       description: text,
                                       widgetType: assignment.widgetType,
                                   }
                               })
                           }/>
                <Button onPress={this.submitDescription} title='Submit'/>

                <Text h2>
                    Preview
                </Text>

                <View style={styles.rows}>
                    <Text style={styles.niceText}>
                        {assignment.title}
                    </Text>
                    <Text style={styles.niceText}>
                        {assignment.points}pts
                    </Text>
                </View>
                <Text style={styles.description}>
                    {assignment.description}
                </Text>
                <FormInput placeholder='give the answer here'/>
                <Button title='Submit'/>

            </View>
        )
    }

    render() {
        console.log(this.props.params);
        return (
            <View>
                {this.createAssignment()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
});


export default CreateAssignment