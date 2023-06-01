import React, { useRef, useState, useEffect } from "react";
import { AntaresFocusable, AntaresScrollableTextArea, navigationUtilities } from 'antares';
import ScrollableArea from "./scroll-view";


const ItemPopup = (props) => {
    const contenutoHTML = props.contenutoHTML;


    const [isAtTop, setIsAtTop] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [isAtLeft, setIsAtLeft] = useState(false);
    const [isAtRight, setIsAtRight] = useState(false);

    const handleScroll = (isAtTop, isAtBottom, isAtLeft, isAtRight) => {
        setIsAtTop(isAtTop);
        setIsAtBottom(isAtBottom);
        setIsAtLeft(isAtLeft);
        setIsAtRight(isAtRight);
    };

    useEffect(() => {
        /* console.log("isAtTop: " + isAtTop);
        console.log("isAtBottom: " + isAtBottom);
        console.log("isAtLeft: " + isAtLeft);
        console.log("isAtRight: " + isAtRight);
        console.log("--------------------"); */
    }, [isAtTop, isAtBottom, isAtLeft, isAtRight]);





    const onEnterPressPopup = () => {
        props.focusTo(window.previousFocusSetting);
        props.setDetailsOpened(false);
        props.closePopup();
    }



    useEffect(() => {
        const KeyPressed = (e) => {
            if (e.keyCode === 8 || e.keyCode === 461) {
                props.closePopup();
                props.setDetailsOpened(false);
                props.focusTo(window.previousFocusSetting);
                
            }
        };

        window.addEventListener('keydown', KeyPressed);

        return () => {
            window.removeEventListener('keydown', KeyPressed);
        };
    }, []);



    return (

        <ScrollableArea
            isScrollableVisible={true}
            className={"popup-scrollable-container"}
            focusedClassname={"popup-focused"}
            onEnterDown={onEnterPressPopup}
            height="800px"
            onScroll={handleScroll}
            index={props.index}
            scrollOffset={20}
            text={contenutoHTML}>

        </ScrollableArea>



    );

}
export default navigationUtilities(ItemPopup);