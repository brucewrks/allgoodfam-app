import { useEffect } from 'preact/hooks';
import { useNavigate } from 'react-router-dom';
import PushSetup from '@/components/push/PushSetup';
import { clearToken, getToken } from '@/util/auth';

export default function DashboardPage() {
  const nav = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (!token) nav('/login');
  }, [token]);

  if (!token) return null;

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: 16 }}>
      <h1>AllGoodFam</h1>
      <p>You’re logged in.</p>

      <PushSetup token={token} />

      <button
        onClick={() => {
          clearToken();
          nav('/login');
        }}
        style={{ marginTop: 24, padding: '10px 12px' }}
      >
        Log out
      </button>
    </div>
  );
}
