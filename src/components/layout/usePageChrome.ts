import { useEffect } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { useAppShell } from './AppShellContext';

export function usePageChrome(opts: {
  title?: string;
  footer?: ComponentChildren | null;
  showBack?: boolean;
}) {
  const { setTitle, setFooter, setShowBack } = useAppShell();

  useEffect(() => {
    if (opts.title !== undefined) setTitle(opts.title);
    if (opts.footer !== undefined) setFooter(opts.footer);
    if (opts.showBack !== undefined) setShowBack(Boolean(opts.showBack));

    // optional cleanup: when page unmounts, clear footer/back
    return () => {
      if (opts.footer !== undefined) setFooter(null);
      if (opts.showBack !== undefined) setShowBack(false);
    };
  }, []);
}
