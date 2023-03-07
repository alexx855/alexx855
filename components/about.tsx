import styles from "../styles/about.module.css";
import Image from "next/image";

export default function About({ children }: { children: React.ReactNode }) {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.content}>
        <Image
          // src="/alexx855_aipunk_avatar_bg_2023.jpg"
          // src="/alexx855_aipunk_avatar_2023.png"
          src="/00005_astro.png"
          alt="Alex Pedersen ai punk avatar"
          className={styles.avatar}
          width={300}
          height={300}
          priority
        />
        <div className={styles.text}>
          {children}
        </div>
      </div>
    </section>
  );
}