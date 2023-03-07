import { useRef, useEffect } from "react";
import { PixiBackground } from "./pixi-background";

export function Background({ size, warpSpeed }: { size: { width: number, height: number }, warpSpeed: number }) {
  const bgContainer = useRef<HTMLDivElement | null>(null);
  const pixiBgRef = useRef<PixiBackground | null>(null);

  useEffect(() => {
    const canvasBgContainer = bgContainer.current;

    if (canvasBgContainer) {
      const pixiApp = new PixiBackground({
        backgroundColor: '#161b22',
        antialias: true,
        // resolution: 1,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        width: size.width,
        height: size.height,
        // width: canvasBgContainer.parentElement?.offsetWidth,
        // height: canvasBgContainer.parentElement?.offsetHeight,
        container: canvasBgContainer,
      });

      canvasBgContainer.appendChild(pixiApp.view as any);
      pixiBgRef.current = pixiApp;
      pixiBgRef.current.startBackground();
    }

    return () => {
      if (pixiBgRef.current) {
        pixiBgRef.current.destroy();
      }
      if (canvasBgContainer && canvasBgContainer.childElementCount > 0) {
        canvasBgContainer.lastChild?.remove();
      }
    }
  }, [size]);

  // update warp speed
  useEffect(() => {
    if (pixiBgRef.current) {
      pixiBgRef.current.warpSpeed = warpSpeed;
    }
  }, [warpSpeed]);

  return (
    <div
      id="bg"
      style={{
        position: 'fixed',
        zIndex: 1,
        left: 0,
        width: size.width,
        height: size.height,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          width: '100%',
          height: '100%',
        }}
        ref={bgContainer}
        id="bgContainer"
      >
      </div>
    </div>
  )
}