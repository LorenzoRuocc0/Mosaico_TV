import React, { useRef, useState, useEffect } from "react";
import { AntaresFocusable, AntaresScrollableTextArea, navigationUtilities } from 'antares';
import ScrollableArea from "./scroll-view";


const ItemSetting = (props) => {
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



    const onEnterPress = () => {

        if (!props.isPopup && !props.isWizard) {
            setScrollableVisible(!isScrollableVisible);
            window.previousFocusSetting = window.spatial.focusKey;
            props.focusTo(`scrollableArea-${props.index}`);
            props.setDetailsOpened(true);
        } else if (props.isPopup) {
            props.openPopup(props.index);
            window.previousFocusSetting = window.spatial.focusKey;
            props.focusTo(`scrollableArea-${props.index}`);
            props.setDetailsOpened(true);
        } else if (props.isWizard) {
            props.setIsLoading(true);
            window.spatial.pause(true);
            setTimeout(() => {
                props.setIsLoading(false);
                window.spatial.resume(true);
            }, 500);
            props.setShowWizard(true);
            window.previousFocusSetting = window.spatial.focusKey;
            props.focusTo(`focusable-item-wizard-0`);

        }

    }


    const onEnterPressScrollable = () => {
        if (!props.isPopup) {
            setScrollableVisible(!isScrollableVisible);
            props.focusTo(window.previousFocusSetting);
            props.setDetailsOpened(false);
        }
    }


    const [isScrollableVisible, setScrollableVisible] = useState(false);
    const isScrollableVisibleRef = useRef(isScrollableVisible);

    useEffect(() => {
        isScrollableVisibleRef.current = isScrollableVisible;
    }, [isScrollableVisible]);

    useEffect(() => {
        const KeyPressed = (e) => {
            if (e.keyCode === 8 || e.keyCode === 461) {
                if (isScrollableVisibleRef.current) {
                    setScrollableVisible(false);
                    props.focusTo(window.previousFocusSetting);
                    props.setDetailsOpened(false);
                }
            }
        };

        window.addEventListener('keydown', KeyPressed);

        return () => {
            window.removeEventListener('keydown', KeyPressed);
        };
    }, []);



    return (

        <div className="item">

            <AntaresFocusable
                onEnterDown={onEnterPress}
                classname={isScrollableVisible ? "setting-item-focused" : "setting-item"}
                focusedClassname='setting-item-focused'
                index={props.index}
                focusableId={`focusable-item-${props.index}`}
            >
                <div className="nome">
                    {props.titolo}
                </div>

            </AntaresFocusable>


            {(isScrollableVisible && !props.isPopup)
                &&
                <ScrollableArea
                    isScrollableVisible={true}
                    setScrollableVisible={setScrollableVisible}
                    className={props.isPopup ? "popupScrollableContainer" : "scrollableContainer"}
                    focusedClassname={props.isPopup ? "popupFocused" : "scrollFocused"}
                    onEnterDown={onEnterPressScrollable}
                    height="470px"
                    onScroll={handleScroll}
                    index={props.index}
                    scrollOffset={20}
                    text={contenutoHTML}
                >

                </ScrollableArea>
            }



        </div >



    );

}
export default navigationUtilities(ItemSetting);