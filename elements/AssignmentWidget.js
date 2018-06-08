import React, {Component} from 'react'
import {View, ScrollView, StyleSheet, TextInput, TouchableHighlight, Button} from 'react-native'
import {Text, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import WidgetList from "../components/WidgetList";
import AssignmentService from '../services/AssignmentService'

class AssignmentWidget extends Component {
    static navigationOptions = {title: 'AssignmentWidget'}

    constructor(props) {
        console.log("constructor");
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
        }

        this.assignmentService = AssignmentService.instance;
        this.updateAssignment = this.updateAssignment.bind(this);
        this.deleteAssignment = this.deleteAssignment.bind(this);
    }

    componentDidMount() {
        console.log("mounting");
        const {navigation} = this.props;
        const assignmentId = navigation.getParam("assignmentId")
        const lessonId = navigation.getParam("lessonId")
        console.log(assignmentId)
        let assignment = Object.assign({}, this.state.assignment);
        assignment.id = assignmentId;
        this.setState({
            assignment: assignment,
            assignmentId: assignmentId,
            lessonId: lessonId
        });

        this.getAssignment(assignmentId)
    }

    getAssignment(assignmentId) {
        console.log("gettingAssignment " + assignmentId)
        fetch("http://s-arram-java-native.herokuapp.com/api/assignment/" + assignmentId)
            .then(response => (response.json()))
            .then(assignment => this.setState({assignment: assignment}))
    }

    updateAssignment(){
        console.log("updatingAssignment");
        console.log(this.state);
        var assignment = this.state.assignment;
        var assg_json = {
            id: this.state.assignmentId,
            text: assignment.text,
            title: assignment.title,
            points: assignment.points,
            description: assignment.description,
            widgetType: "AssignmentWidget",
        };

        console.log(this.props.navigation);
        let renderWidgets = this.props.navigation.getParam("func");
        var lessonId = this.state.lessonId

        this.assignmentService.updateAssignment(lessonId, assg_json)
            //.then(() => this.props.navigation
            //.navigate("WidgetList", {lessonId: lessonId}))
            //.then(() => renderWidgets());
        this.props.navigation
        .navigate("LessonList")
    }

    deleteAssignment() {
        this.assignmentService.deleteAssignment(this.state.assignment.id);
        this.props.navigation
            .navigate("WidgetList", {lessonId: this.state.lessonId});
    }

    updateForm(newState) {
        this.setState(newState);
    }

    render() {
        console.log(this.state)
        var assignment = this.state.assignment;
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
                <Button onPress={this.updateAssignment} title='Submit'/>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.deleteAssignment}>
                    <Text>
                        Delete Assignment
                    </Text>
                </TouchableHighlight>

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
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#2c0cff',
        padding: 25,
        borderWidth: 2,
        borderColor: '#ff711a',
        marginTop: 30,
        marginBottom: 50
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


export default AssignmentWidget