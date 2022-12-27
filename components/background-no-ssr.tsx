import dynamic from 'next/dynamic'

export const Background = dynamic(
  () => import("./background").then((module) => module.Background),
  {
    ssr: false,
    // loading: () => <p>Loading...</p>
  }
);
