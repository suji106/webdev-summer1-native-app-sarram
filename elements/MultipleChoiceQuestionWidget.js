import React, {Component} from 'react'
import {View, ScrollView, TextInput, StyleSheet, TouchableHighlight} from 'react-native'
import {ListItem, Text, FormLabel, FormInput, FormValidationMessage, Button, Divider} from 'react-native-elements'
import MultipleChoiceQuestionService from "../services/MultipleChoiceQuestionService";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

class MultipleChoiceQuestionWidget extends Component {
    static navigationOptions = {title: 'Multiple Choice Question'}

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            options: '',
            correctOption: 0
        }
        this.updateForm = this.updateForm.bind(this);
        this.createMultiQuestion = this.createMultiQuestion.bind(this);
        this.deleteMultiQuestion = this.deleteMultiQuestion.bind(this);

        this.optionField = "";
        this.onSelect = this.onSelect.bind(this)

        this.multiService = MultipleChoiceQuestionService.instance;
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")

        if (questionId > 0) {
            fetch("http://s-arram-java-native.herokuapp.com/api/multi/" + questionId)
                .then(response => (response.json()))
                .then(question => this.setState({
                    title: question.title,
                    description: question.description,
                    points: question.points,
                    options: question.options,
                    correctOption: question.correctOption
                }))
        }
    }

    createMultiQuestion() {
        console.log("creatingMultiQuestion");
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        const questionId = navigation.getParam("questionId")

        var multi = this.state;
        multi.type = 'MultipleChoice';

        if (questionId > 0) {
            multi.id = questionId
        }

        this.multiService.createMultiQuestion(examId, multi)
        this.props.navigation
            .navigate("WidgetList")
    }

    deleteMultiQuestion() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")

        this.multiService.deleteMultiQuestion(questionId);
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
                    onPress={this.deleteMultiQuestion}>
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

    updateOptionField(value) {

        this.optionField = value;
    }

    onSelect(index) {

        this.updateForm({correctOption: index});
    }

    render() {
        var options = this.state.options;
        console.log(options);
        return (
            <ScrollView keyboardShouldPersistTaps={true}>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                } value={this.state.title}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    points => this.updateForm({points: points})
                }
                />
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                } value={this.state.description}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>


                <FormLabel>Enter an option</FormLabel>
                <FormInput onChangeText={
                    text => this.updateOptionField(text)
                }/>
                <Button style={{padding: 0}} backgroundColor="orange"
                        color="white"
                        title="Add option"
                        onPress={() => this.updateForm({options: this.state.options + this.optionField + " "})}/>

                <View style={styles.container}>
                    <RadioGroup
                        size={24}
                        thickness={2}
                        color='#9575b2'
                        highlightColor='#ccc8b9'
                        selectedIndex={this.state.correctOption}
                        onSelect={(index) => this.updateForm({correctOption: index})}
                    >
                        {options.split(" ").slice(0, -1).map(
                            (option, index) => (<RadioButton
                                key={index}
                                value={option}>
                                <Text>{option}</Text>
                            </RadioButton>))}
                    </RadioGroup>
                </View>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.createMultiQuestion}>
                    <Text>
                        Submit
                    </Text>
                </TouchableHighlight>

                {this.deleteRequired()}

                <Divider style={{
                    backgroundColor:
                        'black'
                }}/>
                <Text h4>Preview</Text>
                <Divider style={{
                    backgroundColor:
                        'black'
                }}/>
                <View style={questionStyles.rows}>
                    <Text h5>
                        {this.state.title}
                    </Text>
                    <Text h5>
                        {this.state.points}pts
                    </Text>
                </View>
                <View style={{padding: 5}}>
                    <Text style={questionStyles.description}>
                        {this.state.description}
                    </Text>
                    <View style={styles.container}>
                        <RadioGroup
                            size={24}
                            thickness={2}
                            color='#9575b2'
                            highlightColor='#ccc8b9'
                        >
                            {options.split(" ").slice(0, -1).map(
                                (option, index) => (<RadioButton
                                    key={index}
                                    value={option}>
                                    <Text>{option}</Text>
                                </RadioButton>))}

                        </RadioGroup>
                    </View>
                </View>
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

const questionStyles = StyleSheet.create({

    rows: {
        flexDirection: 'row', padding: 10,
        justifyContent: 'space-between'
    },

    buttonRow: {
        flexDirection: 'row', padding: 20,
        justifyContent: 'space-between'
    }
    ,

    description: {
        padding: 10,
        fontSize: 15
    }
});

export default MultipleChoiceQuestionWidget

