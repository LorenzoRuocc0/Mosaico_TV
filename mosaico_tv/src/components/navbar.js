import React, { useState, useEffect } from "react";
import { AntaresVerticalList } from 'antares';
import ItemNavbar from "./itemNavbar";
import "../styles/navbar.css"

const Navbar = (props) => {
    const [selectedItem, setSelectedItem] = useState("home");
    const isCatalogoPage = window.location.hash.startsWith('#/catalogo');
    const isImpostazioniPage = window.location.hash.startsWith("#/impostazioni");

    useEffect(() => {
        if (isCatalogoPage)
            setSelectedItem("catalogo")
        else if (isImpostazioniPage)
            setSelectedItem("impostazioni")
    }, []);


    const SelectItem = (icona) => {
        setSelectedItem(icona);
    }

    return (
        <div className="navbar-container">
            <AntaresVerticalList
                forceFocus={false}
                retainLastFocus={true}
                innerClassname='navbar-inner'
                containerClassname='navbar-list'
                preferredChildFocusKey={'focusable-item-10000000'}
            >
                <ItemNavbar
                    isLoading={props.isLoading}
                    setIsLoading={props.setIsLoading}
                    text={"Home"}
                    index={0}
                    path={"/home"}
                    onSelect={() => SelectItem("home")}
                    isSelected={selectedItem === "home"}>
                </ItemNavbar>


                <ItemNavbar
                    isLoading={props.isLoading}
                    setIsLoading={props.setIsLoading}
                    text={"Catalogo"}
                    index={1}
                    path={"/catalogo"}
                    onSelect={() => SelectItem("catalogo")}
                    isSelected={selectedItem === "catalogo"}>

                </ItemNavbar>


                <ItemNavbar
                    isLoading={props.isLoading}
                    setIsLoading={props.setIsLoading}
                    text={"Impostazioni"}
                    index={2}
                    path={"/impostazioni"}
                    onSelect={() => SelectItem("impostazioni")}
                    isSelected={selectedItem === "impostazioni"}
                ></ItemNavbar>
            </AntaresVerticalList>
        </div>
    );
}

export default Navbar;