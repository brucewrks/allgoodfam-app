import { createContext } from 'preact';
import { useContext, useEffect, useMemo, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';

import { getToken } from '@/util/auth';

export type FooterSlot = ComponentChildren | null;

type Session = {
  token: string|undefined;
};

type ShellState = {
  title: string;
  setTitle: (t: string) => void;

  footer: FooterSlot;
  setFooter: (f: FooterSlot) => void;

  // Optional: show back button, etc.
  showBack: boolean;
  setShowBack: (v: boolean) => void;

  session: Session;
};

const Ctx = createContext<ShellState | null>(null);

export function AppShellProvider({ children }: { children: ComponentChildren }) {
  const [title, setTitle] = useState('AllGoodFam');
  const [footer, setFooter] = useState<FooterSlot>(null);
  const [showBack, setShowBack] = useState(false);
  const [session, setSession] = useState({ token: getToken() });

  useEffect(() => {
    setSession({ token: getToken() });
  }, [title, footer, showBack]);

  const value = useMemo(
    () => ({ title, setTitle, footer, setFooter, showBack, setShowBack, session }),
    [title, footer, showBack, session]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppShell() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppShell must be used within AppShellProvider');
  return v;
}
