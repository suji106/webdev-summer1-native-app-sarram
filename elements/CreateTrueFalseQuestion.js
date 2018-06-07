import React, {Component} from 'react'
import {View, ScrollView, TextInput, StyleSheet, TouchableHighlight} from 'react-native'
import {ListItem, Text, FormLabel, FormInput, FormValidationMessage, CheckBox, Button} from 'react-native-elements'
import TrueFalseQuestionService from "../services/TrueFalseQuestionService";

class CreateTrueFalseQuestion extends Component {
    static navigationOptions = {title: 'Add True or False Question'}

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
        this.trueFalseService = TrueFalseQuestionService.instance;
    }

    createTrueFalseQuestion() {
        console.log("creatingTrueFalseQuestion");
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")

        var trueFalse = this.state;
        trueFalse.type = 'TrueFalse';

        this.trueFalseService.createTrueFalse(examId, trueFalse)
        this.props.navigation
            .navigate("WidgetList")
    }

    updateForm(newState) {
        this.setState(newState)
    }

    render() {
        // let trueFalse = this.state.trueFalse
        return (
            <ScrollView>
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

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.createTrueFalseQuestion}>
                    <Text>
                        Submit
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

                <TextInput style={styles.niceText}>Preview</TextInput>

                <View style={styles.rows}>
                    <Text style={styles.niceText}>{this.state.title}</Text>
                    <Text style={styles.niceText}>{this.state.points}</Text>
                </View>

                <Text style={styles.description}>{this.state.description}</Text>
                <CheckBox checked={false} title='Select true or false!'/>
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

export default CreateTrueFalseQuestion

