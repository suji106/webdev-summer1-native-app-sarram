import React, {Component} from 'react'
import {View, Picker, Button, StyleSheet} from 'react-native'
import {ListItem, Text} from 'react-native-elements'

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
        icon: 'check', editor: 'TrueOrFalseQuestionWidget'
    },
    {
        title: 'Question 4', subtitle: 'Essay',
        icon: 'subject', editor: 'CreateEssayQuestion'
    }]

export default class CreateQuestion extends Component {
    static navigationOptions = {title: 'Add Question'}

    constructor(props){
        super(props);
        this.addQuestion = this.addQuestion.bind(this);
        this.state = {
            questionType: 0
        }
    }

    // addQuestion(editor) {
    //     const {navigation} = this.props;
    //     const examId = navigation.getParam("examId")
    //     console.log(examId);
    //     this.props.navigation
    //         .navigate(editor, {examId: examId})
    // }

    addQuestion(type) {
        let editor;
        type = type.toString()
        if(type === '0')
            editor = "MultipleChoiceQuestionEditor"
        if(type === '1')
            editor = "FillQuestionEditor"
        if(type === '2')
            editor = "CreateTrueFalseQuestion"
        if(type === '3'){
            editor = "CreateEssayQuestion"
        }

        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        console.log(examId);
        console.log(editor);
        this.props.navigation
            .navigate(editor, {examId: examId})
    }

    render() {
        return (
            <View style={{padding: 15}}>
                <Text h4>
                    Choose the type of question you want to add from the picker!
                </Text>
                {/*{questions.map((question, index) => (*/}
                    {/*<ListItem*/}
                        {/*onPress={()=> this.addQuestion(question.editor)}*/}
                        {/*key={index}*/}
                        {/*leftIcon={{name: question.icon}}*/}
                        {/*subtitle={question.subtitle}*/}
                        {/*title={question.title}/>*/}
                {/*))}*/}
                <View>
                    <Picker
                        onValueChange={(itemValue) =>
                            this.setState({questionType: itemValue})}
                        selectedValue={this.state.questionType}>
                        <Picker.Item value="0" label="Multiple choice" />
                        <Picker.Item value="1" label="Fill in the blanks" />
                        <Picker.Item value="2" label="True or false" />
                        <Picker.Item value="3" label="Essay" />
                    </Picker>
                    <Button onPress={()=> this.addQuestion(this.state.questionType)} title='Submit'/>
                </View>
            </View>
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