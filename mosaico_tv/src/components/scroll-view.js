import { AntaresFocusable } from 'antares';
import React, { useRef, useCallback, useState } from 'react';

import "../styles/scrollable.css"

const ScrollableArea = (props) => {
  const containerRef = useRef(null);
  const isTop = useRef(false);
  const isBottom = useRef(false);
  const isLeft = useRef(false);
  const isRight = useRef(false);

  const scrollDiv = (direction) => {
    let scrolling = 0;

    if (direction === "up")
      scrolling = - props.scrollOffset;

    if (direction === "down")
      scrolling = + props.scrollOffset;

    containerRef.current.scrollTop += scrolling;


    if (props.isScrollableVisible)
      return false;
  }

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    isTop.current = (scrollTop === 0);
    isBottom.current = (scrollTop + clientHeight >= scrollHeight - 1);
    props.onScroll(isTop.current, isBottom.current);

    if (isBottom.current === true && !props.isLast) {
      return false;

    }

  }, [props.onScroll]);




  return (
    <AntaresFocusable
      onArrowPress={scrollDiv}
      onEnterDown={props.onEnterDown}
      focusableId={`scrollableArea-${props.index}`}
      focusedClassname={props.focusedClassname}
      classname="scroll" 
      scrollOffset={{ up: 140, down: 140 }} 
    >
      <div
        className={props.className}
        id='scrollableContainer'
        ref={containerRef}
        style={{ height: props.height }}
        onScroll={handleScroll}
        dangerouslySetInnerHTML={{ __html: props.text }}
      />
    </AntaresFocusable>
  );
};

export default ScrollableArea;