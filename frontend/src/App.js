import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [employees, setEmployees] = useState([]);

  // Fetch employees from Backend
  const fetchEmployees = async () => {
    const res = await fetch('http://localhost:5001/employees');
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => { fetchEmployees(); }, []);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role }),
    });
    setName(''); setRole('');
    fetchEmployees(); // Refresh list
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Employee Registration (PoC)</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
        <button type="submit">Register</button>
      </form>

      <h2>Employee List</h2>
      <ul>
        {employees.map((emp, i) => (
          <li key={i}>{emp.name} - {emp.role}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
