import React, {Component} from 'react'
import {View, Button, TextInput, StyleSheet} from 'react-native'
import {ListItem, Text, FormInput} from 'react-native-elements'
import EssayQuestionService from '../services/EssayQuestionService'

class CreateEssayQuestion extends Component {
    static navigationOptions = {title: 'Add Essay Question'}

    constructor(props) {
        super(props)
        this.state = {
            essay: {
                title: '',
                description: '',
                points: 0
            },
            examId: ''
        }
        this.updateForm = this.updateForm.bind(this);
        this.createEssayQuestion = this.createEssayQuestion.bind(this);
        this.essayService = EssayQuestionService.instance;
    }

    createEssayQuestion() {
        console.log("submittingDescription");
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")

        var essay = this.state.essay;
        essay.type = 'Essay';
        
        this.essayService.createEssay(examId, essay)
        this.props.navigation
            .navigate("WidgetList", {lessonId: this.state.lessonId})
        console.log(this.state.lessonId);
    }

    updateForm(newState) {
        this.setState(newState)
    }

    render() {
        return (
            <View>
                <View>
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
                </View>
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
                <TextInput style={{textAlign: 'center', justifyContent: 'center'}}>Preview</TextInput>

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

                <Button onPress={this.createEssayQuestion} title='Submit'/>
                <Button onPress={() => {this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId})}} title='Cancel'/>
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
    },
    formBox: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1
    }
});

export default CreateEssayQuestion