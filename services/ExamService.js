import 'es6-symbol/implement';

const EXAM_URL = "http://s-arram-java-native.herokuapp.com/api/lesson/LID/exam"
const EXAM_DELETE_URL = "http://s-arram-java-native.herokuapp.com/api/exam/"

let _singleton = Symbol();

export default class ExamService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');

        this.createExam = this.createExam.bind(this);
        this.updateExam = this.updateExam.bind(this);
    }

    createExam(lessonId, exam) {
        console.log('creatingExamService');
        console.log(exam);
        console.log(lessonId);
        var json_body = JSON.stringify(exam);
        fetch(EXAM_URL.replace('LID', lessonId), {
            body: json_body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => {return response.json()})
    }

    updateExam(lessonId, exam) {
        console.log(exam);
        var json_body = JSON.stringify(exam);
        fetch(EXAM_URL.replace('LID', lessonId), {
            body: json_body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
            .then(response => {return response.json()})
    }

    deleteExam(examId) {
        console.log(examId);
        fetch(EXAM_DELETE_URL + examId, {
            method: 'DELETE'
        })
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }
}