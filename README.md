<picture>
  <source media="(prefers-color-scheme: dark)" alt="Welcome to the dark side" srcset="https://raw.githubusercontent.com/alexx855/alexx855/master/public/stormtroopocat.png">
  <img alt="May the force be with you" width="100" height="100" src="https://raw.githubusercontent.com/alexx855/alexx855/master/public/octobiwan.png">
</picture>

# Hello there

Full stack developer, exploring Web3, DevOps and AI. 

## Skills and Experience

- Over 10 years of experience developing and maintaining web applications, most PHP and MySQL, WordPress and WooCommerce.
- Currently working with JavaScript, TypeScript, Angular, RxJs, Ionic, Capacitor, Firebase and Node.
- Experience working with different cloud providers: Amazon Web Services, Google Cloud and Digital Ocean and Linux, Docker, Kubernetes, Github Actions.
- Solid knowledge of React and Next.js, GraphQL, MongoDB, PostgreSQL, Redis, Express, TailwindCSS, Bootstrap, Sass, jQuery.
- Blockchain developer enthusiast, smart contracts development with Solidity, Foundry, Wagmi, Hardhat, Ethers.js, Viem


### Deploying to Akash Network

1. Build your container image using Docker: `docker build -t <yourusername>/nextjs-akash .`. 
2. Push your container image to a PUBLIC repository.
3. Create a deployment file. You can find a quickstart example in `deploy.yaml` with an already public image if your just testing.
4. Create the deployment on Akash console or using the CLI: `akash tx deployment create deploy.yaml --from <your_wallet_name> --node <node_url> --chain-id <chain_id> --fees 5000uakt`.