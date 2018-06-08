import React, {Component} from 'react'
import {View, ScrollView, TextInput, StyleSheet, TouchableHighlight} from 'react-native'
import {ListItem, Text, FormLabel, FormInput, FormValidationMessage, CheckBox, Divider} from 'react-native-elements'
import FillInTheBlanksQuestionService from "../services/FillInTheBlanksQuestionService";

class FillInTheBlanksQuestionWidget extends Component {
    static navigationOptions = {title: 'Fill in the blank'}

    constructor(props) {
        super(props)
        this.state = {
            title: 'Title',
            description: '',
            points: 0,
            blanks: 'Hello'
        }
        this.updateForm = this.updateForm.bind(this);
        this.createFillQuestion = this.createFillQuestion.bind(this);
        this.deleteFillQuestion = this.deleteFillQuestion.bind(this);
        this.generateBlanks = this.generateBlanks.bind(this);
        this.getBlanks = this.getBlanks.bind(this);
        this.fillService = FillInTheBlanksQuestionService.instance;
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")

        if (questionId > 0) {
            fetch("http://s-arram-java-native.herokuapp.com/api/fill/" + questionId)
                .then(response => (response.json()))
                .then(question => this.setState({
                    title: question.title,
                    description: question.description,
                    points: question.points,
                    blanks: question.blanks
                }))
        }
    }

    createFillQuestion() {
        console.log("creatingFillQuestion");
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        const questionId = navigation.getParam("questionId")

        var fill = this.state;
        fill.type = 'FillQuestion';
        if (questionId > 0) {
            fill.id = questionId
        }

        this.fillService.createFillQuestion(examId, fill)
        this.props.navigation
            .navigate("WidgetList")
    }

    deleteFillQuestion() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        this.fillService.deleteFillQuestion(questionId);
        this.props.navigation
            .navigate("WidgetList");
    }

    deleteRequired() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId");

        if (questionId > 0)
            return (
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.deleteFillQuestion}>
                    <Text>
                        Delete
                    </Text>
                </TouchableHighlight>
            );
    }

    updateForm(newState) {
        this.setState(newState)
    }

    getBlanks() {
        return (
            <Input/>
        )
    }

    generateBlanks() {
        console.log("generating Blanks");
        var str = this.state.blanks;

        var regExp = /\{([^{)]+)\}/;
        str = str.replace(/\[/g, '{').replace(/\]/g, '}')

        while(str.indexOf('{') !== -1 && str.indexOf('}') !== -1)
            str = str.replace(new RegExp(regExp), "blank")

        var matches = str.replace('\n',' ').split(' ');
        console.log(matches);

        return (
            <View style={{flexDirection: 'row'}}>
                {matches.map((item, index) => {
                        console.log(item);
                        if (item.toString() === 'blank') {
                            return (
                                <TextInput key={index}>

                                </TextInput>
                            )
                        }
                        else {
                            return (
                                <Text>
                                    {item + " "}
                                </Text>
                            )
                        }
                    }
                )
                }
            </View>
        );
    }

    generateBlankss() {
        console.log("generating Blanks");
        var str = 'Hello';

        return (
            <Text
                dangerouslySetInnerHTML={{__html: str.replace('Hello', <TextInput/>)}}>
                age
            </Text>
        );
    }

    render() {

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
                    Points are required
                </FormValidationMessage>

                <TextInput multiline={true}
                           style={{
                               height: 100,
                               backgroundColor: 'white',
                               borderBottomWidth: 0,
                               borderWidth: 2
                           }}
                           placeholder={"Existing original text:" + this.state.blanks}
                           onChangeText={
                               text => this.updateForm({blanks: text})
                           }
                />

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.createFillQuestion}>
                    <Text>
                        Submit Question
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation
                            .navigate("WidgetList")
                    }}>
                    <Text>
                        Cancel
                    </Text>
                </TouchableHighlight>

                <Divider style={{
                    backgroundColor:
                        'black'
                }}/>
                <Text style={{textAlign: 'center', justifyContent: 'center'}}>Preview</Text>
                <Divider style={{
                    backgroundColor:
                        'black'
                }}/>

                <View style={styles.rows}>
                    <Text h5>
                        {this.state.title}
                    </Text>
                    <Text h5>
                        {this.state.points}pts
                    </Text>
                </View>

                <Text style={styles.description}>{this.state.description}</Text>

                {this.generateBlanks()}

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
        backgroundColor: '#ffe250',
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

export default FillInTheBlanksQuestionWidget

