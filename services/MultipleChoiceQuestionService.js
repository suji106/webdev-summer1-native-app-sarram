import 'es6-symbol/implement';

const MULTI_URL = "http://s-arram-java-native.herokuapp.com/api/EID/multi"
const MULTI_DELETE_URL = "http://s-arram-java-native.herokuapp.com/api/multi/QID"

let _singleton = Symbol();

export default class MultipleChoiceQuestionService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
        this.createMultiQuestion = this.createMultiQuestion.bind(this);
        this.deleteMultiQuestion = this.deleteMultiQuestion.bind(this);
    }

    createMultiQuestion(examId, multi) {
        console.log(examId);
        console.log(multi);
        var json_body = JSON.stringify(multi);
        fetch(MULTI_URL.replace('EID', examId), {
            body: json_body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => {return response.json()})
    }

    deleteMultiQuestion(questionId) {
        console.log(questionId);
        var url = MULTI_DELETE_URL.replace('QID', questionId);
        console.log(url);
        fetch(url, {
            method: 'DELETE'
        })
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new MultipleChoiceQuestionService(_singleton);
        return this[_singleton]
    }
}