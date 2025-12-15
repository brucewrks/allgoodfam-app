import type { ComponentChildren } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useNavigate } from 'react-router-dom';

import { VAPID_PUBLIC_KEY } from '@/config';
import { subscribeToPush } from '@/util/push';
import { api } from '@/util/api';

import { useAppShell } from './AppShellContext';
import styles from './AppShell.module.css';

async function subscribeNotifications(token: string) {
  try {
    const sub = await subscribeToPush(VAPID_PUBLIC_KEY);
    await api('/push/subscribe', { method: 'POST', token, body: sub });
  } catch (e: any) {
    //
  }
}

export default function AppShell({ children }: { children: ComponentChildren }) {
  const nav = useNavigate();
  const { title, footer, showBack, session } = useAppShell();
  const [hasNotifications, setHasNotifications] = useState(true);

  if (!session.token) {
    nav('/login');
  }

  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'notifications' })
        .then((status) => {
          if (status.state === 'granted') setHasNotifications(true);
          else setHasNotifications(false);

          status.onchange = () => {
            if (status.state === 'granted') setHasNotifications(true);
            else setHasNotifications(false);
          };
        });
    }
  }, [title, footer, showBack]);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          {showBack ? (
            <button className={styles.backBtn} onClick={() => nav(-1)} aria-label='Back'>
              ←
            </button>
          ) : (
            <div style={{ width: 36 }} />
          )}
        </div>

        <div className={styles.headerTitle}>{title}</div>

        <div className={styles.headerRight}>
          <div style={{ width: 36 }} />
        </div>
      </header>

      {!hasNotifications && (
        <div className={styles.notice}>
          <a href='javascript:void' onClick={() => subscribeNotifications(session.token!)}>Click here</a> to get notifications.
        </div>
      )}

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>{footer}</div>
      </footer>

      { /* Forces the container to be as wide as allowed. */ }
      <div style={{ width: '100vw' }} />
    </div>
  );
}
