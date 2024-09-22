import Head from 'next/head'
import styles from '@/styles/home.module.css'
import type { NextPage } from "next";
import { Ubuntu } from 'next/font/google'
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useCallback, useEffect, useRef, useState } from "react";
import { Background } from "@/components/background";
import POAPs, { IPOAPsProps } from "@/components/poaps";
import ScrollButton from "@/components/scroll-button";
import About from "@/components/about";
import Contact from "@/components/contact";
import Skills from "@/components/skills";
import { promises as fs } from 'fs';
import path from 'path';
import fetchAndDownloadPOAPs, { type POAPsApiResponse } from '@/lib/fetchAndDownloadPOAPs';

export interface HomeProps {
  poaps: POAPsApiResponse;
  skills: string[];
  about: string;
}

const schema = {
  "@context": "https://schema.org/",
  "@type": "Person",
  "name": "Alex Pedersen",
  "url": "https://alexpedersen.dev/",
  "image": "https://alexpedersen.dev/alexx855_aipunk_avatar_2023.png",
  "jobTitle": "Freelance Full Stack & Mobile Developer. Argentina",
  "sameAs": [
    "https://twitter.com/alexx855",
    "https://github.com/alexx855",
    "https://www.linkedin.com/in/alexx855/"
  ]
}

type Pages = 'about'
  | 'cta'
  | 'skills'
  | 'poaps'
  | 'contact'

interface PageConfig {
  offset: number;
  speed: number;
  factor: number;
}

interface LayoutConfig {
  pages: number;
}

type Adaptive = 'mobile' | 'desktop'

const ubuntu = Ubuntu({
  weight: '700',
  subsets: ['latin'],
})

const Home: NextPage<HomeProps> = ({ about, skills, poaps }) => {
  const ref = useRef<IParallax>(null);
  const [size, setSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
  const [layout, setLayout] = useState<Adaptive>('mobile');
  const [warpSpeed, setWarpSpeed] = useState<number>(0);
  const parallaxConfig: Record<
    Adaptive, Record<Pages, PageConfig> & LayoutConfig
  > = {
    ['mobile']: {
      pages: 3.3,
      ['about']: {
        offset: 0,
        factor: 0.8,
        speed: 0.4
      },
      ['cta']: {
        offset: 0.8,
        factor: 0.2,
        speed: -0.2,
      },
      ['skills']: {
        offset: 1,
        factor: 1.2,
        speed: 0
      },
      ['poaps']: {
        offset: 2.2,
        factor: 0.5,
        speed: -0.2
      },
      ['contact']: {
        offset: 2.7,
        factor: 0.5,
        speed: -0.4
      }
    },
    ['desktop']: {
      pages: 3,
      ['about']: {
        offset: 0,
        factor: 0.8,
        speed: 0.4
      },
      ['cta']: {
        offset: 0.8,
        factor: 0.2,
        speed: 0
      },
      ['skills']: {
        offset: 1,
        factor: 1,
        speed: 0.2
      },
      ['poaps']: {
        offset: 2,
        factor: 0.5,
        speed: 0
      },
      ['contact']: {
        offset: 2.5,
        factor: 0.5,
        speed: 0.4
      }
    },
  }

  const onResize = useCallback(() => {
    if (!window) {
      return;
    }
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    setSize({ width: innerWidth, height: innerHeight });
    if (window.innerWidth >= 900) {
      setLayout('desktop')
    } else {
      setLayout('mobile')
    }
  }, []);

  useEffect(() => {
    //add eventlistener to window scroll
    window.addEventListener("resize", onResize);
    // call the handler right away so state gets updated with initial window size
    onResize()
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, []);

  useEffect(() => {
    const curentRef = ref.current
    if (!curentRef || !curentRef.container.current) {
      return;
    }

    const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
      if (!event.currentTarget) {
        return;
      }
      setWarpSpeed(event.currentTarget.scrollTop / event.currentTarget.scrollHeight);
    }

    //add eventlistener to window scroll
    curentRef.container.current.addEventListener("scroll", onScroll);
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      if (!curentRef || !curentRef.container.current) {
        return;
      }
      curentRef.container.current.removeEventListener("scroll", onScroll);
    }
  }, [ref.current]);

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
        <link
          rel="canonical"
          href="https://alexpedersen.dev/"
          key="canonical"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <main className={ubuntu.className}>
        <Parallax
          ref={ref}
          pages={parallaxConfig[layout].pages}
          key={layout}
          className={styles.parallax}
          style={{
            zIndex: 99, // force parallax to be on top of the background canvas element
          }}
        >

          <ParallaxLayer
            offset={parallaxConfig[layout]['about'].offset}
            speed={parallaxConfig[layout]['about'].speed}
            factor={parallaxConfig[layout]['about'].factor}
            // style={{ backgroundColor: `hsl(${0 * 50}, 100%, 50%)` }}
          >
            <div
              className={styles.container}
            // className={styles.container__cover}
            >
              <About>
                <h1>Alex Pedersen</h1>
                {about.split('.').map((sentence, index) => {
                  if (sentence.replace(/\s/g, '').length === 0)
                    return null
                  return <p key={index}>{sentence}.</p>
                })}
              </About>
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={parallaxConfig[layout]['skills'].offset}
            speed={parallaxConfig[layout]['skills'].speed}
            factor={parallaxConfig[layout]['skills'].factor}
            // style={{ backgroundColor: `hsl(${1 * 50}, 100%, 50%)` }}
          >
            <div className={styles.container}>
              <Skills skills={skills} />
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={parallaxConfig[layout]['poaps'].offset}
            speed={parallaxConfig[layout]['poaps'].speed}
            factor={parallaxConfig[layout]['poaps'].factor}
            // style={{ backgroundColor: `hsl(${2 * 50}, 100%, 50%)` }}
          >
            <div className={styles.container}>
              <POAPs poaps={poaps} />
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={parallaxConfig[layout]['contact'].offset}
            speed={parallaxConfig[layout]['contact'].speed}
            factor={parallaxConfig[layout]['contact'].factor}
            // style={{ backgroundColor: `hsl(${3 * 50}, 100%, 50%)` }}
          >
            <div className={styles.container}>
              <Contact />
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={parallaxConfig[layout]['cta'].offset}
            speed={parallaxConfig[layout]['cta'].speed}
            factor={parallaxConfig[layout]['cta'].factor}
          >
            <div className={styles.container}>
              <ScrollButton onClick={() => {
                ref.current?.scrollTo(1)
              }} />
            </div>
          </ParallaxLayer>
        </Parallax>
        <Background size={size} warpSpeed={warpSpeed} />
      </main>
    </>
  )
}


export const getStaticProps = async () => {
  // read the readme file
  let readmeTxt: string = await fs.readFile(path.join(process.cwd(), 'README.md'), 'utf8')
  // split the readme into sections
  const secs = readmeTxt.split( /#/g )
  // get the about section, after the # header and before the next header
  let about = secs[1].split('\n').slice(1).join('\n')

  // get the skills from the ## header
  let skills = secs[3].split('\n').slice(1).map(s => s.substring(1))

  // filter out empty skills
  skills = skills.map(s => s.trim()).filter(s => s.length > 0)

  // get the POAPS from the API
  if (!process.env.POAP_API) {
    throw new Error('POAP_API is not defined')
  }

  const poaps: IPOAPsProps['poaps'] = await fetchAndDownloadPOAPs(process.env.POAP_API, 'alexx855.eth')

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
