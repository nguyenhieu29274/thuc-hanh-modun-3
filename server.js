const http = require("http");
const url = require("url");
const HOST = 8000;

const StudentController = require("./controllers/student.controller");

const server = http.createServer((req, res) => {
    const urlParse = url.parse(req.url);
    switch (urlParse.pathname) {
        case "/":
            StudentController.showStudentList(req, res);
            break;
        case "/student":
            StudentController.showStudent(req, res, urlParse);
            break;
        case "/add":
            if(req.method === "GET"){
                StudentController.showAddPage(req, res);
            }
            break;
        default:
            res.write(" 404 Not found");
            res.end();
            break;
    }

})
server.listen(HOST,'localhost',() => {
    console.log('server running on port' +  HOST);
});