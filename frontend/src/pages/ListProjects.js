import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListProjects.css';

const ListProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5050/api/project')
      .then(res => setProjects(res.data))
      .catch(err => console.error('Kunde inte hämta projekt:', err));
  }, []);

  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <h2>Projektlista</h2>
        <button onClick={() => window.location.href = '/add'}>+ Skapa nytt projekt</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Projektnummer</th>
            <th>Benämning</th>
            <th>Startdatum</th>
            <th>Slutdatum</th>
            <th>Status</th>
            <th>Redigera</th>
            <th>Ta bort</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.projectNumber}>
              <td>{p.projectNumber}</td>
              <td>{p.name}</td>
              <td>{p.startDate?.split('T')[0]}</td>
              <td>{p.endDate?.split('T')[0]}</td>
              <td>{p.status}</td>
              <td>
                <button onClick={() => window.location.href = `/edit/${p.projectNumber}`}>Redigera</button>
              </td>
              <td>
  <button
    onClick={() => {
      if (window.confirm(`Vill du verkligen radera ${p.projectNumber}?`)) {
        axios.delete(`http://localhost:5050/api/project/${p.projectNumber}`)
          .then(() => {
            alert('Projekt raderat!');
            setProjects(prev => prev.filter(proj => proj.projectNumber !== p.projectNumber));
          })
          .catch(err => {
            alert('Kunde inte radera.');
            console.error(err);
          });
      }
    }}
    style={{ backgroundColor: 'darkred' }}
  >
    Ta bort
  </button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProjects;
