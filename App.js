import React from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, TouchableHighlight} from 'react-native';
import TrueOrFalseQuestionWidget from './elements/TrueOrFalseQuestionWidget'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import {createStackNavigator} from 'react-navigation'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import Assignment from './components/Assignment'
import EssayQuestionWidget from './elements/EssayQuestionWidget'
import FillQuestionEditor from './elements/FillQuestionEditor'
import CreateAssignment from './components/CreateAssignment'
import CreateExam from './components/CreateExam'
import FixedHeader from './elements/FixedHeader'


class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView>
                {/*<StatusBar barStyle="light-content" hidden={true}/>*/}
                {/*<FixedHeader/>*/}

                {/*<Button title="Courses"*/}
                        {/*onPress={() => this.props.navigation*/}
                            {/*.navigate('CourseList')}/>*/}

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
    Assignment,
    TrueOrFalseQuestionWidget,
    MultipleChoiceQuestionEditor,
    EssayQuestionWidget,
    FillQuestionEditor,
    CreateAssignment,
    CreateExam
});

export default App;

const styles = StyleSheet.create({
    container: {
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
        margin: 20,
        marginTop: 200
    }
});
