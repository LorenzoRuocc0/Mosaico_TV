import React, { useEffect, useState } from "react";
import { AntaresVerticalList, navigationUtilities } from 'antares';
import "../styles/impostazioni.css"
import ItemSetting from "./itemSetting";
import ItemPopup from "./itemPopup";

const contenutoHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod nulla vitae posuere lacinia. Proin quis risus ut turpis lacinia commodo. Suspendisse potenti.Nulla tristique lacus nunc, sed finibus elit vehicula vel.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo. Suspendisse potenti.Nulla tristique lacus nunc, sed finibus elit vehicula vel.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod nulla vitae posuere lacinia. Proin quis risus ut turpis lacinia commodo. Suspendisse potenti.Nulla tristique lacus nunc, sed finibus elit vehicula vel.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo. Suspendisse potenti.Nulla tristique lacus nunc, sed finibus elit vehicula vel.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod nulla vitae posuere lacinia. Proin quis risus ut turpis lacinia commodo. Suspendisse potenti.Nulla tristique lacus nunc, sed finibus elit vehicula vel.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo. Suspendisse potenti.Nulla tristique lacus nunc, sed finibus elit vehicula vel.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod nulla vitae posuere lacinia. Proin quis risus ut turpis lacinia commodo. Suspendisse potenti.Nulla tristique lacus nunc, sed finibus elit vehicula vel.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo. Suspendisse potenti.Nulla tristique lacus nunc, sed finibus elit vehicula vel.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer euismod nulla vitae posuere lacinia.Proin quis risus ut turpis lacinia commodo. ";
const Impostazioni = (props) => {

  const [deviceInfo, setDeviceInfo] = useState("");
  const [contenutoInfo, setContenutoInfo] = useState("Failed to get TV device information");



  useEffect(() => {
    const webOS = window.webOS || null;
    if (webOS === null)
      console.log("webOS è null");
    var request = webOS?.service?.request(
      'luna://com.webos.service.tv.systemproperty',
      {
        method: 'getSystemInfo',
        parameters: {
          keys:
            ['modelName',
              'firmwareVersion',
              'UHD',
              'sdkVersion',
              'hdr10',
              'dolbyVision',
              '_3d'
            ],
        },
        onComplete: function (inResponse) {
          var isSucceeded = inResponse.returnValue;

          if (isSucceeded) {
            console.log('Result systemInfo: ' + JSON.stringify(inResponse));
            const deviceInfo = inResponse;
            setDeviceInfo(deviceInfo);
            const contentInfo =
              "<p>Nome modello : " + deviceInfo.modelName + "</p>" +
              "<p>Versione firmware : " + deviceInfo.firmwareVersion + "</p>" +
              "<p>UHD : " + (deviceInfo.UHD ? "Si" : "No") + "</p>" +
              "<p>Risoluzione : " + window.screen.width + "*" + window.screen.height + "</p>" +
              "<p>Supporto HDR10 : " + (deviceInfo.hdr10 ? "Si" : "No") + "</p>" +
              "<p>Dolby Vision : " + (deviceInfo.dolbyVision ? "Si" : "No") + "</p>" +
              "<p>Supporto 3D : " + (deviceInfo._3d ? "Si" : "No") + "</p>"

            setContenutoInfo(contentInfo);
          } else {
            console.log('Failed to get TV device information');
            return;
          }
        },
      }
    );

  }, []);


  const [isDetailsOpened, setDetailsOpened] = useState(false);


  useEffect(() => {
    const KeyPressed = (e) => {
      if ((e.keyCode === 8 || e.keyCode === 461)) {
        if (!isDetailsOpened)
          props.focusTo("focusable-item-navbar-2");
      }
    };

    window.addEventListener('keydown', KeyPressed);


    return () => {
      window.removeEventListener('keydown', KeyPressed);
    };
  }, [[isDetailsOpened]]);

  const _setDetailOpended = (value) => {
    setDetailsOpened(value)
  }

  return (
    <div className="horizontal-settings">

      <div className="title-settings">
        Impostazioni
      </div>

      <AntaresVerticalList
        /* fixed={true}
        adjustFixed={true} */
        forceFocus={true}
        retainLastFocus={true}
        innerClassname='settings-inner'
        containerClassname='settings-container'
        preferredChildFocusKey={'focusable-item-0'}>

        <ItemSetting
          contenutoHTML={contenutoHTML}
          setDetailsOpened={_setDetailOpended}
          index={0}
          isPopup={false}
          titolo={"Privacy Policy"}
        />
        <ItemSetting
          setIsLoading={props.setIsLoading}
          isWizard={true}
          showWizard={props.showWizard}
          setShowWizard={props.setShowWizard}
          contenutoHTML={contenutoHTML}
          setDetailsOpened={_setDetailOpended}
          index={1}
          isPopup={false}
          titolo={"Cambio Regione"}
        />

        <ItemSetting
          openPopup={props.openPopup}
          showPopup={true}
          contenutoHTML={contenutoHTML}
          isPopup={true}
          setDetailsOpened={_setDetailOpended}
          index={2}
          titolo={"Informazioni Dispositivo"}
        />

        <ItemSetting
          openPopup={props.openPopup}
          showPopup={true}
          contenutoHTML={contenutoHTML}
          isPopup={true}
          setDetailsOpened={_setDetailOpended}
          index={3}
          titolo={"Informazioni App"}
        />


        {props.openPopupIndex === 2 && (
          <div className="overlay-popup">
            <ItemPopup
              closePopup={props.closePopup}
              showPopup={true}
              contenutoHTML={contenutoInfo}
              isPopup={true}
              setDetailsOpened={_setDetailOpended}
              index={2}
            />
          </div>
        )}

        {props.openPopupIndex === 3 && (
          <div className="overlay-popup">
            <ItemPopup
              closePopup={props.closePopup}
              showPopup={true}
              contenutoHTML={contenutoHTML}
              isPopup={true}
              setDetailsOpened={_setDetailOpended}
              index={3}
            />
          </div>
        )}

      </AntaresVerticalList>
    </div>
  );
}

export default navigationUtilities(Impostazioni);