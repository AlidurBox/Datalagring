import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProject from './pages/AddProject';
import ListProjects from './pages/ListProjects';
import EditProject from './pages/EditProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListProjects />} />
        <Route path="/add" element={<AddProject />} />
        <Route path="/edit/:id" element={<EditProject />} />
      </Routes>
    </Router>
  );
}

export default App;
