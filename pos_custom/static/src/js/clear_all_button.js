/* @odoo-module */

import PosComponent from 'point_of_sale.PosComponent';
import ProductScreen from 'point_of_sale.ProductScreen';
import Registries from 'point_of_sale.Registries';
import { useListener } from '@web/core/utils/hooks';

class ClearAllButton extends PosComponent {
    setup () {
        super.setup();
        useListener('click', this.clear_all_lines);
    };

    async clear_all_lines () {
        console.log('clear_all_lines');
        let pos = this.env.pos;
        let current_order = pos.get_order();
        const { confirmed } = await this.showPopup('ConfirmPopup', {
            title: 'ConfirmPopup',
            body: 'Are you sure want to continue ?',
            confirmText: 'Yes',
            cancelText: 'No'
        });
        if (confirmed) {
            current_order.orderlines.filter(line => line.get_product()).forEach(line => {
                current_order.remove_orderline(line);
                console.log('line: ', line.product.display_name);
            });
        };
    };
};

ClearAllButton.template = 'ClearAllButton';
ProductScreen.addControlButton({
    component: ClearAllButton,
    position: ['before', 'ProductInfoButton']
});
Registries.Component.add(ClearAllButton);
return ClearAllButton;
