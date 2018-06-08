import 'es6-symbol/implement';

const FILL_URL = "http://s-arram-java-native.herokuapp.com/api/EID/fill"
const FILL_DELETE_URL = "http://s-arram-java-native.herokuapp.com/api/fill/QID"

let _singleton = Symbol();

export default class FillInTheBlanksQuestionService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
        this.createFillQuestion = this.createFillQuestion.bind(this);
        this.deleteFillQuestion = this.deleteFillQuestion.bind(this);
    }

    createFillQuestion(examId, fill) {
        console.log(examId);
        console.log(fill);
        var json_body = JSON.stringify(fill);
        fetch(FILL_URL.replace('EID', examId), {
            body: json_body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => {return response.json()})
    }

    deleteFillQuestion(questionId) {
        console.log(questionId);
        var url = FILL_DELETE_URL.replace('QID', questionId);
        console.log(url);
        fetch(url, {
            method: 'DELETE'
        })
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FillInTheBlanksQuestionService(_singleton);
        return this[_singleton]
    }
}