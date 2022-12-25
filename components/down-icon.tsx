import { animated, useSpring } from "@react-spring/web";

export function DownIcon() {
	const props = useSpring({
	  to: { opacity: 0.9 },
	  from: { opacity: 0 },
	  delay: 1000,
	  loop: true,
	});
  
	return (
	  <animated.svg
		width="48"
		height="48"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 48 48"
		fillRule="evenodd"
		clipRule="evenodd"
		fill="white"
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
		<g transform="translate(0,-7) scale(2)">
		  <animated.path d="M23.245 4 12 18.374.781 4 0 4.619 12 20 24 4.609 23.245 4z"></animated.path>
		</g>
		<g transform="translate(0,7) scale(2)">
		  <animated.path d="M23.245 4 12 18.374.781 4 0 4.619 12 20 24 4.609 23.245 4z"></animated.path>
		</g>
	  </animated.svg>
	);
  }
  
  