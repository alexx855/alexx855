import styles from "../styles/contact.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <h3>Contact</h3>
      <div className={styles.contactList}>
        <Link target="_blank" href="https://www.linkedin.com/in/alexx855">
          <Image src="/badges/LinkedIn.svg" width={111} height={28} alt="Linkedin Badge" />
        </Link>
        <Link target="_blank" href="https://github.com/alexx855">
          <Image src="/badges/Github.svg" width={96} height={28} alt="Github Badge" />
        </Link>
        <Link target="_blank" href="https://discord.com/users/alexx855.eth#9229">
          <Image src="/badges/Discord.svg" width={105} height={28} alt="Discord Badge" />
        </Link>
        <Link target="_blank" href="https://twitter.com/alexx855">
          <Image src="/badges/Twitter.svg" width={104} height={28} alt="Twitter Badge" />
        </Link>
        {/* <Link target="_blank" href="https://stackoverflow.com/users/4717076/alex-pedersen">
          <Image src="/badges/Stack_Overflow.svg" width={164} height={28} alt="Stackoverflow Badge" />
        </Link> */}
      </div>
      <p className={styles.adios}>Adios <span>👋</span></p>
    </section>
  );
}