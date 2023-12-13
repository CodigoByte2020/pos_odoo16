from odoo import fields, models


class PosConfig(models.Model):
    _inherit = 'pos.config'

    visible_backspace_btn = fields.Boolean(string='¿Visible button backspace?')
