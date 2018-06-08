import 'es6-symbol/implement';

const ASSG_URL = "http://s-arram-java-native.herokuapp.com/api/lesson/LID/assignment"
const ASSG_DELETE_URL = "http://s-arram-java-native.herokuapp.com/api/assignment/"

let _singleton = Symbol();

export default class AssignmentService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    updateAssignment(lessonId, assignment) {
        console.log(assignment);
        var json_body = JSON.stringify(assignment);
        fetch(ASSG_URL.replace('LID', lessonId), {
            body: json_body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
            .then(response => {return response.json()})
    }

    deleteAssignment(assignmentId) {
        return fetch(ASSG_DELETE_URL + '/' + assignmentId, {
            method: 'delete'
        });
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }
}