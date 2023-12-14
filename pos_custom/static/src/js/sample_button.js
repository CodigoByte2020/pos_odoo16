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
    var core = require('web.core');
    var _t = core._t;

    // Extend class PosComponent
    class SampleButton extends PosComponent {

        setup () {
            //Initialize component
            super.setup();
            //Escucha el evento de click. Cuando se produce un click, se llamará al método sample_button_click.
//            useListener('click', this.sample_button_click);
            useListener('click', this.render_dynamic_data);
            // useListener('click', () => { console.log('*** Event of Sample Button2 ***'); });
        }

        async get_users () {
            let result_one = await this.rpc({
                model: 'res.users',
                method: 'search_read',
                args: [[], ['id', 'name', 'login', 'state']]
            });
            result_one.forEach(el => console.log('result_one: ', el));

            let result_two = await this.rpc({
                route: '/controller_example',
                params: {}
            });
            result_two.forEach(el => console.log('result_two', el));
        }

        async sample_button_click () {
            console.log('*** Event of Sample Button ***')
            //Only asynchronous methods
            this.get_users();
//            this.showPopup('ErrorPopup', {
//                title: 'Error message',
//                body: 'This is a error simple message.'
//            });
//
//            const { confirmed } = await this.showPopup('ConfirmPopup', {
//                title: 'ConfirmPopup',
//                body: 'Are you sure want to continue ?',
//                confirmText: 'Yes',
//                cancelText: 'No'
//            });
//            console.log(confirmed ? 'Confirmed' : 'Not confirmed');
//
//            this.showPopup('OfflineErrorPopup', {
//                title: 'Odoo error',
//                body: 'This is a screen of error. !!!'
//            });

            //Destructuración de objetos:
            //confirmed toma el valor de confirmed devuelto, selectedOption toma el valor de payload devuelto
            const { confirmed, payload: selectedOption } = await this.showPopup('SelectionPopup', {
                title: _t('Are you is a good Python Developer ?'),
                list: [
                    {'id': 0, 'label': _t('Yes'), 'item': _t('You pressed Yes')},
                    {'id': 1, 'label': _t('No'), 'item':  _t('You pressed No')},
                    {'id': 2, 'label': _t('Not sure'), 'item': _t('You pressed Not sure')}
                ]
            });
            console.log('confirmed: ', confirmed);
            console.log('selectedOption: ', selectedOption);

//            const info = await this.env.pos.getClosePosInfo();
//            this.showPopup('ClosePosPopup', {
//                info: info,
//                keepBehind: true
//            })
        }

        // *****************************************************************************************************

        async render_dynamic_data () {
            let language_list = [];
            let languages = await this.rpc({
                model: 'res.lang',
                method: 'search_read',
                args: [[]]
            });
            languages.forEach(language => {
                language_list.push({
                    'id': language.id,
                    'label': language.name,
                    'item': language
                });
            });
            const { confirmed, payload: selectedOption } = await this.showPopup('SelectionPopup', {
                title: 'Active languages',
                list: language_list
            });
            console.log('confirmed => ', confirmed);
            console.log('selectedOption => ', selectedOption ? selectedOption.name : selectedOption);
        };
    };

    //Add a template to the class
    SampleButton.template = 'SampleButton';
    ProductScreen.addControlButton({
        component: SampleButton,
        position: ['before', 'OrderlineCustomerNoteButton']
    });
    //Registry <name_class>
    Registries.Component.add(SampleButton);
    return SampleButton;
});
