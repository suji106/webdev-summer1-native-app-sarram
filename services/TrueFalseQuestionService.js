import 'es6-symbol/implement';

const TRUE_FALSE_URL = "http://s-arram-java-native.herokuapp.com/api/EID/truefalse"
const TRUE_FALSE_DELETE_URL = "http://s-arram-java-native.herokuapp.com/api/truefalse/QID"

let _singleton = Symbol();

export default class TrueFalseQuestionService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
        this.createTrueFalse = this.createTrueFalse.bind(this);
        this.deleteTrueFalseQuestion = this.deleteTrueFalseQuestion.bind(this);
    }

    createTrueFalse(examId, trueFalse) {
        console.log(examId);
        console.log(trueFalse);
        var json_body = JSON.stringify(trueFalse);
        fetch(TRUE_FALSE_URL.replace('EID', examId), {
            body: json_body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => {return response.json()})
    }

    deleteTrueFalseQuestion(questionId) {
        console.log(questionId);
        var url = TRUE_FALSE_DELETE_URL.replace('QID', questionId);
        console.log(url);
        fetch(url, {
            method: 'DELETE'
        })
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TrueFalseQuestionService(_singleton);
        return this[_singleton]
    }
}