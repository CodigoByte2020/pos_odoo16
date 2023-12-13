from odoo import http
from odoo.http import request


class Example(http.Controller):

    @http.route('/controller_example', auth='user', type='json')
    def example_method(self):
        users = request.env['res.users'].search_read([], ['id', 'name', 'login', 'state'])
        return users

