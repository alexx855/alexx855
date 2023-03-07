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
      <h3>Web3 POAPs</h3>
      <div>
        {/* <Link href="https://app.poap.xyz/scan/alexx855.eth" target="_blank" rel="noopener noreferrer">view all</Link> */}
        <p>POAP, short for Proof of Attendance Protocol, allows you to mint memories as digital mementos.</p>
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