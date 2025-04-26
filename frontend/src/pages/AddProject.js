import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProject.css';

const AddProject = () => {
  const [form, setForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    projectManager: '',
    customer: '',
    service: '',
    totalPrice: '',
    status: 'Ej påbörjat'
  });

  const [newProjectNumber, setNewProjectNumber] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5050/api/project')
      .then(res => {
        const latest = res.data.sort((a, b) => b.projectNumber.localeCompare(a.projectNumber))[0];
        if (latest && latest.projectNumber) {
          const num = parseInt(latest.projectNumber.replace('P-', '')) + 1;
          setNewProjectNumber(`P-${num}`);
        } else {
          setNewProjectNumber('P-101');
        }
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      ...form,
      totalPrice: parseFloat(form.totalPrice || '0')
    };

    axios.post('http://localhost:5050/api/project', payload, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        alert('Projektet sparades!');
        setForm({
          name: '',
          startDate: '',
          endDate: '',
          projectManager: '',
          customer: '',
          service: '',
          totalPrice: '',
          status: 'Ej påbörjat'
        });
      })
      .catch(err => {
        console.error('Fel vid skapande:', err);
        alert('Något gick fel');
      });
  };

  return (
    <div className="project-form-container">
      <div className="project-form-header">
        <h2>{newProjectNumber} – Skapa nytt</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Projektnr</label>
          <input type="text" value={newProjectNumber} disabled />
        </div>
        <div className="form-group">
          <label>Benämning</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Startdatum</label>
            <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Slutdatum</label>
            <input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Ej påbörjat">Ej påbörjat</option>
              <option value="Pågående">Pågående</option>
              <option value="Avslutat">Avslutat</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Projektledare</label>
            <input name="projectManager" value={form.projectManager} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Kund</label>
            <input name="customer" value={form.customer} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Tjänst</label>
            <input name="service" placeholder="T.ex. konsult 1000 kr/tim" value={form.service} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Totalpris</label>
            <input name="totalPrice" type="number" value={form.totalPrice} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => window.location.href = '/'}>Avbryt</button>
          <button type="submit">Spara</button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
