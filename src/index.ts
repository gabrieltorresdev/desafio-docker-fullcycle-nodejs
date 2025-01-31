import express from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

app.get('/', async (req: express.Request, res: express.Response) => {
    await prisma.person.create({
        data: {
            name: `Person ${Math.random()}`,
        },
    });

    const people = await prisma.person.findMany();
    
    res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ul>
            ${people.map((person) => `<li>${person.name}</li>`).join('')}
        </ul>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});