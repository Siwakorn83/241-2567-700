const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

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
    try{
        let user = req.body;
        const results = await conn.query('INSERT INTO user SET ? ', user)
        res.json({
            message: 'Create user successfully',
            data: results[0]
        })
    }catch(error){
        console.log('error',error.message)
        res.status(500).json({
            message: 'something went wrong',
            error: error.message
        })
    }
})

//path = GET /users สำหรับ id users รายคน
app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM user WHERE id = ?', id)
        if(results[0].length == 0){
            throw {statusCode: 404, message: 'User not found'}
        }
        res.json(results[0][0])

    } catch (error) {
        console.log('error', error.message)
        let statusCode = error.statusCode || 500
        res.status(500).json({
            message: 'something went wrong',
            error: error.message
        })
    }

});


//path PUT /user/:id ใช้สำหรับแก้ไขข้อมูล user ที่มี id ตามที่ระบุ
app.put('/users/:id', async(req, res) => {
    
    try{
        let id = req.params.id; 
        let updateUser = req.body;
        const results = await conn.query
            ('UPDATE  user SET ? WHERE id = ?', 
                [updateUser, id])
        res.json({
            message: 'Update user successfully',
            data: results[0]
        })
    }catch(error){
        console.log('error',error.message)
        res.status(500).json({
            message: 'something went wrong',
            error: error.message
        })
    }
})

//path DELETE /user/:id ใช้สำหรับลบข้อมูล user ที่มี id ตามที่ระบุ
app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('DELETE FROM user WHERE id = ?', parseInt(id))
        res.json({
            message: 'DELETE user successfully',
            data: results[0]
        })
    } catch (error) {
        console.log('error', error.message)
        res.status(500).json({
            message: 'something went wrong',
            error: error.message
        })
    }
});


app.listen(port, async (req, res) => {
    await initMySQL()
    console.log('Http Server is running on port ' + port);
});