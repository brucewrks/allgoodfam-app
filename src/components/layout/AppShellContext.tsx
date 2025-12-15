import { createContext } from 'preact';
import { useContext, useMemo, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';

export type FooterSlot = ComponentChildren | null;

type ShellState = {
  title: string;
  setTitle: (t: string) => void;

  footer: FooterSlot;
  setFooter: (f: FooterSlot) => void;

  // Optional: show back button, etc.
  showBack: boolean;
  setShowBack: (v: boolean) => void;
};

const Ctx = createContext<ShellState | null>(null);

export function AppShellProvider({ children }: { children: ComponentChildren }) {
  const [title, setTitle] = useState('AllGoodFam');
  const [footer, setFooter] = useState<FooterSlot>(null);
  const [showBack, setShowBack] = useState(false);

  const value = useMemo(
    () => ({ title, setTitle, footer, setFooter, showBack, setShowBack }),
    [title, footer, showBack]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppShell() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppShell must be used within AppShellProvider');
  return v;
}
