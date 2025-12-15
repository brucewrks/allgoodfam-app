import { usePageLayout } from '@/components/layout/usePageLayout';
import CheckInFooter from '@/components/footer/CheckInFooter';

import styles from './Groups.module.css';

export default function DashboardPage() {
  usePageLayout({
    title: 'Your Groups',
    showBack: false,
    footer: <CheckInFooter />,
  });

  return (
    <div aria-role="button">
      <div className={styles.group}>
        <strong>The Big Fam</strong>
        <p>No new messages.</p>
      </div>

      <div style={{ margin: '1em 0' }}>- OR -</div>

      <button>Create a Group</button>
    </div>
  );
}
