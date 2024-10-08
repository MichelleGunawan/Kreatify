import { useState, useEffect, RefObject } from "react";

const useIsWidthLessThan = (
  ref: RefObject<HTMLElement>,
  widthThreshold: number = 640
) => {
  const [isWidthLessThan, setIsWidthLessThan] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const handleResize = () => {
      setIsWidthLessThan(element.offsetWidth < widthThreshold);
    };

    handleResize(); // Check the width initially

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, widthThreshold]);

  return isWidthLessThan;
};

export default useIsWidthLessThan;
