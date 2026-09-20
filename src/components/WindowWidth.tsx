import { useEffect, useState } from "react";

export default function WindowWidth() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    // Cleanup: without this the listener outlives the component
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <span className="text-xs text-slate-500">Window: {width}px</span>;
}