//define a class called SleepInsight that has title, grade and description as attributes and getters and setters for them

class SleepInsight {
    constructor(title, grade, description) {
        this.title = title;
        this.grade = grade;
        this.description = description;
    }

    get_title() {
        return this.title;
    }

    get_grade() {
        return this.grade;
    }

    get_description() {
        return this.description;
    }

    set_title(title) {
        this.title = title;
    }

    set_grade(grade) {
        this.grade = grade;
    }

    set_description(description) {
        this.description = description;
    }
}