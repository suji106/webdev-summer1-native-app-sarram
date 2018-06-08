import React from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView, YellowBox, TouchableHighlight} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import AssignmentWidget from './elements/AssignmentWidget'
import MultipleChoiceQuestionWidget from './elements/MultipleChoiceQuestionWidget'
import TrueOrFalseQuestionWidget from './elements/TrueOrFalseQuestionWidget'
import EssayQuestionWidget from './elements/EssayQuestionWidget'
import FillInTheBlanksQuestionWidget from './elements/FillInTheBlanksQuestionWidget'
import CreateAssignment from './elements/CreateAssignment'
import CreateExam from './elements/CreateExam'

console.disableYellowBox = true;

class Home extends React.Component {

    static navigationOptions = {title: 'Home'}

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps={true}>
                <StatusBar barStyle="light-content" hidden={true}/>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.props.navigation
                        .navigate('CourseList')}>
                    <Text>
                        Course Manager ;)
                    </Text>
                </TouchableHighlight>

            </ScrollView>
        )
    }
}

const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    WidgetList,
    QuestionList,
    AssignmentWidget,
    TrueOrFalseQuestionWidget,
    MultipleChoiceQuestionWidget,
    EssayQuestionWidget,
    FillInTheBlanksQuestionWidget,
    CreateAssignment,
    CreateExam
});

export default App;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#ffc515',
        padding: 25,
        borderWidth: 2,
        borderColor: '#ff711a',
        margin: 20,
        marginTop: 200
    }
});
