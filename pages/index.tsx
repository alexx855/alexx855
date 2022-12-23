/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { animated, useSpring } from "@react-spring/web";
import { useRef } from "react";

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

const POAPs = [
  {
    id: 5121844,
    name: "HackMoney 2022 Staked Hacker",
    image: "/poaps/5121844.png",
    description: "",
    date: "06-May-2022",
  },
  {
    id: 4682243,
    name: "DAOHacks Staked Hacker",
    image: "/poaps/4682243.png",
    description: "",
    date: "08-Apr-2022",
  },
  {
    id: 4481066,
    name: "BuildQuest Staked Hacker",
    image: "/poaps/4481066.png",
    description: "",
    date: "04-Mar-2022",
  },
  {
    id: 3984334,
    name: "Road to Web3 Staked Hacker",
    image: "/poaps/3984334.png",
    description: "",
    date: "03-Feb-2022",
  },
];


const Home: NextPage = () => {
  const ref = useRef<IParallax>();
  return (
    <>
      <Head>
        <title>Alex Pedersen 🔗 alexx855.eth</title>
        {/* TODO: get description from my Github pforile using the Github API  */}
        <meta
          name="description"
          content="Full stack developer with over 8 years of experience building web applications. Web3 and DevOps enthusiast. 🔗 alexx855.eth"
        />
      </Head>

      <main className={styles.main}>
        <Parallax pages={1.8}>
          <ParallaxLayer offset={0} speed={1} factor={1}>
            <div className={styles.container}>
              <section className={styles.intro}>
                <div className={styles.introContent}>
                  <div className={styles.introAvatar}>
                    <Image
                      src="/avatar.jpg"
                      alt="Alex Pedersen"
                      layout="responsive"
                      width={200}
                      height={200}
                      priority
                    />
                  </div>

                  <div className={styles.introText}>
                    <h3
                      style={{
                        marginTop: 0,
                      }}
                      className={styles.greet}
                    >
                      <strong>Hello there!</strong>
                    </h3>
                    <h1
                      style={{
                        margin: 0,
                      }}
                    >
                      I{"'"}m Alex, a fullstack developer with over 8 years of
                      experience building web applications.
                    </h1>
                    <h2
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      My specialty is in <strong>Angular</strong>,{" "}
                      <strong>Node</strong> and <strong>PHP</strong>.
                    </h2>
                  </div>
                </div>
                <h3>
                  Besides being well-versed in most of the latest tech, I am
                  also proficient in <strong>React.Js</strong>,{" "}
                  <strong>Next.Js</strong>, <strong>Laravel</strong>,{" "}
                  <strong>Graphql</strong>, <strong>Docker</strong>,{" "}
                  <strong>Kubernetes</strong>, <strong>AWS</strong>,{" "}
                  <strong>GCP</strong> and more.
                </h3>

                <div className={styles.introCTA}>
                  <DownIcon />
                </div>
              </section>
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={0.8}
            factor={0.6}
            speed={0}
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
            }
            }
          >
            <div className={styles.container}>
              <section className={styles.web3}>
                <h3>I am a Web3 and DevOps enthusiast.</h3>
                <h4>i{"'"}ve been on the following hackathons and workshops:</h4>
                <div className={styles.eventLogos}>
                  {POAPs.map((poap) => (
                    <a
                      key={poap.id}
                      target="_blank"
                      rel="noreferrer"
                      href={`https://app.poap.xyz/token/${poap.id}/`}
                      className={styles.eventCircle}
                    >
                      <Image
                        width={95}
                        layout="responsive"
                        height={95}
                        alt={`${poap.name} ${poap.date}`}
                        src={poap.image}
                      />
                    </a>
                  ))}
                </div>
                {/* <p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://app.poap.xyz/scan/alexx855.eth"
                  >
                    🔗 alexx855.eth POAPs
                  </a>
                </p> */}
              </section>
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1.3}
            factor={0.4}
            speed={0.5}
            style={{
              // backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >

            <div className={styles.container}>
              <footer className={styles.footer}>
                <h4
                  style={{
                    marginTop: 0,
                  }}
                >
                  Contact me:
                </h4>
                <div className={styles.social}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/alexx855/"
                  >
                    <Image
                      width={96}
                      layout="raw"
                      height={28}
                      alt="Github Badge"
                      src="/badges/GitHub-100000.svg"
                    />
                  </a>

                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/alexx855"
                  >
                    <Image
                      width={111}
                      layout="raw"
                      height={28}
                      alt="Linkedin Badge"
                      src="/badges/LinkedIn-0077B5.svg"
                    />
                  </a>

                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://discord.com/users/alexx855.eth#9229"
                  >
                    <Image
                      width={105}
                      layout="raw"
                      height={28}
                      alt="Discord Badge"
                      src="/badges/Discord-5865F2.svg"
                    />
                  </a>

                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/alexx855"
                  >
                    <Image
                      width={104}
                      layout="raw"
                      height={28}
                      alt="Twitter Badge"
                      src="/badges/Twitter-1DA1F2.svg"
                    />
                  </a>
                </div>
              </footer>
            </div>
          </ParallaxLayer>

        </Parallax>
      </main>
    </>
  );
};

export default Home;
