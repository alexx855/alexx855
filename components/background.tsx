import { useRef, useEffect } from "react";
import { PixiBackground } from "./pixi-background";

export function Background() {
	const bgContainer = useRef<HTMLDivElement | null>(null);
	const pixiBgRef = useRef<PixiBackground | null>(null);
	// TODO: track scroll event and trigger background animation while scrolling

	useEffect(() => {
		const initBackground = () => {
			console.log('initBackground');
			if (bgContainer === null || bgContainer.current === null) return;
			const canvasbgContainer = bgContainer.current;

			if (canvasbgContainer && canvasbgContainer.childElementCount > 0) {
				canvasbgContainer.lastChild?.remove();
			}

			const pixiApp = new PixiBackground({
				backgroundColor: '#162233',
				antialias: true,
				// resolution: 1,
				resolution: window.devicePixelRatio || 1,
				autoDensity: true,
				width: bgContainer.current?.parentElement?.offsetWidth,
				height: bgContainer.current?.parentElement?.offsetHeight,
				container: canvasbgContainer,
			});
			canvasbgContainer?.appendChild(pixiApp.view as any);
			pixiBgRef.current = pixiApp;
			pixiBgRef.current.startBackground();
		}
		initBackground();
		// window.addEventListener('resize', initBackground);
		return () => {
			// window.removeEventListener('resize', initBackground);
			pixiBgRef.current?.destroy();
		}
	}, []);

	return (<>
		<div style={{
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: 1,
			width: '100%',
			height: '100%',
		}} ref={bgContainer}>
		</div>

		<div style={{
				position: 'absolute',
				top: 0,
				left: 0,
				zIndex: 2,
				width: '100%',
				height: '100%'
			}}
		>
		</div>
	</>)
}