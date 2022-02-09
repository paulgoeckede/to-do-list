export default class todo {
    constructor(descr, priority = 0, due = null, checklist = [], note = null) {
        this.descr = descr;
        this.priority = priority;
        this.due = due;
        this.note = note;
        this.checklist = checklist;
    }
}
