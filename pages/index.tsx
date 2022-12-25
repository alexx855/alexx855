import type { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useEffect, useRef } from "react";
import { marked } from "marked";
import readmeRawContent from '../README.md'
import { PixiBackground } from "../components/pixi-background";
import { DownIcon } from "../components/down-icon";

interface HomeProps {
  sections: {
    name: string
    content: string
  }[]
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  // first section is 0.8 of the screen without top gap, the other sections are 0.6 of the screen with 0.2 of the screen between them
  const speedOffset = 0.234
  const pages = (props.sections.length - 1) * 0.6 + 0.8 + (0.2 * (props.sections.length)) - speedOffset
  const ref = useRef<IParallax | null>(null);
  const bgContainer = useRef<HTMLDivElement | null>(null);
  const pixiBgRef = useRef<PixiBackground | null>(null);
  // const [width, setWidth] = useState(0);
  // const [height, setHeight] = useState(0);

  useEffect(() => {


    return () => {

    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // TODO: move to SSR component
      setTimeout(() => {
        if (bgContainer === null || bgContainer.current === null) return;
        const canvasbgContainer = bgContainer.current;

        if (canvasbgContainer && canvasbgContainer.childElementCount > 0) {
          canvasbgContainer.lastChild?.remove();
        }

        const pixiApp = new PixiBackground({
          backgroundColor: '#162233',
          antialias: true,
          resolution: 1,
          // resolution: window.devicePixelRatio || 1,
          autoDensity: true,
          width: window.innerWidth,
          height: window.innerHeight * pages,
          container: canvasbgContainer,
        });

        canvasbgContainer?.appendChild(pixiApp.view as any);
        pixiBgRef.current = pixiApp;
        pixiBgRef.current.startBackground();
      }, 100);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      if (pixiBgRef.current) {
        pixiBgRef.current.destroy();
      }
      // window.removeEventListener('resize', handleResize);
    }
  }, [bgContainer, pages]);

  return (
    <>
      <Head>
        <title>Alex Pedersen</title>
        <meta
          name="description"
          content="IT Nerd, Full Stack Developer, Web3 & DevOps 🔗 alexx855.eth"
        />
      </Head>

      <main className={styles.main}>
        <Parallax pages={pages} className={styles.parallax} ref={ref}>
          <ParallaxLayer
            offset={0}
            factor={pages}
          >
            <div className={styles.background} ref={bgContainer}></div>
          </ParallaxLayer>

          {/* sections from readme */}
          {props.sections.map((section, index) => {
            // accumulate prev sections factors, add 0.2 for the gap between sections
            const offset = index === 0 ? 0 : (0.8 + ((index - 1) * 0.6) + (index * 0.2))
            return (
              <ParallaxLayer
                key={index}
                offset={offset}
                factor={index === 0 ? 0.8 : 0.6}
                speed={index === 0 ? 0.4 : index % 2 === 0 ? 0.6 : 0.2} // different speed for each section
                style={{
                  // backgroundColor: `hsl(${index * 50}, 100%, 50%)`,
                }}
              >
                <div className={styles.container}>
                  <section className={styles.content}>
                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  </section>
                </div>
              </ParallaxLayer>
            )
          })}

          {/* 1st page down button */}
          <ParallaxLayer offset={0.6} factor={0.2} speed={-0.3} >
            <div className={styles.container}>
              <section>
                <button
                  onClick={() => ref.current?.scrollTo(1)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    fontSize: 0,
                    padding: 0,
                  }}
                >
                  <DownIcon />
                </button>
              </section>
            </div>
          </ParallaxLayer>

        </Parallax>
      </main>
    </>
  );
};

// load the readme file and parse it 
export async function getStaticProps(context: GetStaticPropsContext) {
  let readmeTxt: string = readmeRawContent
  // remove the line starts with '[![Website Badge]', it's the website badge
  readmeTxt = readmeTxt.replace(/\[!\[Website Badge\].*\n/g, '')
  // remove the comments from the other lines that i dont want to show in the readme
  readmeTxt = readmeTxt.replace(/<!--/g, '')
  readmeTxt = readmeTxt.replace(/-->/g, '')
  // split the readme into sections, each section starts with one or various # tag
  const secs = readmeTxt.split(/(?<=\n)(?=\#{1,6})/g)
  // map and parse the markdown content to html, add the slug as key, 
  const sections: HomeProps['sections'] = secs.map(section => {
    // extrat the section name from the first line
    const name = section.split('\n')[0].replace(/#/g, '').trim().toLowerCase().replace(/ /g, '-')
    // remove the first line from the content, and parse the markdown to html
    const content = marked(section)
    return {
      name,
      content
    }
  })

  return {
    props: {
      sections
    }
  }
}

export default Home;
