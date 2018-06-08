import React, {Component} from 'react'
import {View, Alert, StyleSheet, TextInput, ScrollView, Button} from 'react-native'
import {Text, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import WidgetList from "../components/WidgetList";

class CreateAssignment extends Component {
    static navigationOptions = {title: 'Create AssignmentWidget'}

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
        // fetch("http://s-arram-java-native.herokuapp.com/api/assignment/" + assignmentId)
        //     .then(response => (response.json()))
        //     .then(assignment => this.setState({assignment: assignment, assignmentId: assignmentId, lessonId: lessonId}))
    }

    updateForm(newState) {
        this.setState(newState)
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
            widgetType: "AssignmentWidget",
        };

        var json_body = JSON.stringify(assg_json);

        fetch("http://s-arram-java-native.herokuapp.com/api/lesson/" + this.state.lessonId + "/assignment", {
            body: json_body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        console.log(this.props);
        this.props.navigation
            .navigate("LessonList")
    }

    createAssignment() {
        var assignment = this.state.assignment;

        console.log("creatingAssignment");

        return (
            <ScrollView keyboardShouldPersistTaps={true}>
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
                <Button onPress={() => {
                    this.props.navigation
                        .navigate("WidgetList", {lessonId: this.state.lessonId})
                }} title='Cancel'/>

                <Divider style={{
                    backgroundColor:
                        'black'
                }}/>
                <Text style={{textAlign: 'center', justifyContent: 'center'}}>Preview</Text>
                <Divider style={{
                    backgroundColor: 'black'
                }}/>

                <View style={styles.rows}>
                    <Text h5>
                        {this.state.title}
                    </Text>
                    <Text h5>
                        {this.state.points}pts
                    </Text>
                </View>
                <Text style={styles.description}>
                    {assignment.description}
                </Text>

                <View style={{padding: 5}}>
                    <Text h5>Essay Answer</Text>

                    <TextInput multiline={true}
                               style={{
                                   height: 100,
                                   backgroundColor: 'white',
                                   borderBottomWidth: 0,
                                   borderWidth: 2
                               }}

                               placeholder='Enter the answer here'
                    />


                    <Text h5>Upload File</Text>
                    <Button style={{padding: 10, width: 120}} title='upload'/>
                </View>

                <View style={{padding: 5}}>
                    <FormLabel>Submit a link</FormLabel>
                    <FormInput/>
                </View>

                <Button style={{padding: 10}} title='Submit'/>

                <Button style={{padding: 10}} title='Cancel'/>
            </ScrollView>
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