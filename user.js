const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    await loadData()
}
const loadData = async () => {
    console.log('load user');
    //1. load user ทั้งหมด จาก api ที่เตรียมไว้
    const response = await axios.get(`${BASE_URL}/users`);
    console.log(response.data);

    const userDOM = document.getElementById('user');
    //2. นำ user ทั้งหมด โหลดกลับเข้าไปใน html

    let htmlData = '<div>'
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i]
        htmlData += `<div>
        ${user.id } ${user.firstname} ${user.lastname}
        <a href='main_work.html?id=${user.id}'><button >Edit</button></a>
        <button class = 'delete' data-id='${user.id}'>Delete</button>
        </div>`
    }
    htmlData += '</div>'
    userDOM.innerHTML = htmlData;

    //3. ลบ user 
    const deleteDOM = document.getElementsByClassName('delete'); //เข้สถึงบรรทัดที่ 20
    for (let i = 0; i < deleteDOM.length; i++) {
        deleteDOM[i].addEventListener('click', async (event) => {
            //ดึง id ของ user ที่ต้องการลบ
            const id = event.target.dataset.id
            try{
                await axios.delete(`${BASE_URL}/users/${id}`)
                loadData()// เรียกว่า recursive function คือการเรียก function ตัวเอง
            }catch(error){
                console.log('error',error)
            }
        })
    }
}