const http = require('http'); // import Node.js core module

const host = 'localhost'; // localhost
const port = 8000; //port number

//เมื่อเปิด เว็บไปที่ http://localhost:8000/ จะเรียกใช้งาน function ที่ชื่อว่า requireListener
const requireListener = function (req, res) {
    res.writeHead(200);
    res.end('My lol');
}

const server = http.createServer(requireListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});