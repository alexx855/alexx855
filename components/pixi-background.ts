import { Application, Assets, IApplicationOptions, IDestroyOptions, Sprite, Texture, utils } from "pixi.js";
interface IPixiBackgroundOptions extends IApplicationOptions {
	container: HTMLDivElement;
}

export class PixiBackground extends Application {
	container: HTMLDivElement | null;

	constructor(options: IPixiBackgroundOptions) {
		super(options);
		this.container = options.container; 
	}

	async startBackground() {
		// Get the texture for star.
		const starTexture = Texture.from('/star.png');
		
		const starAmount = 1000;
		let cameraZ = 0;
		const fov = 20;
		const baseSpeed = 0.025;
		let speed = 0;
		let warpSpeed = 0;
		const starStretch = 5;
		const starBaseSize = 0.05;
		
		// Create the stars
		const stars: any[] = [];
		for (let i = 0; i < starAmount; i++) {
			const star = {
				sprite: new Sprite(starTexture),
				z: 0,
				x: 0,
				y: 0,
			};
			star.sprite.anchor.x = 0.5;
			star.sprite.anchor.y = 0.7;
			randomizeStar(star, true);
			this.stage.addChild(star.sprite);
			stars.push(star);
		}
		
		function randomizeStar(star: { sprite?: Sprite; z: any; x: any; y: any; }, initial?: boolean | undefined) {
			star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;
		
			// Calculate star positions with radial random coordinate so no star hits the camera.
			const deg = Math.random() * Math.PI * 2;
			const distance = Math.random() * 50 + 1;
			star.x = Math.cos(deg) * distance;
			star.y = Math.sin(deg) * distance;

			// TODO: change start color
		}

		// Listen for animate update
		this.ticker.add((delta) => {
			// Simple easing. This should be changed to proper easing function when used for real.
			speed += (warpSpeed - speed) / 20;
			cameraZ += delta * 10 * (speed + baseSpeed);
			for (let i = 0; i < starAmount; i++) {
				const star = stars[i];
				if (star.z < cameraZ) randomizeStar(star);
		
				// Map star 3d position to 2d with really simple projection
				const z = star.z - cameraZ;
				star.sprite.x = star.x * (fov / z) * this.renderer.screen.width + this.renderer.screen.width / 2;
				star.sprite.y = star.y * (fov / z) * this.renderer.screen.width + this.renderer.screen.height / 2;
		
				// Calculate star scale & rotation.
				const dxCenter = star.sprite.x - this.renderer.screen.width / 2;
				const dyCenter = star.sprite.y - this.renderer.screen.height / 2;
				const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
				const distanceScale = Math.max(0, (2000 - z) / 2000);
				star.sprite.scale.x = distanceScale * starBaseSize;
				// Star is looking towards center so that y axis is towards center.
				// Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
				star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / this.renderer.screen.width;
				star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
			}
		});


		// this.start();
	}

	destroy(removeView?: boolean | undefined, stageOptions?: boolean | IDestroyOptions | undefined): void {
		console.log('destroy')
		super.destroy(removeView, stageOptions);
	}

	resize() {
		console.log('resize')
		// this.renderer?.resize(this.container.clientWidth, this.container.clientHeight * this.pages);
	}

}