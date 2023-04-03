import styles from "../styles/poaps.module.css";
import Image from "next/image";
import Link from "next/link";
export interface IPOAPsProps {
  poaps: POAPsApiResponse[];
}

export interface POAPEvent {
  id: number;
  fancy_id: string;
  name: string;
  event_url: string;
  image_url: string;
  country: string;
  city: string;
  description: string;
  year: number;
  start_date: string;
  end_date: string;
  expiry_date: string;
  supply: number;
}

export interface POAPsApiResponse {
  event: POAPEvent;
  tokenId: string;
  owner: string;
  chain: string;
  created: string;
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