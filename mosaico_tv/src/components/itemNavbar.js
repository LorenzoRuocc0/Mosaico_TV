import React, { useState } from "react";
import { AntaresFocusable } from 'antares';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SmartDisplayRoundedIcon from '@mui/icons-material/SmartDisplayRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

const ItemNavbar = (props) => {
  let navigate = useNavigate();

  const onEnterPress = () => {
    navigate(props.path);
    props.onSelect();
    if (!props.isSelected) {
      props.setIsLoading(true);
      window.spatial.pause(true);
      setTimeout(() => {
        props.setIsLoading(false);
        window.spatial.resume(true);
      }, 500);
    }

  }



  const HomeWhite = <HomeRoundedIcon sx={{ fontSize: 40, color: "white", transition: "0.4s" }} />;
  const HomeBlue = <HomeRoundedIcon sx={{ fontSize: 40, color: "#127ac4", transition: "0.4s" }} />;
  const VideoWhite = <SmartDisplayRoundedIcon sx={{ fontSize: 40, color: "white", transition: "0.4s" }} />;
  const VideoBlue = <SmartDisplayRoundedIcon sx={{ fontSize: 40, color: "#127ac4", transition: "0.4s" }} />;
  const SettingWhite = <SettingsRoundedIcon sx={{ fontSize: 40, color: "white", transition: "0.4s" }} />;
  const SettingBlue = <SettingsRoundedIcon sx={{ fontSize: 40, color: "#127ac4", transition: "0.4s" }} />;

  const [isFocused, setFocused] = useState(false);

  let icon;
  if (props.text === "Home") {
    icon = props.isSelected ? HomeBlue : HomeWhite;
  } else if (props.text === "Catalogo") {
    icon = props.isSelected ? VideoBlue : VideoWhite;
  } else if (props.text === "Impostazioni") {
    icon = props.isSelected ? SettingBlue : SettingWhite;
  }

  return (
    <AntaresFocusable
      classname='navbar-item'
      focusedClassname='navbar-item-focused'
      index={props.index}
      focusableId={`focusable-item-navbar-${props.index}`}
      onEnterDown={onEnterPress}
      onFocus={() => {
        setFocused(true);
      }}
      onBlur={() => {
        setFocused(false);
      }}
    >
      <div>
        {icon}
      </div>
    </AntaresFocusable>
  );
}

export default ItemNavbar;