/** @odoo-module */

//Represent global state of Point of Sale
import { PosGlobalState } from 'point_of_sale.models';
import Registries from 'point_of_sale.Registries';

const PosButtonRestrict = (PosGlobalState) => class PosButtonRestrict extends PosGlobalState {
    //Method for uploading data at the point of sale
    async _processData (loadedData) {
        await super._processData(...arguments);
        this.visible_backspace_btn = loadedData['visible_backspace_btn'];
    }
}

//Register and extend the PosGlobalState model with the new PosButtonRestrict class
Registries.Model.extend(PosGlobalState, PosButtonRestrict);
