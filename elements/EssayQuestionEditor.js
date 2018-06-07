import React from 'react'
import {StyleSheet, View, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import EssayQuestionService from "../services/EssayQuestionService";


class FillQuestionEditor extends React.Component {
    static navigationOptions = {title: "Essay Question"}

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0
        }
        this.essayService = EssayQuestionService.instance;
        this.deleteEssayQuestion = this.deleteEssayQuestion.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")

        fetch("http://192.168.125.2:8080/api/essay/" + questionId)
            .then(response => (response.json()))
            .then(question => this.setState({
                title: question.title,
                description: question.description,
                points: question.points
            }))
    }

    deleteEssayQuestion(){
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        this.essayService.deleteEssayQuestion(questionId);
        this.props.navigation
            .navigate("WidgetList", {lessonId: this.state.lessonId});
    }

    render() {
        return (
            <View>
                <View style={styles.rows}>
                    <Text style={styles.niceText}>
                        {this.state.title}
                    </Text>
                    <Text style={styles.niceText}>
                        {this.state.points}pts
                    </Text>
                </View>
                <Text style={styles.description}>
                    {this.state.description}
                </Text>

                <TextInput style={{textAlign: 'center', justifyContent: 'center'}}></TextInput>
                <Button onPress={this.deleteEssayQuestion} title='Delete'/>

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

export default FillQuestionEditor