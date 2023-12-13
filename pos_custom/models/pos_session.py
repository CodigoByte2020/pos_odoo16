from odoo import fields, models


class PosSession(models.Model):
    _inherit = 'pos.session'

    # Process init data
    def _pos_data_process(self, loaded_data):
        super(PosSession, self)._pos_data_process(loaded_data)
        loaded_data['visible_backspace_btn'] = self.config_id.visible_backspace_btn
        print('_pos_data_process')
