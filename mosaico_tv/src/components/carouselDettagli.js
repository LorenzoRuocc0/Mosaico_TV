import React, { useEffect, useState } from "react";
import "../styles/itemVideo.css"
import ItemFilmDettagli from "./itemFilmDettagli";
import { AntaresHorizontalList, navigationUtilities } from 'antares';


const CarouselDettagli = (props) => {


    const [list, setList] = useState(null);

    useEffect(() => {

        const arrayList = [];
        props.info.forEach((item,index) => {
            arrayList.push(
                <ItemFilmDettagli
                    key={index}
                    sourceVideo={props.sourceVideo}
                    setIsLoading={props.setIsLoading}
                    showDetailsOnDetails={props.showDetailsOnDetails}
                    setShowDetailsOnDetails={props.setShowDetailsOnDetails}
                    backgroundItemFilm={props.backgroundItemFilm}
                    setShowDetails={props.setShowDetails}
                    showDetails={props.showDetails}
                    index={item}
                    row={props.index}
                    title={"Streaming title"}>
                </ItemFilmDettagli>
            )
        });

        setList(arrayList);
    }, [])


    return (

        <AntaresHorizontalList
            fixed={true}
            retainLastFocus={true}
            innerClassname='horizontal-inner'
            containerClassname='horizontal-container'
            scrollOffset={{ up: 32, left: 0, down: 32, right: 0 }}
            preferredChildFocusKey={`focusable-item-${props.info[0]}`}
        >

            {list}

        </AntaresHorizontalList>

    );

}

export default navigationUtilities(CarouselDettagli);

