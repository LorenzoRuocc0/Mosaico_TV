import React from "react";
import { AntaresFocusable } from 'antares';

const ItemFilm = (props) => {
  const backgroundStyle = {
    background: `${props.backgroundItemFilm}`
  };


  return (
    <AntaresFocusable
      classname='list-item'
      focusedClassname='list-item-focused'
      index={props.index}
      focusableId={`focusable-item-${props.row}-${props.index}`}
      onEnterDown={() => {
        props.setShowDetails(true);
        props.setItemDettagli1(props.elem);
        window.previousFocus = window.spatial.focusKey;

        props.setIsLoading(true);
        window.spatial.pause(true);
        setTimeout(() => {
          props.setIsLoading(false);
          window.spatial.resume(true);
        }, 600);
      }}
    >


      <div className="img-background" style={{ background: `url(${props.thumbnail}) no-repeat`, backgroundSize : "cover"}}>
        <div className="background-shadow-item-film" style={backgroundStyle}>
          <div className="streaming-title">
            {"[" + props.row + "] " + props.title + " " + props.index}
          </div>
        </div>
      </div>
    </AntaresFocusable>
  );
}

export default ItemFilm;
