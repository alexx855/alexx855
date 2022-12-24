import type { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { animated, useSpring } from "@react-spring/web";
import { useRef } from "react";
import { marked } from "marked";
import readmeRawContent from '../README.md'

// todo: add scroll action on click of down arrow and move to another file
function DownIcon() {
  const props = useSpring({
    to: { opacity: 0.6 },
    from: { opacity: 0 },
    delay: 1000,
    loop: true,
  });

  return (
    <animated.svg
      width="96"
      height="96"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      fillRule="evenodd"
      clipRule="evenodd"
      style={{
        transform: props.opacity
          .to({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
          })
          .to((x) => `scale(${x})`),
        opacity: props.opacity,
      }}
    >
      <g transform="translate(0,-15) scale(4)">
        <animated.path d="M23.245 4 12 18.374.781 4 0 4.619 12 20 24 4.609 23.245 4z"></animated.path>
      </g>
      <g transform="translate(0,15) scale(4)">
        <animated.path d="M23.245 4 12 18.374.781 4 0 4.619 12 20 24 4.609 23.245 4z"></animated.path>
      </g>
    </animated.svg>
  );
}

interface HomeProps {
  sections: {
    name: string
    content: string
  }[]
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  const ref = useRef<IParallax>();
  // first section is 0.8 of the screen without top gap, the other sections are 0.6 of the screen with 0.2 of the screen between them
  const speedOffset = 0.266
  const pages = (props.sections.length - 1) * 0.6 + 0.8 + (0.2 * (props.sections.length)) - speedOffset

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
        <Parallax pages={pages} >
          {props.sections.map((section, index) => {
            // add prev section factor
            const offset = index === 0 ? 0 : (0.8 + ((index - 1) * 0.6) + (index * 0.2))
            return (
              <ParallaxLayer
                key={index}
                offset={offset}
                factor={
                  // acculate the factor for each section, starting with 0.8 for the second section
                  index === 0 ? 0.8 : 0.6
                }
                speed={index === 0 ? 0.4 : index % 2 === 0 ? 0.6 : 0.2}
                style={{
                  // backgroundColor: `hsl(${index * 50}, 100%, 50%)`,
                }}
              >
                <div className={styles.container}>
                  <section>
                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  </section>

                  {index === 0 && (
                    <div className={styles.introCTA}>
                      <DownIcon />
                    </div>)}
                </div>
              </ParallaxLayer>
            )
          })}

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
