import { useAuth } from '../context/AuthContext';
import ResumeUpload from './ResumeUpload';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2>Welcome, {user?.name}!</h2>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
      <hr />
      <ResumeUpload />
    </div>
  );
}

export default Dashboard;
