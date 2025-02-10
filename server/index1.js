const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8000;

app.use(bodyParser.json());

let users = []
let counter = 1

/*
Get /users สำหรับ get users ทั้งหมดที่มบันทึกไว้
POST  /users สำหรับสร้าง users ใหม่บันทึกไเข้าไป
GET /users/:id สำหรับดึง users รายตนออกมา
PUT /users/:id สำหรับแก้ไข users รายตน(ตาม id ที่บันทึกเข้าไป)
DELETE /users/:id สำหรับแก้ไข users รายตน(ตาม id ที่บันทึกเข้าไป)
*/

//path = GET /users สำหรับ get users ทั้งหมดที่มบันทึกไว้
app.get('/users', (req, res) => {
   res.json(users);

});
 
//path POST  /users สำหรับสร้าง users ใหม่บันทึกไเข้าไป
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter
    counter += 1
    users.push(user);
    res.json({
        message: 'Create new user successfully',
        user: user
    });
    
})
//path PUT /user/:id ใช้สำหรับแก้ไขข้อมูล user ที่มี id ตามที่ระบุ
app.put('/user/:id', (req, res) => {
    let id = req.params.id; 
    let updateUser = req.body;
    // ค้นหา user ที่ต้องการแก้ไข
    let selectedIndex = users.findIndex(user => user.id == id)

    // แก้ไขข้อมูล users ที่หาเจอ
    if(updateUser.firstname){
        users[selectedIndex].firstname = updateUser.firstname 
    }
    if(updateUser.lastname){
        users[selectedIndex].lastname = updateUser.lastname 
    }


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
    app.delete('/user/:id', (req, res) => {
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
app.listen(port, (req, res) => {
    console.log('Http Server is running on port ' + port);
});