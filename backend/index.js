const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (using the service name 'db' from docker-compose)
mongoose.connect('mongodb://db:27017/employees', { useNewUrlParser: true });

const Employee = mongoose.model('Employee', { name: String, role: String });

app.post('/register', async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.send({ message: "Employee Registered!" });
});

app.get('/employees', async (req, res) => {
  const list = await Employee.find();
  res.send(list);
});

app.listen(5001, () => console.log("Backend running on port 5001"));
