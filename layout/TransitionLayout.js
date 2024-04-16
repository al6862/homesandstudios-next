import { useState, memo, useEffect } from 'react';

export default function TransitionLayout({ children }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeOut');

  useEffect(() => {
    setTransitionStage('fadeIn');
  }, []);

  useEffect(() => {
    if (children !== displayChildren) setTransitionStage('fadeOut');
  }, [children, displayChildren]);

  return (
    <>
      <div
        onTransitionEnd={() => {
          if (transitionStage === 'fadeOut') {
            setDisplayChildren(children);
            setTransitionStage('fadeIn');
          }
        }}
        className={`transition-layout ${transitionStage}`}
      >
        {displayChildren}
      </div>
      <style jsx>{`
        .transition-layout {
          opacity: 0;
          background-color: var(--cr-black);
          transition: 1s;
          width: 100%;
        }

        .fadeIn {
          opacity: 1;
        }
      `}</style>
    </>
  );
}
