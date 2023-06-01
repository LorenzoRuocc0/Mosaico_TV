import React, { useEffect } from "react";
import { AntaresFocusable, navigationUtilities } from 'antares';
import "../styles/itemFilm.css"

const ItemWizard = (props) => {

    const onEnterPress = () => {
        props.focusTo(window.previousFocusSetting);
        props.setShowWizard(false)
    }

    useEffect(() => {
        const KeyPressed = (e) => {
            if (e.keyCode === 8 || e.keyCode === 461) {
                props.focusTo(window.previousFocusSetting);
                props.setShowWizard(false)
            }
        };

        window.addEventListener('keydown', KeyPressed);

        return () => {
            window.removeEventListener('keydown', KeyPressed);
        };
    }, []);

    return (
        <AntaresFocusable
            onEnterDown={onEnterPress}
            classname='wizard-item'
            focusedClassname='wizard-item-focused'
            index={props.index}
            focusableId={`focusable-item-wizard-${props.index}`}
        >
            <div className="nome-regione">
                {props.regione}
            </div>
        </AntaresFocusable>

    );

}

export default navigationUtilities(ItemWizard);
