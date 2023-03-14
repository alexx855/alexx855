import styles from "../styles/poaps.module.css";
import Image from "next/image";
import Link from "next/link";
import { POAPsApiResponse } from "@/pages";

export interface IPOAPsProps {
  poaps: POAPsApiResponse[];
}

export default function POAPs({ poaps }: IPOAPsProps) {
  if (!poaps || poaps.length === 0) {
    return null;
  }

  return (
    <section id="poaps" className={styles.poaps}>
      <h3>Web3</h3>
      <div>
        <p>I{"'"}ve received the following POAPs from events and hackathons i{"'"}ve attended in the last 2 years.</p>
      </div>
      <div className={styles.content}>
        <div>
          {poaps.map(poap => {
            return (
              <Link key={poap.tokenId} href={`https://app.poap.xyz/token/${poap.tokenId}`} target="_blank" rel="noopener noreferrer">
                <Image width={100} height={100} src={`/poaps/poap-${poap.event.id}.png`} alt={poap.event.name} />
                <span>{poap.event.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}