import inquirer from "inquirer";

interface ansType {
    mainMenu: string,
    stdMenu: string,
    teachMenu: string,
    courseMenu: string,
    name: string,
    course: string,
    again: string
}

let answers: ansType;
let answers1: ansType;


class School {
    students: Student[] = [];
    teachers: Teacher[] = [];
    courses: Course[] = [];

    constructor(public name: string) { }
    // Student Methods
    addStudent(stdObj: Student) {
        this.students.push(stdObj);
    }
    viewStudent() {
        if (this.students.length > 0) {
            console.log(this.students);
        }
        else {
            console.log("No Students Found, Add New.");

        }

    }

    addTeacher(teachObj: Teacher) {
        this.teachers.push(teachObj);
    }
    viewTeacher() {
        if (this.teachers.length > 0) {
            console.log(this.teachers);
        }
        else {
            console.log("No Techers Found, Add New.");

        }

    }

    addCourse(courseObj: Course) {
        this.courses.push(courseObj);
    }
    viewCourse() {
        if (this.courses.length > 0) {
            console.log(this.courses);
        }
        else {
            console.log("No Courses Found, Add New.");

        }

    }

}


class Student {
    constructor(public name: string, public course: string) { }
}

class Teacher {
    constructor(public name: string, public email: string, public course: string) {
    }
}

class Course {
    constructor(public name: string, public Fees: number) {
    }
}

let School1 = new School("My School");


async function mainMenu() {
    answers = await inquirer.prompt([{
        name: "mainMenu",
        type: "list",
        choices: ["Students", "Teachers", "Courses", "Exit"],
        message: "Select to Add and View.",
    },

    {
        name: "stdMenu",
        type: "list",
        choices: ["Add Student", "View Students"],
        message: "Select to Add and View.",
        when(answers) {
            return answers.mainMenu == "Students";
        }
    },

    {
        name: "teachMenu",
        type: "list",
        choices: ["Add Teacher", "View Teachers"],
        message: "Select to Add and View.",
        when(answers) {
            return answers.mainMenu == "Teachers";
        }
    },

    {
        name: "courseMenu",
        type: "list",
        choices: ["Add Course", "View Courses"],
        message: "Select to Add and View.",
        when(answers) {
            return answers.mainMenu == "Courses";
        }
    },

    ]);

    if (answers.mainMenu === "Students") {
        await stdFun();
    }
    else if (answers.mainMenu === "Teachers") {
        await teachFun();

    }

    else if (answers.mainMenu === "Courses") {
        await courseFun();
    }
    else {
        console.clear();
    }


}

mainMenu();

async function stdFun() {
    if (answers.stdMenu === "Add Student") {
        console.clear();
        do {
            let studResult = await inquirer.prompt([{
                name: "name",
                type: "input",
                message: "Enter Student Name:"
            },
            {
                name: "course",
                type: "input",
                message: "Enter Course:"

            }]);

            let std = new Student(studResult.name, studResult.course);
            School1.addStudent(std);

            answers1 = await inquirer.prompt({
                name: "again",
                type: "list",
                choices: ["Yes", "No"],
                message: "Add More Students "
            });

        }
        while (answers1.again == "Yes");
        console.clear();
        mainMenu();
    }

    else if (answers.stdMenu === "View Students") {
        console.clear();
        School1.viewStudent();
        mainMenu();

    }
}


async function teachFun() {
    if (answers.teachMenu === "Add Teacher") {
        console.clear();
        do {
            let teachanswers = await inquirer.prompt([{
                name: "name",
                type: "input",
                message: "Enter Teacher Name:"
            },
            {
                name: "email",
                type: "input",
                message: "Enter Email:"
            },
            {
                name: "course",
                type: "input",
                message: "Enter Course:"

            }]);

            let teach = new Teacher(teachanswers.name, teachanswers.email, teachanswers.course);
            School1.addTeacher(teach);

            answers1 = await inquirer.prompt({
                name: "again",
                type: "list",
                choices: ["Yes", "No"],
                message: "Add More Teachers "
            });

        }
        while (answers1.again == "Yes");
        console.clear();
        mainMenu();
    }

    else if (answers.teachMenu === "View Teachers") {
        console.clear();
        School1.viewTeacher();
        mainMenu();
    }}

async function courseFun() {
    if (answers.courseMenu === "Add Course") {
        console.clear();
        do {
            let courseanswers = await inquirer.prompt([{
                name: "name",
                type: "input",
                message: "Enter Course Title:"
            },
            {
                name: "fees",
                type: "number",
                message: "Enter Course Fees"
            }]);

            let course = new Course(courseanswers.name, courseanswers.fees);
            School1.addCourse(course);

            answers1 = await inquirer.prompt({
                name: "again",
                type: "list",
                choices: ["Yes", "No"],
                message: "Add More Courses "
            });

        }
        while (answers1.again == "Yes");
        console.clear();
        mainMenu();
    }

    else if (answers.courseMenu === "View Courses") {
        console.clear();
        School1.viewCourse();
        mainMenu();
    }}