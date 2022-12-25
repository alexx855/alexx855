import { Application, Assets, IApplicationOptions, IDestroyOptions, Sprite, utils } from "pixi.js";
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
		console.log('startBackground')
		this.stage.interactive = true;

		// load the texture we need
		const texture = await Assets.load('/alex_pedersen_avatar_transparent.png');

		// This creates a texture from a 'bunny.png' image
		const alex = new Sprite(texture);

		// Setup the position of the alex
		alex.x = this.renderer?.width / 2;
		alex.y = this.renderer?.height / 2;

		// Rotate around the center
		alex.anchor.x = 0.5;
		alex.anchor.y = 0.5;

		// Add the alex to the scene we are building
		this.stage?.addChild(alex);

		// Listen for frame updates
		this.ticker?.add(() => {
			// each frame we spin the bunny around a bit
			alex.rotation += 0.01;
		});

		this.stage?.on("pointerdown", () => {
			console.log('pointerdown')
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