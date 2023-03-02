import { DownIcon } from "./down-icon";
import styles from "../styles/scroll-button.module.css";

export default function ScrollButton({ onClick }: { onClick: () => void }) {
  return (
    <>
      <button
        onClick={onClick}
        className={styles.button}
      >
        <span className="sr-only">Scroll down</span>
        <DownIcon />
      </button>
    </>
  )
}