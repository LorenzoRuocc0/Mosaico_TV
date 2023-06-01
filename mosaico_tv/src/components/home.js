import React, { useEffect, useState } from "react";
import { AntaresVerticalList, AntaresHorizontalList, navigationUtilities } from 'antares';
import "../styles/home.css"
import ItemVideo from "./itemVideo";
import CarouselHome from "./carouselHome";

const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit" +
    "Curabitur non enim a diam maximus condimentum. Praesent venenatis, sapien vitae ullamcorper tempor," +
    " nisi elit hendrerit dolor, quis convallis lacus odio posuere elit. Suspendisse a fermentum mi. Sed sed mi sed arcu" +
    " ullamcorper tempus et sed augue. Integer et augue sollicitudin, lacinia risus in, mattis neque. Duis lobortis scelerisque semper. ";

const array_list = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
];

const Home = (props) => {

    const [lists, setLists] = useState([]);

    useEffect(() => {
        const arrayList = [];
        console.log("carrelli in home = ", props.carrelli);

        props.carrelli.forEach((elem, index) => {
            arrayList.push(
                <CarouselHome
                    key={index}
                    setItemDettagli1={props.setItemDettagli1}
                    isLoading={props.isLoading}
                    setIsLoading={props.setIsLoading}
                    setShowDetails={props.setShowDetails}
                    showDetails={props.showDetails}
                    backgroundItemFilm={props.backgroundItemFilm}
                    index={index}
                    info={elem}
                    forceFocus={index === 0 ? true : false}
                    title={elem.name}
                    type={elem.type}
                />
            )
        })

        setLists(arrayList);
        console.log("quindicesimo carrello" , props.carrelli[15].data[0])
    }, []);

    useEffect(() => {
        const KeyPressed = (e) => {
            if ((e.keyCode === 8 || e.keyCode === 461) && !props.showDetails) {
                props.focusTo("focusable-item-navbar-0");
            }
        };

        window.addEventListener('keydown', KeyPressed);


        return () => {
            window.removeEventListener('keydown', KeyPressed);
        };
    }, [props.showDetails]);

    return (
        <div className='horizontal-lists'>

            <AntaresHorizontalList
                retainLastFocus={true}
                innerClassname='player-inner'
                containerClassname='player-container'
                preferredChildFocusKey={'focusable-item-10000'}
            >
                <div className="display-home">
                    <ItemVideo
                        sourceVideo={props.carrelli[15].data[0].metaInfo.url}
                        setItemDettagli1={props.setItemDettagli1}
                        elem={props.carrelli[15].data[0]}
                        thumbnail={props.carrelli[15].data[0].thumbnail}
                        descrizione={props.carrelli[15].data[0].title}
                        setIsLoading={props.setIsLoading}
                        backgroundItemVideo={props.backgroundItemVideo}
                        setShowDetails={props.setShowDetails}
                        index={10000}
                    >
                    </ItemVideo>
                </div>

            </AntaresHorizontalList>



            <AntaresVerticalList
                fixed={true}
                retainLastFocus={true}
                isGrid={true}
                isSquareGrid={false}
                forceFocus={true}
                containerClassname='grid-container'
            >
                {lists}

            </AntaresVerticalList>


        </div>
    );
}

export default navigationUtilities(Home);