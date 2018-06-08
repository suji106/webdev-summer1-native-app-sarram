import React from 'react'
import {StyleSheet, View, ScrollView, TextInput, TouchableHighlight} from 'react-native'
import {Text, Button, CheckBox, FormInput} from 'react-native-elements'
import EssayQuestionService from "../services/EssayQuestionService";


class FillQuestionEditor extends React.Component {
    static navigationOptions = {title: "Essay"}

    constructor(props) {
        super(props)
        this.state = {
            essay: {
                title: '',
                description: '',
                points: 0
            },
            title: '',
            description: '',
            points: 0
        }
        this.essayService = EssayQuestionService.instance;
        this.deleteEssayQuestion = this.deleteEssayQuestion.bind(this);
        this.createEssayQuestion = this.createEssayQuestion.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.deleteRequired = this.deleteRequired.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")

        if (questionId > 0) {
            fetch("http://s-arram-java-native.herokuapp.com/api/essay/" + questionId)
                .then(response => (response.json()))
                .then(question => this.setState({
                    essay: {
                        title: question.title,
                        description: question.description,
                        points: question.points
                    },
                    title: question.title,
                    description: question.description,
                    points: question.points
                }))
        }
    }

    createEssayQuestion() {
        console.log("submittingDescription");
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        const questionId = navigation.getParam("questionId")

        var essay = this.state.essay;
        essay.type = 'Essay';
        if (questionId > 0) {
            essay.id = questionId
        }

        this.essayService.createEssay(examId, essay)
        this.props.navigation
            .navigate("WidgetList")
    }

    updateForm(newState) {
        this.setState(newState)
    }

    deleteEssayQuestion() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        this.essayService.deleteEssayQuestion(questionId);
        this.props.navigation
            .navigate("WidgetList", {lessonId: this.state.lessonId});
    }

    deleteRequired() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId");

        if (questionId > 0)
            return (
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.deleteEssayQuestion}>
                    <Text>
                        Delete
                    </Text>
                </TouchableHighlight>
            );
        else {
            return (
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation
                            .navigate("WidgetList", {lessonId: this.state.lessonId})
                    }}>
                    <Text>
                        Cancel
                    </Text>
                </TouchableHighlight>
            );
        }
    }

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps={true}>
                <FormInput placeholder='Enter title here!'
                           onChangeText={
                               text => (
                                   this.updateForm({
                                       essay: {
                                           title: text,
                                           description: this.state.essay.description,
                                           points: this.state.essay.points
                                       }
                                   }))
                           }/>
                <FormInput placeholder='Enter points here!'
                           onChangeText={
                               text => (
                                   this.updateForm({
                                       essay: {
                                           title: this.state.essay.title,
                                           description: this.state.essay.description,
                                           points: text
                                       }
                                   }))
                           }/>
                <TextInput multiline={true}
                           style={{
                               height: 100,
                               backgroundColor: 'white',
                               borderBottomWidth: 0,
                               borderWidth: 2
                           }}

                           placeholder='Give the essay description here'
                           onChangeText={
                               text => this.updateForm({
                                   essay: {
                                       title: this.state.essay.title,
                                       description: text,
                                       points: this.state.essay.points,
                                   }
                               })
                           }/>

                <Text style={{textAlign: 'center', justifyContent: 'center'}}>Preview</Text>

                <View style={styles.rows}>
                    <Text style={styles.niceText}>
                        {this.state.essay.title}
                    </Text>
                    <Text style={styles.niceText}>
                        {this.state.essay.points}pts
                    </Text>
                </View>
                <Text style={styles.description}>
                    {this.state.essay.description}
                </Text>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.createEssayQuestion}>
                    <Text>
                        Submit
                    </Text>
                </TouchableHighlight>

                {this.deleteRequired()}

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
    },
    formBox: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1
    }
});

export default FillQuestionEditor