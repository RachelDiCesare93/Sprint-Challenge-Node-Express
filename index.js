const express = require('express');
const server = express();

const actionRoutes = require('./actions/actionRoutes.js')
const projectRoutes = require('./projects/projectRoutes.js')






server.use(express.json());


server.use('/actions', actionRoutes);
server.use('/projects', projectRoutes);

server.get('/', (req, res) => {
    res.send('Everyday should be friday');
})



server.listen(7000, () => console.log('\n== API on port 7k ==\n'));

