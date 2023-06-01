import React, { useState } from "react";
import { AntaresFocusable } from 'antares';
import "../styles/itemVideo.css"
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';


const ItemVideo = (props) => {
    const backgroundStyleShadow = {
        backgroundImage: `${props.backgroundItemVideo}`
    };


    const [isFocused, setFocused] = useState(false);

    const PlayWhite = <PlayCircleRoundedIcon sx={{ fontSize: 90, color: "white", transition: "0.6s" }}></PlayCircleRoundedIcon>
    const PlayBlue = <PlayCircleRoundedIcon sx={{ fontSize: 100, color: "#127ac4", transition: "0.3s" }}></PlayCircleRoundedIcon>

    return (
        <AntaresFocusable
            classname='player-item'
            focusedClassname='player-item-focused'
            index={props.index}
            onFocus={() => { setFocused(true) }}
            onBlur={() => { setFocused(false) }}
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
            focusableId={`focusable-item${props.isDettagli ? "-dettagli" : ""}-${props.index}`}
        >

            <div className="img-background-home" style={{ background: `url(${props.thumbnail}) no-repeat`, backgroundSize: "cover" }}>
                <div className="background-shadow" style={backgroundStyleShadow} >
                </div>
                <div className="info">
                    <div className="icona-play">
                        {isFocused ? PlayBlue : PlayWhite}
                    </div>
                    <div className="descrizione">
                        {props.descrizione}
                    </div>
                </div>
            </div>

        </AntaresFocusable>

    );

}




export default ItemVideo;

