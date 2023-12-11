import PocketBase from 'pocketbase';
import DbUser from '../models/users.js';
import eventsource from 'eventsource';

global.EventSource = eventsource;

const pb = new PocketBase('http://127.0.0.1:8090');

async function getUser(email) {
    const user = await DbUser.findOne({ email: email })
    console.log(user);
    return user
}

async function hasAdmin() {
    const records = await pb.collection('user').getList(1, 50, {
        filter: 'roles = \'["user","admin"]\' ',
    });

    const nbAdmins = records.totalItems

    return nbAdmins > 0
}

async function addUser(user) {
    let dbUser = new DbUser(user)
    await dbUser.save()
}

export { getUser, addUser,hasAdmin, }