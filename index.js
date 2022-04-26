const serviceAccount = require('./apiKey.json');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const express = require('express')
const app = express()
const port = 3000
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();


async function getUsers(res){
    let usuarios = []
    const users = await db.collection('users').get();
    users.forEach((user) => {
      let objeto = {"id" : user.id, "informacion" : user.data()}
      usuarios[user.id] = 
      usuarios.push(objeto)
    });
    res.send(usuarios)
}

app.get('/', (req, res) => {
    getUsers(res)
})

app.listen(port, () => {
    console.log(`running on root http://localhost:${port}`)
})