//<module_name.class_name>
odoo.define('pos_custom.SampleButton', function (require) {
    'use strict';

    // Import class PosComponent
    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    //Registry components or models
    const Registries = require('point_of_sale.Registries');
    /*Import hook useListener
    Los hooks son funciones que permiten a los componentes de una aplicación React acceder a ciertas características,
    como el manejo de eventos.*/
    const { useListener } = require('@web/core/utils/hooks');

    // Extend class PosComponent
    class SampleButton extends PosComponent {
        setup () {
            //Initialize component
            super.setup();
            //Escucha el evento de click. Cuando se produce un click, se llamará al método sample_button_click.
            useListener('click', this.sample_button_click);
            // useListener('click', () => { console.log('*** Event of Sample Button2 ***'); });
        }
        sample_button_click () {
            console.log('*** Event of Sample Button ***')
        }
    }

    //Add a template to the class
    SampleButton.template = 'SampleButton';
    ProductScreen.addControlButton({
        component: SampleButton,
        position: ['before', 'OrderlineCustomerNoteButton']
    });
    //Registry <name_class>
    Registries.Component.add(SampleButton);
    return SampleButton;
})
