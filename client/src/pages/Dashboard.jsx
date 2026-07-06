import { useAuth } from '../context/AuthContext';
import ResumeUpload from './ResumeUpload';
import GenerateInterview from './GenerateInterview';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2>Welcome, {user?.name}!</h2>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>

      <hr style={{ margin: '20px 0' }} />

      <ResumeUpload />

      <hr style={{ margin: '20px 0' }} />

      <GenerateInterview />
    </div>
  );
}

export default Dashboard;
