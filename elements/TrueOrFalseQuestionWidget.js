import React, {Component} from 'react'
import {View, ScrollView, TextInput, StyleSheet, TouchableHighlight} from 'react-native'
import {ListItem, Text, FormLabel, FormInput, FormValidationMessage, CheckBox, Button} from 'react-native-elements'
import TrueFalseQuestionService from "../services/TrueFalseQuestionService";

class TrueOrFalseQuestionWidget extends Component {
    static navigationOptions = {title: 'True or False'}

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            isTrue: true
        }
        this.updateForm = this.updateForm.bind(this);
        this.createTrueFalseQuestion = this.createTrueFalseQuestion.bind(this);
        this.deleteTrueFalseQuestion = this.deleteTrueFalseQuestion.bind(this);
        this.trueFalseService = TrueFalseQuestionService.instance;
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")

        fetch("http://s-arram-java-native.herokuapp.com/api/truefalse/" + questionId)
            .then(response => (response.json()))
            .then(question => this.setState({
                title: question.title,
                description: question.description,
                points: question.points,
                isTrue: question.isTrue
            }))
    }

    createTrueFalseQuestion() {
        console.log("creatingTrueFalseQuestion");
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        const questionId = navigation.getParam("questionId")

        var trueFalse = this.state;
        trueFalse.type = 'TrueFalse';
        if(questionId > 0){
            trueFalse.id = questionId
        }

        this.trueFalseService.createTrueFalse(examId, trueFalse)
        this.props.navigation
            .navigate("WidgetList")
    }

    deleteTrueFalseQuestion() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")

        this.trueFalseService.deleteTrueFalseQuestion(questionId);
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
                    onPress={this.deleteTrueFalseQuestion}>
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

    updateForm(newState) {
        this.setState(newState)
    }

    render() {
        // let trueFalse = this.state.trueFalse
        return (
            <ScrollView keyboardShouldPersistTaps={true}>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                }/>

                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({points: text})
                }/>

                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <CheckBox onPress={() => this.updateForm(() =>
                    this.updateForm({isTrue: !this.state.isTrue}))
                }
                          checked={this.state.isTrue}
                          title='The answer is true'/>

                <Text style={styles.niceText}>Preview</Text>

                <View style={styles.rows}>
                    <Text style={styles.niceText}>{this.state.title}</Text>
                    <Text style={styles.niceText}>{this.state.points}</Text>
                </View>

                <Text style={styles.description}>{this.state.description}</Text>
                <CheckBox checked={false} title='Select true or false!'/>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.createTrueFalseQuestion}>
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
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'center'
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

export default TrueOrFalseQuestionWidget

