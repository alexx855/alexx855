import { POAPsApiResponse } from "@/lib/fetchAndDownloadPOAPs";
import styles from "../styles/poaps.module.css";
import Image from "next/image";
import Link from "next/link";
export interface IPOAPsProps {
  poaps: POAPsApiResponse;
}

export default function POAPs({ poaps }: IPOAPsProps) {
  if (!poaps || poaps.length === 0) {
    return null;
  }

  return (
    <section id="poaps" className={styles.poaps}>
      <h3>Road to Web3 🔗 alexx855.eth</h3>
      <div>
        <p><Link href={"https://poap.xyz/"}>POAPs</Link> from the events and hackathons i{"'"}ve attended over the last years.</p>
      </div>
      <div className={styles.content}>
        <div>
          {poaps.map(poap => {
            return (
              <Link key={poap.tokenId} href={`https://app.poap.xyz/token/${poap.tokenId}`} target="_blank" rel="noopener noreferrer">
                <Image width={200} height={200} src={`/poaps/poap-${poap.tokenId}.webp`} alt={poap.event.name} />
                <span>{poap.event.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
