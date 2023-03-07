import Head from 'next/head'
import styles from '@/styles/home.module.css'
import type { NextPage } from "next";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useCallback, useEffect, useRef, useState } from "react";
import { Background } from "@/components/background";
import POAPs, { IPOAPsProps } from "@/components/poaps";
import ScrollButton from "@/components/scroll-button";
import About from "@/components/about";
import Contact from "@/components/contact";
import Skills from "@/components/skills";
import { createWriteStream, promises as fs } from 'fs';
import https from 'https';
import path from 'path';

export interface HomeProps {
  poaps: POAPsApiResponse[];
  skills: string[];
  about: string;
}

import { Ubuntu } from 'next/font/google'

const roboto = Ubuntu({
  weight: '700',
  subsets: ['latin'],
})

const schema = {
  "@context": "https://schema.org/",
  "@type": "Person",
  "name": "Alex Pedersen",
  "url": "https://alexpedersen.dev/",
  "image": "https://alexpedersen.dev/alexx855_aipunk_avatar_2023.png",
  "jobTitle": "Full stack web developer",
  "sameAs": [
    "https://twitter.com/alexx855",
    "https://www.linkedin.com/in/alexx855/"
  ]
}

const Home: NextPage<HomeProps> = ({ about, skills, poaps }) => {
  const totalPages = 3;
  const ref = useRef<IParallax>(null);
  const [size, setSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
  const [warpSpeed, setWarpSpeed] = useState<number>(0);

  useEffect(() => {

    const onResize = (event: any) => {
      if (!event.target) {
        return;
      }
      const innerWidth = event.target.innerWidth;
      const innerHeight = event.target.innerHeight;
      setSize({ width: innerWidth, height: innerHeight });
    };
    //add eventlistener to window scroll
    window.addEventListener("resize", onResize);
    // remove event on unmount to prevent a memory leak with the cleanup
    setSize({ width: window.innerWidth, height: window.innerHeight });
    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, []);

  const onScroll = useCallback((event: any) => {
    if (!event.target) {
      return;
    }
    setWarpSpeed(event.target.scrollTop / event.target.scrollHeight);
  }, []);

  useEffect(() => {
    const current = ref.current
    if (!current || !current.container.current) {
      return;
    }
    //add eventlistener to window scroll
    current.container.current.addEventListener("scroll", onScroll);
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      if (!current || !current.container.current) {
        return;
      }
      current.container.current.removeEventListener("scroll", onScroll);
    }
  }, [onScroll]);

  return (
    <>
      <Head>
        <title>Alex Pedersen - alexx855.eth</title>
        <meta
          name="description"
          content={about}
        />
        <link rel="icon" href="/favicon.svg" />
        <meta name="og:title" content="Alex Pedersen - alexx855.eth" />
        <meta name="og:description" content={about} />
        <meta name="og:image" content="https://alexpedersen.dev/alexx855_aipunk_avatar_2023.png" />
        <meta name="og:url" content="https://alexx855.github.io/alexx855.eth/" />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="Alex Pedersen - alexx855.eth" />
        <meta name="og:locale" content="en_US" />
        <meta name="twitter:card" content={about} />
        <meta name="twitter:site" content="@alexx855" />
        <meta name="twitter:creator" content="@alexx855" />
        <meta name="twitter:title" content="Alex Pedersen - alexx855.eth" />
        <meta name="twitter:description" content={about} />
        <meta name="twitter:image" content="https://alexpedersen.dev/alexx855_aipunk_avatar_2023.png" />
        <meta name="twitter:image:alt" content="Alex Pedersen" />
        <meta name="twitter:domain" content="https://alexpedersen.dev/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <main className={roboto.className}>
        <Parallax
          pages={totalPages}
          className={styles.parallax}
          ref={ref}
          onDragEnd={() => {
            // setWarpSpeed(0);
          }}
          onDragStart={() => {
            // setWarpSpeed(1);
          }}
          style={{
            zIndex: 99,
          }}>

          <ParallaxLayer
            offset={0.8}
            factor={0.2}
            speed={0.2}
          >
            <div className={styles.container}>
              <ScrollButton onClick={() => {
                ref.current?.scrollTo(1)
                setWarpSpeed(1);
              }} />
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={0}
            factor={0.8}
            speed={0.4}
            style={{
              // backgroundColor: `hsl(${0 * 50}, 100%, 50%)`,
            }}
          >
            <div
              className={styles.container}
            // className={styles.container__cover}
            >
              <About>
                <h1>Hello there</h1>
                {about.split('.').map((sentence, index) => {
                  if (sentence.replace(/\s/g, '').length === 0)
                    return null
                  return <p key={index}>{sentence}.</p>
                })}
              </About>
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1}
            factor={1}
            speed={0.2}
            style={{
              // backgroundColor: `hsl(${1 * 50}, 100%, 50%)`,
            }}
          >
            <div className={styles.container}>
              <Skills skills={skills} />
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            factor={0.5}
            speed={0}
            style={{
              // backgroundColor: `hsl(${2 * 50}, 100%, 50%)`,
            }}
          >
            <div className={styles.container}>
              <POAPs poaps={poaps} />
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.5}
            factor={0.5}
            speed={0.4}
            style={{
              // backgroundColor: `hsl(${3 * 50}, 100%, 50%)`,
            }}
          >
            <div className={styles.container}>
              <Contact />
            </div>
          </ParallaxLayer>

        </Parallax>
        <Background size={size} warpSpeed={warpSpeed} />
      </main>
    </>
  )
}


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

export interface POAPsApiResponse {
  event: POAPEvent;
  tokenId: string;
  owner: string;
  chain: string;
  created: string;
}

function downloadPoapImageFromURL(url: string, filename: string) {
  // download the images to the public/poaps folder
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return;
      }

      const fileStream = createWriteStream(path.join(process.cwd(), 'public/poaps', filename));
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        resolve(true);
      });

      fileStream.on('error', (err) => {
        reject(false);
      });

    }).on('error', (err) => {
      reject(false);
    });
  })
}

export const getStaticProps = async () => {

  let readmeTxt: string = await fs.readFile(path.join(process.cwd(), 'README.md'), 'utf8')
  // split the readme into sections, each section starts with one or more #
  const secs = readmeTxt.split(/(?<=\n)(?=\#{1,6})/g)
  // remove the first line and the picture,
  let about = secs[0].split('\n').slice(2).join('\n')
  // substring to  </picture>
  about = about.substring(about.indexOf('</picture>') + 10)
  // trim line jumps 
  about = about.trim()
  // remove the first line, and split the other lines into an array
  let skills = secs[1].split('\n').slice(1).map(s => s.substring(1).trim())
  // trim line jumps, remove empty lines
  skills = skills.map(s => s.trim()).filter(s => s.length > 0)


  // get the POAPS from the API
  const POAP_API = process.env.POAP_API
  if (!POAP_API) {
    throw new Error('POAP_API is not defined')
  }

  const headers = new Headers()
  headers.append('accept', 'application/json')
  headers.append('x-api-key', POAP_API)
  const poaps: IPOAPsProps['poaps'] = await (await fetch('https://api.poap.tech/actions/scan/alexx855.eth', { headers })).json()

  if (poaps && poaps.length > 0) {
    // download the images to the public folder
    for (const poap of poaps) {
      const filename = `poap-${poap.event.id}.png`
      // check if the file exists
      if (await fs.access(path.join(process.cwd(), 'public/poaps', filename)).then(() => true).catch(() => false)) {
        continue
      }
      await downloadPoapImageFromURL(poap.event.image_url, filename)
    }
  }

  const props: HomeProps = {
    about,
    skills,
    poaps
  }

  return {
    props
  }
}

export default Home;
