"use client";
import { useRef, useEffect } from "react";
import { useOnboardingContext } from "@/context/MyContext";

export default function MainContainerShadow({ children }) {
  const { hideAside } = useOnboardingContext();

  const shadowMainRef = useRef(null);
  useEffect(() => {
    const updateBlurCircleBoxHeight = () => {
      const shadowMainHeight = shadowMainRef.current.offsetHeight;
      const blurCircleBox = document.querySelector(".blurCircleBox");
      blurCircleBox.style.height = `${shadowMainHeight}px`;
    };

    updateBlurCircleBoxHeight();

    const handleResize = () => {
      updateBlurCircleBoxHeight();
    };

    const shadowMainElement = shadowMainRef.current;
    const observer = new ResizeObserver(handleResize);
    observer.observe(shadowMainElement);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={shadowMainRef}
        className={`${hideAside ? "onTable" : ""} shadowMain`}
      >
        {children}
      </div>
      <div className={`${hideAside ? "onTable" : ""} blurCircleBox`}>
        <div className="blurCircle"></div>
        <div className="blurCircle"></div>
        <div className="blurCircle"></div>
      </div>
    </>
  );
}
