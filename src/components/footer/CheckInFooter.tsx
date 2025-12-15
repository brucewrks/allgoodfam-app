import styles from './CheckInFooter.module.css';

export default function CheckInFooter() {
  function tryCheckIn() {
    //
  }

  return (
    <button className={styles.btn} onClick={tryCheckIn}>
      I’m here ✅
    </button>
  );
}
