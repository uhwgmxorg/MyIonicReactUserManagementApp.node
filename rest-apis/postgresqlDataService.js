// postgresqlDataService.js
const { PrismaClient } = require('@prisma/client');
const config = require('./config.js');

const prisma = new PrismaClient({
    datasources: {
      db: {
        url: config.dburl,
      },
    },
  });

async function postgresqlGetAllUsers() {
    const users = await prisma.users.findMany({
        orderBy: {
            id: 'asc', // or 'desc'
        },
    });
    return users;
}

async function postgresqlGetUsersById(id) {
    const user = await prisma.users.findUnique({
        where: { id: Number(id) }
    });
    return user;
}

async function postgresqlCreateNewUser(username, email, password) {
    const user = await prisma.users.create({
        data: { username, email, password }
    });
    return user;
}

async function postgresqlUpdateExistingUser(id, username, email, password) {
    const user = await prisma.users.update({
        where: { id: Number(id) },
        data: { username, email, password }
    });
    return user;
}

async function postgresqlDeleteExistingUser(id) {
    await prisma.users.delete({
        where: { id: Number(id) }
    });
}

module.exports = {
    postgresqlGetAllUsers,
    postgresqlGetUsersById,
    postgresqlCreateNewUser,
    postgresqlUpdateExistingUser,
    postgresqlDeleteExistingUser
};