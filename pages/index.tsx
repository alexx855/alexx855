import type { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/home.module.css";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from "react";
import readmeRawContent from '../README.md'
// import { Background } from "../components/background-no-ssr";
import POAPs, { IPOAPsProps } from "../components/poaps";
import ScrollButton from "../components/scroll-button";
import About from "../components/about";
import Contact from "../components/contact";
import Skills from "../components/skills";
import { createWriteStream, promises as fs } from 'fs';
import https from 'https';
import path from 'path';

export interface HomeProps {
  poaps: IPOAPsProps['poaps'];
  skills: string[];
  about: string;
}

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

const Home: NextPage<HomeProps> = ({ about, skills, poaps }: HomeProps) => {
  const speedOffset = 0
  const totalSections = 2.6
  // const pages = ((totalSections - 1) * 0.6) + 0.8 + (0.2 * (totalSections)) - speedOffset
  const ref = useRef<IParallax>(null);

  return (
    <>
      <Head>
        <title>Alex Pedersen - alexx855.eth</title>
        <meta
          name="description"
          content={about}
        />
        <meta name="og:title" content="Alex Pedersen" />
        <meta name="og:description" content={about} />
        <meta name="og:image" content="https://alexpedersen.dev/alexx855_aipunk_avatar_2023.png" />
        <meta name="og:url" content="https://alexx855.github.io/alexx855.eth/" />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="Alex Pedersen" />
        <meta name="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@alexx855" />
        <meta name="twitter:creator" content="@alexx855" />
        <meta name="twitter:title" content="Alex Pedersen" />
        <meta name="twitter:description" content={about} />
        <meta name="twitter:image" content="https://alexpedersen.dev/alexx855_aipunk_avatar_2023.png" />
        <meta name="twitter:image:alt" content="Alex Pedersen" />
        <meta name="twitter:domain" content="https://alexpedersen.dev/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <main className={styles.main}>
        <Parallax pages={totalSections} className={styles.parallax} ref={ref}>
          {/* <ParallaxLayer
            key={0}
            offset={0}
            factor={totalSections}
          >
            <Background />
          </ParallaxLayer> */}

          <ParallaxLayer
            key={1}
            offset={0}
            factor={0.8}
            speed={0.4}
            style={{
              // backgroundColor: `hsl(${0 * 50}, 100%, 50%)`,
            }}
          >
            <div className={styles.container}>
              <About about={about} />
            </div>
          </ParallaxLayer>

          <ParallaxLayer 
            offset={0.8}
            factor={0.2}
            speed={0}
          >
            <div className={styles.container}>
              <ScrollButton onClick={() => ref.current?.scrollTo(1)} />
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            key={2}
            offset={1}
            factor={0.8}
            speed={0.4}
            style={{
              // backgroundColor: `hsl(${1 * 50}, 100%, 50%)`,
            }}
          >
            <div className={styles.container}>
              <Skills skills={skills} />
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            key={3}
            offset={1.8}
            factor={0.4}
            speed={0.2}
            style={{
              // backgroundColor: `hsl(${2 * 50}, 100%, 50%)`,
            }}
          >
            <div className={styles.container}>
              <POAPs poaps={poaps} />
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            key={4}
            offset={2.2}
            factor={0.4}
            speed={0}
            style={{
              // backgroundColor: `hsl(${3 * 50}, 100%, 50%)`,
            }}
          >     
            <div className={styles.container}>
              <Contact />
            </div>
          </ParallaxLayer>

        </Parallax>
      </main>
    </>
  );
};

function downloadPoapImageFromURL(url: string, filename: string) {
  // download the images to the public/poaps folder
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed to download image: ${res.statusCode}`);
        return;
      }

      const fileStream = createWriteStream(path.join(process.cwd(), 'public/poaps', filename));
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        console.log(`Image downloaded: ${filename}`);
        resolve(true);
      });

      fileStream.on('error', (err) => {
        console.error(`Failed to download image: ${err}`);
        reject(false);
      });

    }).on('error', (err) => {
      console.error(`Failed to download image: ${err}`);
      reject(false);
    });
  })
}

// load the readme file and parse it 
export async function getStaticProps(context: GetStaticPropsContext) {

  try {
    // get the POAPS from the API
    const POAP_API = process.env.POAP_API
    const headers = new Headers()
    headers.append('accept', 'application/json')
    headers.append('x-api-key', POAP_API!)
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

    let readmeTxt: string = readmeRawContent
    // split the readme into sections, each section starts with one or more #
    const secs = readmeTxt.split(/(?<=\n)(?=\#{1,6})/g)

    // remove the first line and the picture,
    let about = secs[0].split('\n').slice(2).join('\n')
    // substring to  </picture>
    about = about.substring(about.indexOf('</picture>') + 10)
    // remove the first line, and split the other lines into an array
    let skills = secs[1].split('\n').slice(1).map(s => s.substring(1).trim())

    return {
      props: {
        about,
        skills,
        poaps
      }
    }
  } catch (error) {
    console.log(error)
    throw error
  }

}

export default Home;
