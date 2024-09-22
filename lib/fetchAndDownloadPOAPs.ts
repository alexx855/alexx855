import downloadPoapImageFromURL from '@/lib/downloadPoapImageFromURL';
import fs from 'fs/promises';
import path from 'path';


export interface POAPData {
  event: POAPEvent;
  tokenId: string;
  owner: string;
  chain: string;
  created: string;
}

export type POAPsApiResponse = POAPData[];

interface POAPEvent {
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

export default async function fetchAndDownloadPOAPs(apiKey: string, address: string): Promise<POAPsApiResponse> {
  const headers = new Headers();
  headers.append('accept', 'application/json');
  headers.append('x-api-key', apiKey);

  let poaps: POAPsApiResponse = [];
  try {
    const response = await fetch(`https://api.poap.tech/actions/scan/${address}`, { headers });
    if (response.ok) {
      const data = await response.json() as POAPsApiResponse;
      data.forEach((poap) => {
        poaps.push(poap);
      });
    } else {
      console.error('Failed to fetch POAPs:', response.statusText);
    }
  } catch (e) {
    console.error(e);
  }

  if (poaps && poaps.length > 0) {
    // download the images to the public folder
    for (const poap of poaps) {
      if (!poap.event?.id || !poap.event?.image_url) continue;

      const filename = `poap-${poap.tokenId}.png`;
      // check if the poap image already exists
      if (await fs.access(path.join(process.cwd(), 'public/poaps', filename)).then(() => true).catch(() => false)) {
        continue;
      }
      await downloadPoapImageFromURL(poap.event.image_url, filename);
    }
  }

  return poaps;
}
