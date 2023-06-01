import React, { useEffect, useRef, useState } from "react";
import { AntaresVerticalList, AntaresHorizontalList, navigationUtilities } from 'antares';
import "../styles/dettagli.css"
import ItemVideo from "./itemVideo";
import "../styles/itemVideo.css"
import CarouselDettagli from "./carouselDettagli";
import ItemVideoDettagli from "./itemVideoDettagli";
import SettingVideoJS from "./settingVideoJS"

const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit" +
    "Curabitur non enim a diam maximus condimentum. Praesent venenatis, sapien vitae ullamcorper tempor," +
    " nisi elit hendrerit dolor, quis convallis lacus odio posuere elit. Suspendisse a fermentum mi. Sed sed mi sed arcu" +
    " ullamcorper tempus et sed augue. Integer et augue sollicitudin, lacinia risus in, mattis neque. Duis lobortis scelerisque semper. ";
const array_list = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
];


const Dettagli = (props) => {

    const isLive = props.itemDettagli1.type === "channel";
    const [lists, setLists] = useState([]);
    const [isVideoShowed, setIsVideoShowed] = useState(false);
    const isVideoShowedRef = useRef(false);


    useEffect(() => {
        const arrayList = [];

        array_list.forEach((elem, index) => {
            arrayList.push(
                <CarouselDettagli
                    key={index}
                    isLoading={props.isLoading}
                    setIsLoading={props.setIsLoading}
                    setShowDetails={props.setShowDetails}
                    showDetails={props.showDetails}
                    showDetailsOnDetails={props.showDetailsOnDetails}
                    setShowDetailsOnDetails={props.setShowDetailsOnDetails}
                    backgroundItemFilm={props.backgroundItemFilm}
                    forceFocus={index === 0 ? true : false}
                    index={index}
                    info={elem}
                />
            )
        })

        setLists(arrayList);
    }, []);

    useEffect(() => {
        const KeyPressed = (e) => {
            if ((e.keyCode === 8 || e.keyCode === 461)) {
                if (props.showDetails && !isVideoShowedRef.current) {
                    props.setShowDetails(false);
                    props.focusTo(window.previousFocus);
                }

                if (props.showDetailsOnDetails && !isVideoShowedRef.current) {
                    props.setShowDetailsOnDetails(false);
                    props.focusTo(window.previousFocus);
                }

            }
        };

        window.addEventListener('keydown', KeyPressed);


        return () => {
            window.removeEventListener('keydown', KeyPressed);
        };
    }, [props.showDetails]);


    useEffect(() => {

        isVideoShowedRef.current = isVideoShowed;

    }, [isVideoShowed]);

    return (
        <div>
            {
                isVideoShowed ?
                    <SettingVideoJS
                        sourceVideo={isLive ? props.itemDettagli1.hls : props.itemDettagli1.metaInfo.url}
                        type={isLive ? "application/x-mpegURL" : "video/mp4"}
                        setIsVideoShowed={setIsVideoShowed}
                        isVideoShowed={isVideoShowed}
                        isLive={isLive}
                    />

                    : null
            }
            < div className="dettagli-overlay" >

                <div className="player-videojs"></div>


                <div className="content-dettagli">
                    <AntaresVerticalList
                        fixed={true}
                        containerClassname={"vertical-container-dettagli"}
                        innerClassname={"vertical-inner-dettagli"}
                        retainLastFocus={true}
                        isGrid={true}
                    >
                        <AntaresHorizontalList
                            fixed={true}
                            forceFocus={true}
                            retainLastFocus={true}
                            innerClassname={'dettagli-inner'}
                            containerClassname={'dettagli-container'}
                            scrollOffset={{ up: 41, left: 0, down: 0, right: 0 }}
                            preferredChildFocusKey={'focusable-item-dettagli-player-0'}
                        >
                            <div className="display-dettagli">
                                <ItemVideoDettagli
                                    setIsVideoShowed={setIsVideoShowed}
                                    isLoading={props.isLoading}
                                    setIsLoading={props.setIsLoading}
                                    backgroundItemVideo={props.backgroundItemVideo}
                                    index={0}
                                    descrizione={isLive ? props.itemDettagli1.descrizione : props.itemDettagli1.title}
                                    thumbnail={props.itemDettagli1.thumbnail}
                                >

                                </ItemVideoDettagli>
                            </div>
                        </AntaresHorizontalList>

                        <div className="title">
                            Ti potrebbe piacere...
                        </div>

                        {lists}
                    </AntaresVerticalList>
                </div>
            </div >
        </div>
    );
    /*

                    return (

                    <div className="dettagli-overlay">

                        <div className="content-dettagli">
                            <AntaresVerticalList
                                fixed={true}
                                retainLastFocus={true}
                                isGrid={true}
                            >
                                <AntaresHorizontalList
                                    fixed={true}
                                    forceFocus={true}
                                    retainLastFocus={true}
                                    innerClassname='dettagli-inner'
                                    containerClassname='dettagli-container'
                                    scrollOffset={{ up: 41, left: 0, down: 0, right: 0 }}
                                    preferredChildFocusKey={'focusable-item-10000'}
                                >
                                    <div className="display-dettagli">
                                        <ItemVideo setShowDetails={props.setShowDetails} index={10000} descrizione={desc}></ItemVideo>
                                    </div>

                                </AntaresHorizontalList>




                                <AntaresHorizontalList
                                    fixed={true}
                                    forceFocus={false}
                                    retainLastFocus={true}
                                    innerClassname='horizontal-inner'
                                    containerClassname='horizontal-container'
                                    scrollOffset={{ up: 50, left: 0, down: 50, right: 0 }}
                                    preferredChildFocusKey={'focusable-item-0'}
                                    titleComponent={
                                        <div className="title">
                                            Ti potrebbe piacere...
                                        </div>
                                    }
                                >

                                    {array_list[0].map((item) => (
                                        <ItemFilm setShowDetails={props.setShowDetails} index={item} title={"Streaming title"}></ItemFilm>
                                    ))}

                                </AntaresHorizontalList>


                                <AntaresHorizontalList
                                    fixed={true}
                                    forceFocus={false}
                                    retainLastFocus={true}
                                    innerClassname='horizontal-inner'
                                    containerClassname='horizontal-container'
                                    scrollOffset={{ up: 50, left: 0, down: 0, right: 0 }}
                                    preferredChildFocusKey={'focusable-item-10'}
                                >

                                    {array_list[1].map((item) => (
                                        <ItemFilm setShowDetails={props.setShowDetails} index={item} title={"Streaming title"}></ItemFilm>
                                    ))}

                                </AntaresHorizontalList>
                            </AntaresVerticalList>
                        </div>
                    </div>
                    );
                    */
}


export default navigationUtilities(Dettagli);