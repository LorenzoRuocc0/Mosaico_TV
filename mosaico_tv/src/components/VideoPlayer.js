import React, { useEffect, useRef, useState } from 'react';
import '../styles/videoJS.css';
import { AntaresFocusable, AntaresHorizontalList, navigationUtilities } from 'antares';
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';

const BackWardIcon = <Replay10Icon sx={{ fontSize: 125, color: "white", transition: "0.6s" }} />;
const ForWardIcon = <Forward10Icon sx={{ fontSize: 125, color: "white", transition: "0.6s" }} />;
const PlayIcon = <PlayCircleOutlineIcon sx={{ fontSize: 125, color: "white", transition: "0.6s" }} />;
const PauseIcon = <PauseCircleOutlineIcon sx={{ fontSize: 125, color: "white", transition: "0.6s" }} />;
const BackWardIconFocused = <Replay10Icon sx={{ fontSize: 125, color: "#127ac4", transition: "0.6s" }} />;
const ForWardIconFocused = <Forward10Icon sx={{ fontSize: 125, color: "#127ac4", transition: "0.6s" }} />;
const PlayIconFocused = <PlayCircleOutlineIcon sx={{ fontSize: 125, color: "#127ac4", transition: "0.6s" }} />;
const PauseIconFocused = <PauseCircleOutlineIcon sx={{ fontSize: 125, color: "#127ac4", transition: "0.6s" }} />;
const ReplayIcon = <ReplayRoundedIcon sx={{fontSize: 125, color: "white", transition: "0.6s" }}/>
const ReplayIconFocused = <ReplayRoundedIcon sx={{fontSize: 125, color: "#127ac4", transition: "0.6s" }}/>

export const VideoJS = (props) => {

  const [interactionTimeout, setInteractionTimeout] = useState(null);
  const [showWrapper, setShowWrapper] = useState(true);
  const interactionTimeoutRef = useRef(null);
  const inactivityTimeoutRef = useRef(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const isPausedRef = useRef(true);
  const isFinished = useRef(false);
  const [indexFocused, setIndexFocused] = useState(1);
  const [isPaused, setIsPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const { options, onReady } = props;
  const defaultTime = "00:00";


  useEffect(() => {
    const handleKeyDown = (event) => {
      clearTimeout(inactivityTimeoutRef.current);

      if (!showWrapper) {
        const wrapper = document.getElementsByClassName('wrapper')[0];
        wrapper.style.opacity = '1';
        setShowWrapper(true);

      }


      clearTimeout(interactionTimeoutRef.current)

      interactionTimeoutRef.current = setTimeout(() => {
        const wrapper = document.getElementsByClassName('wrapper')[0];
        if (isPausedRef.current) {
          wrapper.style.opacity = '1';
          setShowWrapper(true);
        } else {
          wrapper.style.opacity = '0';
          setShowWrapper(false);
        }
      }, 5000);
    };

    const handleInactivity = () => {
      clearTimeout(interactionTimeoutRef.current);
      const wrapper = document.getElementsByClassName('wrapper')[0];
      console.log("isPausedRef = " + isPausedRef.current);
      console.log("isPaused = " + isPaused)
      if (isPausedRef.current) {
        wrapper.style.opacity = '1';
        setShowWrapper(true);
      } else {
        wrapper.style.opacity = '0';
        setShowWrapper(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    inactivityTimeoutRef.current = setTimeout(handleInactivity, 5000);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(interactionTimeoutRef.current);
      clearTimeout(inactivityTimeoutRef.current);
    };
  }, [showWrapper]);




  useEffect(() => {

    console.log("isLive = ", props.isLive);
    const KeyPressed = (e) => {
      if (e.keyCode === 8 || e.keyCode === 461 || e.keyCode === 10009) {
        props.focusTo("focusable-item-dettagli-player-0");
        props.setIsVideoShowed(false);
        console.log("focus to item video 0");
      }
    };

    window.addEventListener('keydown', KeyPressed);

    return () => {
      window.removeEventListener('keydown', KeyPressed);
      videoRef.current = null;
      playerRef.current = null;
      /*   const markerRef = useRef(null); */
      isPausedRef.current = false;
      setIndexFocused(1);
      setIsPaused(true);
      setProgress(0);
      const { options, onReady } = props;
    };

  }, []);



  useEffect(() => {

    if (!playerRef.current) {
      const videoElement = document.createElement('video');
      videoElement.classList.add('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      playerRef.current = window.videojs(videoElement, options, () => {
        onReady && onReady(playerRef.current);
      });
      const player = playerRef.current;
      const controlBar = player.controlBar;
      player.removeChild(controlBar);
      /* player.play(); */


    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef, onReady]);

  useEffect(() => {
    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  useEffect(() => {
    const playerProgressBar = playerRef.current;
    const utils = playerProgressBar.on('timeupdate', () => {
      const timeAtMoment = playerProgressBar.currentTime();
      const duration = playerProgressBar.duration();
      const progressPercent = (timeAtMoment / duration) * 100;
      setProgress(progressPercent);

      /*       // Aggiorno la posizione del marker
            const markerPosition = (progressPercent * markerRef.current.offsetWidth) / 100;
            markerRef.current.style.transform = `translateX(${markerPosition}px)`; */

    }
    )



    const player = playerRef.current;
    const canPlay = () => player.play();

    player.ready(function () {
      player.play();
    })
    if (player) {
      // Aggiungi il listener per l'evento oncanplay
      player.on('canplay', canPlay);
      setIsPaused(false);
    }

    player.on('ended', function () {
      console.log("VIDEO TERMINATO")
      setIsPaused(true);
      isPausedRef.current = true;
      isFinished.current = true;
    })

    player.on('waiting', function () {
      isFinished.current = false;
      document.getElementById("loader").style.display = 'block'; // Mostra il tuo spinner personalizzato durante il caricamento
    });

    player.on('playing', function () {
      document.getElementById("loader").style.display = 'none';
      setIsPaused(false);
      isPausedRef.current = false;
      isFinished.current = false;
    });


    return () => {
      playerProgressBar.off('timeupdate', utils);
      player.off("waiting")
      player.off('playing');
      player.off('canplay', canPlay);

    };


  }, []);


  const updateBar = (progressPercent) => {
    const progress = document.getElementById('my-progress-bar');
    progress.style.width = progressPercent + '%';
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onEnterPress = () => {
    if (props.isLive)
      return;
    const playerUtility = playerRef.current;

    if (indexFocused === 0) {
      playerUtility.currentTime(playerUtility.currentTime() - 10);
    }

    if (indexFocused === 1) {
      if (isPausedRef.current === false) {
        playerUtility.pause();
        setIsPaused(true);
      } else {
        playerUtility.play();
        setIsPaused(false);
      }
    }

    if (indexFocused === 2) {
      if (playerUtility.currentTime() === playerUtility.duration())
      {return;}
      playerUtility.currentTime(playerUtility.currentTime() + 10);
    }
  }

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);


  const noUpDown = (direction) => {
    if (direction === "up" || direction === "down")
      return false;
  }



  return (
    <div className='totalContainer'>

      <div id="loader">
        <div className="loader-container-player">
          <div className="loader" />
        </div>
      </div>
      <div data-vjs-player>
        <div ref={videoRef} className="video-container" />
      </div>

      <div className='wrapper' style={props.isLive ? { display: 'none' } : {}}>
        <AntaresHorizontalList
          remainInFocus={true}
          forceFocus={true}
          preferredChildFocusKey={'controlBarNavigation-1'}
          containerClassname={"antaresHorizontalListContainer"}
          innerClassname={"antaresHorizontalListInner"}
        >

          <div className='controlBarContainer'>
            <AntaresFocusable
              focusableId={`controlBarNavigation-${0}`}
              focusedClassname="buttonFocused"
              classname="button"
              onFocus={() => setIndexFocused(0)}
              onEnterDown={onEnterPress}
            >
              <div id='backwardButton' className='backwardButton'>
                {indexFocused === 0 ? BackWardIconFocused : BackWardIcon}
              </div>
            </AntaresFocusable>


            <AntaresFocusable
              focusableId={`controlBarNavigation-${1}`}
              focusedClassname="buttonFocused"
              classname="button"
              onFocus={() => setIndexFocused(1)}
              onEnterDown={onEnterPress}
            >
              <div id='playPauseButton' className='playPauseButton'>
                {isFinished.current ? (indexFocused === 1 ? ReplayIconFocused : ReplayIcon) : (isPaused ? (indexFocused === 1 ? PlayIconFocused : PlayIcon) : (indexFocused === 1 ? PauseIconFocused : PauseIcon))}
              </div>
            </AntaresFocusable>

            <AntaresFocusable
              focusableId={`controlBarNavigation-${2}`}
              focusedClassname="buttonFocused"
              classname="button"
              onFocus={() => setIndexFocused(2)}
              onEnterDown={onEnterPress}
            >
              <div id='forwardButton' className='forwardButton'>
                {indexFocused === 2 ? ForWardIconFocused : ForWardIcon}
              </div>
            </AntaresFocusable>
          </div>

        </AntaresHorizontalList>



        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
          {/* <div ref={markerRef} className="marker" /> */}
          <div className="time-display">
            <span className='timeText'>{playerRef.current ? formatTime((playerRef.current).currentTime()) : defaultTime}</span>
            <span className='timeText'>{playerRef.current ? "/" : "/"}</span>
            <span className='timeText'>{playerRef.current ? (formatTime((playerRef.current).duration()) !== "NaN:NaN" ? formatTime((playerRef.current).duration()) : defaultTime) : null}</span>

          </div>
        </div>
      </div>
    </div>
  );
}

export default navigationUtilities(VideoJS);
