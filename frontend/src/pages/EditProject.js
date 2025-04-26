import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProject.css';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    projectNumber: '',
    name: '',
    startDate: '',
    endDate: '',
    projectManager: '',
    customer: '',
    service: '',
    totalPrice: '',
    status: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5050/api/project/${id}`)
      .then(res => {
        const p = res.data;
        setForm({
          ...p,
          totalPrice: p.totalPrice,
          startDate: p.startDate.split('T')[0],
          endDate: p.endDate.split('T')[0]
        });
      })
      .catch(err => {
        alert('Kunde inte hämta projektet.');
        console.error(err);
      });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      ...form,
      totalPrice: parseFloat(form.totalPrice)
    };

    axios.put(`http://localhost:5050/api/project/${id}`, payload, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        alert('Projektet uppdaterades!');
        navigate('/');
      })
      .catch(err => {
        alert('Något gick fel vid uppdatering');
        console.error(err);
      });
  };

  return (
    <div className="project-form-container">
      <div className="project-form-header">
        <h2>{form.projectNumber} – Redigera projekt</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Projektnr</label>
          <input type="text" value={form.projectNumber} disabled />
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
            <input name="service" value={form.service} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Totalpris</label>
            <input name="totalPrice" type="number" value={form.totalPrice} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')}>Avbryt</button>
          <button type="submit">Spara ändringar</button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
