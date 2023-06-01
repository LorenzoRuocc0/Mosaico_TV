import React, { useEffect, useState } from "react";
import "../styles/itemVideo.css"
import ItemFilm from "./itemFilm";
import { AntaresHorizontalList, navigationUtilities } from 'antares';


const CarouselHome = (props) => {


    const [list, setList] = useState(null);

    useEffect(() => {

        const arrayList = [];
        props.info.data.forEach((item, index) => {
            arrayList.push(
                <ItemFilm
                    key={index}
                    setItemDettagli1={props.setItemDettagli1}
                    thumbnail={item.thumbnail}
                    setIsLoading={props.setIsLoading}
                    backgroundItemFilm={props.backgroundItemFilm}
                    setShowDetails={props.setShowDetails}
                    index={index}
                    row={props.index}
                    elem={item}
                    title={props.type === "channels" ? item.name : item.title}>
                </ItemFilm>
            )
        });

        setList(arrayList);
    }, [])


    return (
        list !== null ?
            <AntaresHorizontalList
                fixed={true}
                retainLastFocus={true}
                scrollOffset={{ up: 40, left: 0, down: 40, right: 0 }}
                innerClassname='horizontal-inner'
                containerClassname='horizontal-container'
                preferredChildFocusKey={'focusable-item-' + props.index + "-0"}
                forceFocus={props.forceFocus}
                titleComponent={
                    <div className="title">
                        {props.title}
                    </div>
                }
            >
                {list}

            </AntaresHorizontalList>
            : null
    );

}

export default navigationUtilities(CarouselHome);

