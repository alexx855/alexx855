import { useRef, useEffect, useCallback } from "react";
import { PixiBackground } from "./pixi-background";

export function Background() {
  const bgContainer = useRef<HTMLDivElement | null>(null);
  const pixiBgRef = useRef<PixiBackground | null>(null);

  useEffect(() => {
    console.log('initBackground');
    const canvasbgContainer = bgContainer.current;

    if (!canvasbgContainer) {
      return;
    }

    const pixiApp = new PixiBackground({
      backgroundColor: '#162233',
      antialias: true,
      // resolution: 1,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      width: canvasbgContainer.parentElement?.offsetWidth,
      height: canvasbgContainer.parentElement?.offsetHeight,
      container: canvasbgContainer,
    });

    canvasbgContainer.appendChild(pixiApp.view as any);
    pixiBgRef.current = pixiApp;
    pixiBgRef.current.startBackground();

    return () => {
      if (pixiBgRef.current) {
        pixiBgRef.current.destroy();
      }
      if (canvasbgContainer && canvasbgContainer.childElementCount > 0) {
        canvasbgContainer.lastChild?.remove();
      }

    }
  }, []);

  const onResize = (event: Event) => {
    // console.log('resize', event);
    const target: any = event.target
    const innerWidth = target.innerWidth;
    const innerHeight = target.innerHeight;
    // console.log('innerWidth', innerWidth, 'innerHeight', innerHeight);
    if (pixiBgRef.current) {
      pixiBgRef.current.resize();
    }
  };

  useEffect(() => {
    console.log('add resize  listener');
    //add eventlistener to window scroll
    window.addEventListener("resize", onResize);
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, []);

  const onScroll = (event: Event) => {
    console.log('scroll', event);
  }

  useEffect(() => {
    console.log('add scroll listener');
    //add eventlistener to window scroll
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, []);

  return (<>
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

    {/* workarround for touch scroll */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        width: '100%',
        height: '100%'
      }}
      id="touchScroll"
    >
    </div>
  </>)
}