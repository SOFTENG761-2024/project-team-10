const express = require("express");

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/test-connection', async (req, res) => {
      try {
         await prisma.$connect();
         res.send('Connection successful');
       } catch (error) {
         console.error('Error connecting to the database:', error);
         res.status(500).send('Error connecting to the database');
       } 
    });

app.get('/users', async (req, res) => {

   const users = await prisma.user.findMany();
  if (users === null)
  {
    console.log("Database error");
  }
  
  if (users.length === 0) {
    res.send('No users found in database');
  } else {
    res.json(users);
  } 
});

app.post('/users', async (req, res) => {
    const { name, institution, email } = req.body;
    console.log(req.body);
  
    if (!name || !institution || !email) {
      return res.status(400).json(
        { error: 'All fields are required' });
    }
  
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          institution,
          email,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error});
    }
  });
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//module.exports = app;