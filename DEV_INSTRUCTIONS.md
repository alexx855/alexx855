# Development Instructions

## Basic Instructions for Developing a Next.js App

1. Install `pnpm` if you haven't already:
`npm install -g pnpm`

2. Install dependencies:
`pnpm install`

4. Set up the environment variable:
`echo "POAP_API=XXX" > .env.local`

5. Run the development server:
`pnpm dev`


### Deploying to Akash Network

1. Build your container image using Docker: `docker build -t <yourusername>/nextjs-akash .`. 
2. Push your container image to a PUBLIC repository, and version it.
3. Create a deployment file. You can find a quickstart example in [`deploy.yaml`] with an already public image if your just testing.
4. Create the deployment on Akash console at [https://console.akash.network/](https://console.akash.network/) or using the CLI: [https://akash.network/docs/deployments/akash-cli/overview/](https://akash.network/docs/deployments/akash-cli/overview/)