import React, { useState, useEffect } from "react";
import { AntaresFocusable, navigationUtilities } from 'antares';
import "../styles/itemVideo.css"
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';

const ItemVideoDettagli = (props) => {
    const backgroundStyleShadow = {
        backgroundImage: `${props.backgroundItemVideo}`
    };


    const [isFocused, setFocused] = useState(false);


    const PlayWhite = <PlayCircleRoundedIcon sx={{ fontSize: 100, color: "white", transition: "0.6s" }}></PlayCircleRoundedIcon>
    const PlayBlue = <PlayCircleRoundedIcon sx={{ fontSize: 130, color: "#127ac4", transition: "0.6s" }}></PlayCircleRoundedIcon>

    /*  useEffect(() => {
         if (isFullscreen) {
             const wrapper = document.getElementById('wrapper')
             console.log(wrapper)
             wrapper.requestFullscreen();
         }
     }, [isFullscreen]) */

    const onEnterDown = () => {
        window.previousFocusVideo = window.spatial.focusKey;

        props.setIsVideoShowed(true)
        props.focusTo(`controlBarNavigation-1`)
    }

    return (


        <AntaresFocusable
            classname='player-item'
            focusedClassname='player-item-focused'
            index={props.index}
            onFocus={() => { setFocused(true) }}
            onBlur={() => { setFocused(false) }}
            onEnterDown={onEnterDown}
            focusableId={`focusable-item-dettagli-player-${props.index}`}
        >


            <div className="img-background-dettaglio" style={{ background: `url(${props.thumbnail}) no-repeat`, backgroundSize : "cover"}}>
                <div className="background-shadow" style={backgroundStyleShadow}>
                    <div className="info">
                        <div className="icona-play">
                            {isFocused ? PlayBlue : PlayWhite}
                        </div>
                        <div className="descrizione">
                            {props.descrizione}
                        </div>
                    </div>
                </div>
            </div>
        </AntaresFocusable>

    );

}




export default navigationUtilities(ItemVideoDettagli);

