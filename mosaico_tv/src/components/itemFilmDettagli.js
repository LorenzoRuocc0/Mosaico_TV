import React from "react";
import { AntaresFocusable } from 'antares';

const ItemFilmDettagli = (props) => {
  const backgroundStyle = {
    background: `${props.backgroundItemFilm}`
  };

  return (
    <AntaresFocusable
      sourceVideo='//vjs.zencdn.net/v/oceans.mp4'
      classname='list-item'
      focusedClassname='list-item-focused'
      index={props.index}
      focusableId={`focusable-item-dettagli-${props.row}-${props.index}`}
      onEnterDown={() => {
        if (props.showDetails) {
          props.setShowDetails(false);
          props.setShowDetailsOnDetails(true);
        }

        if (props.showDetailsOnDetails) {
          props.setShowDetailsOnDetails(false);
          props.setShowDetails(true);
        }

        props.setIsLoading(true);
        window.spatial.pause(true);
        setTimeout(() => {
          props.setIsLoading(false);
          window.spatial.resume(true);
        }, 600);
      }}
    >
      <div className="background-shadow-item-film" style={backgroundStyle}>
        <div className="streaming-title">
          {"[" + props.row + "] " + props.title + " " + props.index}
        </div>
      </div>
    </AntaresFocusable>
  );
}

export default ItemFilmDettagli;
