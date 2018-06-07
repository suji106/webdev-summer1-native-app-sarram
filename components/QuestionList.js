import React, {Component} from 'react'
import {View, Alert, Button, TouchableHighlight, StyleSheet, Picker} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import ExamService from "../services/ExamService";

const questions = [
    {
        title: 'Question 1', subtitle: 'Multiple choice',
        icon: 'list', editor: 'MultipleChoiceQuestionEditor'
    },
    {
        title: 'Question 2', subtitle: 'Fill-in the blanks',
        icon: 'code', editor: 'FillQuestionEditor'
    },
    {
        title: 'Question 3', subtitle: 'True or false',
        icon: 'check', editor: 'TrueFalseQuestionEditor'
    },
    {
        title: 'Question 4', subtitle: 'Essay',
        icon: 'subject', editor: 'CreateEssayQuestion'
    }]

class QuestionList extends Component {
    static navigationOptions = {title: 'Questions'}

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            examId: 1,
            questionType: 0
        }
        this.createQuestion = this.createQuestion.bind(this);
        this.getSubtitle = this.getSubtitle.bind(this);
        this.getIcon = this.getIcon.bind(this);
        this.deleteExam = this.deleteExam.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.examService = ExamService.instance;
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        fetch("http://192.168.125.2:8080/api/exam/" + examId)
            .then(response => (response.json()))
            .then(questions => this.setState({questions: questions, examId: examId}))
    }

    addQuestion(type) {
        let editor;
        type = type.toString()
        if (type === '0')
            editor = "MultipleChoiceQuestionEditor"
        if (type === '1')
            editor = "FillQuestionEditor"
        if (type === '2')
            editor = "CreateTrueFalseQuestion"
        if (type === '3') {
            editor = "CreateEssayQuestion"
        }

        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        console.log(examId);
        console.log(editor);
        this.props.navigation
            .navigate(editor, {examId: examId})
    }

    createQuestion() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")

        this.props.navigation
            .navigate("CreateQuestion", {examId: examId})
    }

    deleteExam() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        this.examService.deleteExam(examId);

        this.props.navigation
            .navigate("WidgetList")
    }

    getSubtitle(question) {
        if (question.type === "TrueFalse")
            return "True or False"
        if (question.type === "MultipleChoice")
            return "MCQ"
        if (question.type === "Essay")
            return "Essay"
        if (question.type === "FillQuestion")
            return "Fill in the Blanks"
    }

    getIcon(question) {
        if (question.type === "TrueFalse")
            return 'check'
        if (question.type === "MultipleChoice")
            return 'list'
        if (question.type === "Essay")
            return 'subject'
        if (question.type === "FillQuestion")
            return 'code'
    }

    render() {

        return (
            <View style={{padding: 15}}>
                <View style={{padding: 15}}>
                    <Text h4>
                        Choose the type of question you want to add from the picker!
                    </Text>
                    <View>
                        <Picker
                            onValueChange={(itemValue) =>
                                this.setState({questionType: itemValue})}
                            selectedValue={this.state.questionType}>
                            <Picker.Item value="0" label="Multiple choice"/>
                            <Picker.Item value="1" label="Fill in the blanks"/>
                            <Picker.Item value="2" label="True or false"/>
                            <Picker.Item value="3" label="Essay"/>
                        </Picker>
                        <Button onPress={() => this.addQuestion(this.state.questionType)} title='Submit'/>
                    </View>
                    
                    {this.state.questions.map(
                        (question, index) => (
                            <ListItem
                                onPress={() => {
                                    if (question.type === "TrueFalse")
                                        this.props.navigation
                                            .navigate("TrueFalseQuestionEditor", {questionId: question.id})
                                    if (question.type === "MultipleChoice")
                                        this.props.navigation
                                            .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
                                    if (question.type === "Essay")
                                        this.props.navigation
                                            .navigate("EssayQuestionEditor", {questionId: question.id})
                                    if (question.type === "FillQuestion")
                                        this.props.navigation
                                            .navigate("FillQuestionEditor", {questionId: question.id})
                                }
                                }
                                key={index}
                                subtitle={this.getSubtitle(question)}
                                leftIcon={{name: this.getIcon(question)}}
                                title={question.title}/>))}

                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.deleteExam}>
                        <Text>
                            Delete Exam
                        </Text>
                    </TouchableHighlight>

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
                backgroundColor: 'pink'
            },
                description: {
                padding: 20,
                fontSize: 15
            }
            });

                export default QuestionList