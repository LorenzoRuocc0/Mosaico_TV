import React, { useRef, useEffect } from 'react';
import VideoJS from './VideoPlayer.js';
import '../styles/videoJS.css';
import { navigationUtilities } from 'antares';

const SettingVideoJS = (props) => {
  const playerRef = useRef(null);



  const videoJsOptions = {
    controls: false,
    responsive: true,
    fluid: true,
    loop: false,
    disablePictureInPicture: true,
    playbackRates: [1, 1.25, 1.5, 2],
    controlBar: {
      skipButtons: {
        forward: 10,
        backward: 10,
      },
    },
    sources: [
      {
        src: props.sourceVideo,
        type: props.type,
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on('waiting', () => {
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });


  };

  return (
    <>
      {props.isVideoShowed ? (
        <VideoJS
          isLive={props.isLive}
          options={videoJsOptions}
          onReady={handlePlayerReady}
          setIsVideoShowed={props.setIsVideoShowed}
          isVideoShowed={props.isVideoShowed}
        />
      ) : null}
    </>
  );
};

export default navigationUtilities(SettingVideoJS);
