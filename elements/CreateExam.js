import React, {Component} from 'react'
import {View, Alert, StyleSheet, TextInput, TouchableHighlight} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import WidgetList from "../components/WidgetList";
import ExamService from "../services/ExamService";

class CreateExam extends Component {
    static navigationOptions = {title: 'Add Exam'}

    constructor(props) {
        super(props)
        this.state = {
            exam: {
                title: "title",
                description: "description",
                widgetType: "",
            },
            examId: "",
            lessonId: props.lessonId,
        }

        this.createExam = this.createExam.bind(this);
        this.submitDescription = this.submitDescription.bind(this);
        this.examService = ExamService.instance;
    }

    componentDidMount() {
        const {navigation} = this.props;
        //const assignmentId = navigation.getParam("assignmentId")
        const lessonId = navigation.getParam("lessonId")
        this.setState({lessonId: lessonId})
    }

    updateForm(newState) {
        this.setState(newState)
    }

    submitDescription() {
        console.log("submittingDescription");
        console.log(this.state.exam);
        // const {navigation} = this.props;
        // const lessonId = navigation.getParam("lessonId")

        let exam = this.state.exam;
        let exam_json = {
            title: exam.title,
            description: exam.description,
            widgetType: "Exam",
        };

        this.examService.createExam(this.state.lessonId, exam_json);

        this.props.navigation
            .navigate("WidgetList", {lessonId: this.state.lessonId})
    }

    createExam() {
        var assignment = this.state.exam;

        console.log("creatingExam");
        let exam = Object.assign({}, this.state.exam);

        return (
            <View>
                <View>
                    <FormInput placeholder='Enter title here!'
                               onChangeText={
                                   text => (
                                       this.updateForm({
                                           exam: {
                                               title: text,
                                               description: exam.description,
                                               widgetType: exam.widgetType,
                                           }
                                       }))
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
                                   exam: {
                                       title: exam.title,
                                       description: text,
                                       widgetType: exam.widgetType,
                                   }
                               })
                           }/>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.submitDescription}>
                    <Text>
                        Create Exam
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.createExam()}
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


export default CreateExam