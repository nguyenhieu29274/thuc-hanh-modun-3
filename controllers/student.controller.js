const BaseController = require("../controllers/BaseController");
let idStudent = 0;
class StudentController {
    static async showStudentList(req,res){
        let dataHTML = await BaseController.getTemplate("./views/studentList.html");
        const sqlShowStudents = `SELECT * FROM students;`;
        let students = await BaseController.querySQL(sqlShowStudents);
        let html = "";

        students.forEach((student, index) => {
            html += "<tr>";
            html += `<td>${index + 1}</td>`;
            html += `<td><a class="text-decoration-none" href="/student?id=${student.ID}">${student.studentName}</a></td>`;
            html += `<td>${student.class}</td>`;
            html += `<td>${student.evaluate}</td>`;
            html += `<td><a class="btn btn-danger" href="/delete?id=${student.studentID}">Delete</a></td>`;
            html += `<td><a class="btn btn-primary" href="/edit?id=${student.studentID}">Edit</a></td>`;
            html += "</tr>";
        });
        res.writeHead(200, { "Content-type": "text/html" });
        dataHTML = dataHTML.replace("{student-list}", html);
        res.write(dataHTML);
        res.end();
    }

    static async showStudent(req, res, urlParse) {
        let idStudentShow = qs.parse(urlParse.query).id;
        idStudent = idStudentShow;
        let studentHTML = await BaseController.getTemplate("./views/student.html");
        res.writeHead(200, { "Content-type": "text/html" });
        let  sqlShowStudents = `SELECT * FROM students;`;
        let students = await BaseController.querySQL(sqlShowStudents);
        studentHTML = studentHTML.replace("{studentID}", students[0].studentID);
        studentHTML = studentHTML.replace("{name}", students[0].studentName);
        studentHTML = studentHTML.replace("{class}", students[0].class);
        studentHTML = studentHTML.replace("{theo-mark}", students[0].theoreticalMark);
        studentHTML = studentHTML.replace("{pract-mark}", students[0].practiceMark);
        studentHTML = studentHTML.replace("{eval}", students[0].evaluate);
        studentHTML = studentHTML.replace("{descript}", students[0].description);
        res.write(studentHTML);
        res.end();
    }

    static async showAddPage(req,res){
        let dataHTML = await BaseController.getTemplate("./views/add.html");
        res.writeHead(200, { "Content-type": "text/html" });
        res.write(dataHTML);
        res.end();
    }
    static async deleteStudent(req, res, urlParse) {
        let idDelete = qs.parse(urlParse.query).index;
        idStudent = idDelete;
        const sqlDelete = `DELETE FROM students WHERE studentID = ${idDelete}`;
        await BaseController.querySQL(sqlDelete);
        res.writeHead(301, { Location: "/" });
        res.end();
    }
}
module.exports = StudentController;