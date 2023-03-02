import styles from "../styles/about.module.css";
import Image from "next/image";

export default function About({ about }: { about: string }) {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.content}>
        <div>
          <h1>Hello there</h1>
          <Image
            src="/alexx855_aipunk_avatar_2023.png"
            alt="Alex Pedersen ai punk avatar"
            width={125}
            height={125}
            priority
          />
        </div>
        <p>{about}</p>
      </div>
    </section>
  );
}