import styles from './CheckInFooter.module.css';

export default function CheckInFooter({ onPress }: { onPress: () => void }) {
  return (
    <button className={styles.btn} onClick={onPress}>
      I’m here ✅
    </button>
  );
}
