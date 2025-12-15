import { useRef } from 'preact/hooks';
import styles from './GroupFooter.module.css';

export default function GroupFooter(props: {
  onSend: (text: string) => void;
  onUpload: (file: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.row}>
      <button
        className={styles.iconBtn}
        onClick={() => fileRef.current?.click()}
        aria-label='Upload'
      >
        ＋
      </button>

      <input
        ref={fileRef}
        type='file'
        accept='image/*'
        hidden
        onChange={(e) => {
          const file = e.currentTarget.files?.[0];
          if (file) props.onUpload(file);
          e.currentTarget.value = '';
        }}
      />

      <input ref={textRef} className={styles.text} placeholder='Message…' />

      <button
        className={styles.sendBtn}
        onClick={() => {
          const t = textRef.current?.value?.trim();
          if (!t) return;
          props.onSend(t);
          if (textRef.current) textRef.current.value = '';
        }}
      >
        Send
      </button>
    </div>
  );
}
