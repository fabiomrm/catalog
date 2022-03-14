import { Navbar } from './Navbar';
import './styles.css';

export const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <h1>CONTEÚDO</h1>
      </div>
    </div>
  );
};
