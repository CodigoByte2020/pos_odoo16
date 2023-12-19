{
    'name': 'Customized Point of Sale',
    'description': 'Módulo para la personalización del Point of Sale',
    'category': 'Uncategorized',
    'author': 'Gianmarco Contreras Pumamango',
    'website': 'https://github.com/CodigoByte2020',
    'version': '1.0',
    'depends': [
        'point_of_sale'
    ],
    'data': [
        'views/pos_config_view.xml'
    ],
    'assets': {
        'point_of_sale.assets': [
            'pos_custom/static/src/js/sample_button.js',
            'pos_custom/static/src/xml/sample_button.xml',
            'pos_custom/static/src/js/pos_button_restrict.js',
            'pos_custom/static/src/xml/NumpadWidget.xml',
            'pos_custom/static/src/js/clear_all_button.js',
            'pos_custom/static/src/xml/clear_all_button.xml'
        ]
    },
    'installable': True,
}
