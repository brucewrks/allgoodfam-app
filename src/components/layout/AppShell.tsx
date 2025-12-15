import type { ComponentChildren } from 'preact';
import { useNavigate } from 'react-router-dom';
import { useAppShell } from './AppShellContext';
import styles from './AppShell.module.css';

export default function AppShell({ children }: { children: ComponentChildren }) {
  const nav = useNavigate();
  const { title, footer, showBack } = useAppShell();

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

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>{footer}</div>
      </footer>
    </div>
  );
}
