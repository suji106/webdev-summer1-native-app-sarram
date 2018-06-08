import 'es6-symbol/implement';

const ESSAY_URL = "http://s-arram-java-native.herokuapp.com/api/EID/essay"
const ESSAY_DELETE_URL = "http://s-arram-java-native.herokuapp.com/api/essay/QID"

let _singleton = Symbol();

export default class EssayQuestionService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
        this.createEssay = this.createEssay.bind(this);
        this.updateEssay = this.updateEssay.bind(this);
        this.deleteEssayQuestion = this.deleteEssayQuestion.bind(this);
    }

    createEssay(examId, essay) {
        console.log(essay);
        var json_body = JSON.stringify(essay);
        fetch(ESSAY_URL.replace('EID', examId), {
            body: json_body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => {return response.json()})
    }

    updateEssay(examId, essay) {
        console.log(essay);
        var json_body = JSON.stringify(essay);
        fetch(ESSAY_URL.replace('EID', examId), {
            body: json_body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
            .then(response => {return response.json()})
    }

    deleteEssayQuestion(questionId) {
        console.log(questionId);
        fetch(ESSAY_DELETE_URL.replace('QID', questionId), {
            method: 'DELETE'
        })
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new EssayQuestionService(_singleton);
        return this[_singleton]
    }
}