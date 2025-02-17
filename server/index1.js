const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();

const port = 8000;

app.use(bodyParser.json());

let users = []

let conn = null

const initMySQL = async () => {
     conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8830
    })
}

/*
app.get('/testdbnew',async (req, res) => {
    try{
        const results = await conn.query('SELECT * FROM user')
        res.json(results[0])
    }catch(error){
        console.log('error',error.message)
        res.status(500).json({error: 'Error fetching users'})
    } 

  
})
    */
/*
Get /users สำหรับ get users ทั้งหมดที่มบันทึกไว้
POST  /users สำหรับสร้าง users ใหม่บันทึกไเข้าไป
GET /users/:id สำหรับดึง users รายตนออกมา
PUT /users/:id สำหรับแก้ไข users รายตน(ตาม id ที่บันทึกเข้าไป)
DELETE /users/:id สำหรับแก้ไข users รายตน(ตาม id ที่บันทึกเข้าไป)
*/

//path = GET /users สำหรับ get users ทั้งหมดที่มบันทึกไว้
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM user')
    res.json(results[0])
});
 
//path POST  /users สำหรับสร้าง users ใหม่บันทึกไเข้าไป
app.post('/users', async (req, res) => {
    let user = req.body;
    const results = await conn.query('INSERT INTO user SET ? ', user)
    console.log('results', results)
    res.json({
        message: 'Create user successfully',
        data: results[0]
    })
})

//path = GET /users สำหรับ id users รายคน
app.get('/users/:id', (req, res) => {
    let id = req.params.id;
   //ค้นหา users หรือ index ที่ต้องการดึงข้อมูล
   let selectedIndex = users.findIndex(user => user.id == id)
     
    res.json(users[selectedIndex]);
 });


//path PUT /user/:id ใช้สำหรับแก้ไขข้อมูล user ที่มี id ตามที่ระบุ
app.put('/users/:id', (req, res) => {
    let id = req.params.id; 
    let updateUser = req.body;
    // ค้นหา user ที่ต้องการแก้ไข
    let selectedIndex = users.findIndex(user => user.id == id)
    
        users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
        users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
        users[selectedIndex].age = updateUser.age || users[selectedIndex].age
        users[selectedIndex].gender = updateUser.gender || users[selectedIndex].gender
    


    res.json({
        message: 'Update user successfully',
        data:{
            user: updateUser,
            indexUpdated: selectedIndex
        }
    })
    res.send(id);
    
    // users ที่ update ใหม่ update กลับไปเก็บไว้ใน users ตัวเดิม
})

    //path DELETE /user/:id ใช้สำหรับลบข้อมูล user ที่มี id ตามที่ระบุ
    app.delete('/users/:id', (req, res) => {
    let id = req.params.id;
    //หา index ของ user ที่ต้องการลบ
    let selectedIndex = users.findIndex(user => user.id == id)

    //ลบ user ที่หาเจอ
    users.splice[selectedIndex, 1] //ลบข้อมูลที่อยู่ใน index ที่เราต้องการลบ
        res.json({
            message: 'Delete user successfully',
            indexDeleted: selectedIndex 
        })
    })
app.listen(port, async (req, res) => {
    await initMySQL()
    console.log('Http Server is running on port ' + port);
});