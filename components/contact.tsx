import styles from "../styles/contact.module.css";
import Link from "next/link";

export default function Contact() {
  const links = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/alexx855" },
    { name: "GitHub", url: "https://github.com/alexx855" },
    { name: "Twitter", url: "https://twitter.com/alexx855" },
    { name: "Stack Overflow", url: "https://stackoverflow.com/users/4717076/alex-pedersen" },
    { name: "Warpcast", url: "https://warpcast.com/alexx855.eth" },
  ];

  return (
    <section id="contact" className={styles.contact}>
      <h3 className={styles.title}>Link Tree 🌲</h3>
      <nav>
        <ul className={styles.contactList}>
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
