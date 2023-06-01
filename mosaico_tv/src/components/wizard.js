import React  from "react";
import { AntaresVerticalList } from 'antares';
import "../styles/wizard.css"
import ItemWizard from "./itemWizard.js";

const regioniItaliane = ['Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
    'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche', 'Molise', 'Piemonte',
    'Puglia', 'Sardegna', 'Sicilia', 'Toscana', 'Trentino-Alto Adige', 'Umbria', 'Valle d\'Aosta', 'Veneto'];

const Wizard = (props) => {

    return (
        <div className="wizard-overlay">
            <div className="wizard">
                <div className="wizard-title">
                    Seleziona la regione in cui ti trovi:
                </div>

                <AntaresVerticalList
                    forceFocus={true}
                    retainLastFocus={false}
                    fixed={true}
                    innerClassname='wizard-inner'
                    containerClassname='wizard-container'
                    preferredChildFocusKey={'focusable-item-wizard-0'}
                >
                    {regioniItaliane.map((item, key) => (
                        <ItemWizard
                            regione={item}
                            index={key}
                            setShowWizard={props.setShowWizard}
                        >

                        </ItemWizard>
                    ))}
                </AntaresVerticalList>
            </div>
        </div>
    );

}


export default Wizard;