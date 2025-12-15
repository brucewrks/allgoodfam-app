import { useEffect } from 'preact/hooks';
import PushSetup from '@/components/push/PushSetup';
import { usePageChrome } from '@/components/layout/usePageChrome';
import CheckInFooter from '@/components/footer/CheckInFooter';

export default function DashboardPage() {
  usePageChrome({
    title: 'Your Groups',
    showBack: false,
    footer: <CheckInFooter onPress={() => alert('Hi')} />
  })

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: 16 }}>
      <h1>AllGoodFam</h1>
      <p>You’re logged in.</p>
    </div>
  );
}
