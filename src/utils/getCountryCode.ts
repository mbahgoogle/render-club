const countryCodeMap: { [key: string]: string } = {
    'ad': 'ad', // Andorra
    'ae': 'ae', // United Arab Emirates
    'af': 'af', // Afghanistan
    'ag': 'ag', // Antigua and Barbuda
    'ai': 'ai', // Anguilla
    'al': 'al', // Albania
    'am': 'am', // Armenia
    'ao': 'ao', // Angola
    'aq': 'aq', // Antarctica
    'ar': 'ar', // Argentina
    'as': 'as', // American Samoa
    'at': 'at', // Austria
    'au': 'au', // Australia
    'aw': 'aw', // Aruba
    'ax': 'ax', // Åland Islands
    'az': 'az', // Azerbaijan
    'ba': 'ba', // Bosnia and Herzegovina
    'bb': 'bb', // Barbados
    'bd': 'bd', // Bangladesh
    'be': 'be', // Belgium
    'bf': 'bf', // Burkina Faso
    'bg': 'bg', // Bulgaria
    'bh': 'bh', // Bahrain
    'bi': 'bi', // Burundi
    'bj': 'bj', // Benin
    'bl': 'bl', // Saint Barthélemy
    'bm': 'bm', // Bermuda
    'bn': 'bn', // Brunei Darussalam 
    'bo': 'bo', // Bolivia
    'bq': 'bq', // Bonaire, Sint Eustatius and Saba
    'br': 'br', // Brazil
    'bs': 'bs', // Bahamas
    'bt': 'bt', // Bhutan
    'bv': 'bv', // Bouvet Island
    'bw': 'bw', // Botswana
    'by': 'by', // Belarus
    'bz': 'bz', // Belize
    'ca': 'ca', // Canada
    'cc': 'cc', // Cocos (Keeling) Islands
    'cd': 'cd', // DR Congo
    'cf': 'cf', // Central African Republic
    'cg': 'cg', // Congo
    'ch': 'ch', // Switzerland
    'ci': 'ci', // Côte D'Ivoire
    'ck': 'ck', // Cook Islands
    'cl': 'cl', // Chile
    'cm': 'cm', // Cameroon
    'cn': 'cn', // China
    'co': 'co', // Colombia
    'cr': 'cr', // Costa Rica
    'cu': 'cu', // Cuba
    'cv': 'cv', // Cape Verde
    'cw': 'cw', // Curaçao
    'cx': 'cx', // Christmas Island
    'cy': 'cy', // Cyprus
    'cz': 'cz', // Czech Republic
    'de': 'de', // Germany
    'dj': 'dj', // Djibouti
    'dk': 'dk', // Denmark
    'dm': 'dm', // Dominica
    'do': 'do', // Dominican Republic
    'dz': 'dz', // Algeria
    'ec': 'ec', // Ecuador
    'ee': 'ee', // Estonia
    'eg': 'eg', // Egypt
    'eh': 'eh', // Western Sahara
    'er': 'er', // Eritrea
    'es': 'es', // Spain
    'et': 'et', // Ethiopia
    'fi': 'fi', // Finland
    'fj': 'fj', // Fiji
    'fk': 'fk', // Falkland Islands (Malvinas)
    'fm': 'fm', // Micronesia
    'fo': 'fo', // Faroe Islands
    'fr': 'fr', // France
    'ga': 'ga', // Gabon
    'gb': 'gb', // United Kingdom
    'gd': 'gd', // Grenada
    'ge': 'ge', // Georgia
    'gf': 'gf', // French Guiana
    'gg': 'gg', // Guernsey
    'gh': 'gh', // Ghana
    'gi': 'gi', // Gibraltar
    'gl': 'gl', // Greenland
    'gm': 'gm', // Gambia
    'gn': 'gn', // Guinea
    'gp': 'gp', // Guadeloupe
    'gq': 'gq', // Equatorial Guinea
    'gr': 'gr', // Greece
    'gs': 'gs', // South Georgia
    'gt': 'gt', // Guatemala
    'gu': 'gu', // Guam
    'gw': 'gw', // Guinea-Bissau
    'gy': 'gy', // Guyana
    'hk': 'hk', // Hong Kong
    'hm': 'hm', // Heard Island and Mcdonald Islands
    'hn': 'hn', // Honduras
    'hr': 'hr', // Croatia
    'ht': 'ht', // Haiti
    'hu': 'hu', // Hungary
    'id': 'id', // Indonesia
    'ie': 'ie', // Ireland
    'il': 'il', // Israel
    'im': 'im', // Isle of Man
    'in': 'in', // India
    'io': 'io', // British Indian Ocean Territory
    'iq': 'iq', // Iraq
    'ir': 'ir', // Iran
    'is': 'is', // Iceland
    'it': 'it', // Italy
    'je': 'je', // Jersey
    'jm': 'jm', // Jamaica
    'jo': 'jo', // Jordan
    'jp': 'jp', // Japan
    'ke': 'ke', // Kenya
    'kg': 'kg', // Kyrgyzstan
    'kh': 'kh', // Cambodia
    'ki': 'ki', // Kiribati
    'km': 'km', // Comoros
    'kn': 'kn', // Saint Kitts and Nevis
    'kp': 'kp', // North Korea
    'kr': 'kr', // South Korea
    'kw': 'kw', // Kuwait
    'ky': 'ky', // Cayman Islands
    'kz': 'kz', // Kazakhstan
    'la': 'la', // Lao People's Democratic Republic
    'lb': 'lb', // Lebanon
    'lc': 'lc', // Saint Lucia
    'li': 'li', // Liechtenstein
    'lk': 'lk', // Sri Lanka
    'lr': 'lr', // Liberia
    'ls': 'ls', // Lesotho
    'lt': 'lt', // Lithuania
    'lu': 'lu', // Luxembourg
    'lv': 'lv', // Latvia
    'ly': 'ly', // Libya
    'ma': 'ma', // Morocco
    'mc': 'mc', // Monaco
    'md': 'md', // Moldova
    'me': 'me', // Montenegro
    'mf': 'mf', // Saint Martin (French Part)
    'mg': 'mg', // Madagascar
    'mh': 'mh', // Marshall Islands
    'mk': 'mk', // Macedonia
    'ml': 'ml', // Mali
    'mm': 'mm', // Myanmar
    'mn': 'mn', // Mongolia
    'mo': 'mo', // Macao
    'mp': 'mp', // Northern Mariana Islands
    'mq': 'mq', // Martinique
    'mr': 'mr', // Mauritania
    'ms': 'ms', // Montserrat
    'mt': 'mt', // Malta
    'mu': 'mu', // Mauritius
    'mv': 'mv', // Maldives
    'mw': 'mw', // Malawi
    'mx': 'mx', // Mexico
    'my': 'my', // Malaysia
    'mz': 'mz', // Mozambique
    'na': 'na', // Namibia
    'nc': 'nc', // New Caledonia
    'ne': 'ne', // Niger
    'nf': 'nf', // Norfolk Island
    'ng': 'ng', // Nigeria
    'ni': 'ni', // Nicaragua
    'nl': 'nl', // Netherlands
    'no': 'no', // Norway
    'np': 'np', // Nepal
    'nr': 'nr', // Nauru
    'nu': 'nu', // Niue
    'nz': 'nz', // New Zealand
    'om': 'om', // Oman
    'pa': 'pa', // Panama
    'pe': 'pe', // Peru
    'pf': 'pf', // French Polynesia
    'pg': 'pg', // Papua New Guinea
    'ph': 'ph', // Philippines
    'pk': 'pk', // Pakistan
    'pl': 'pl', // Poland
    'pm': 'pm', // Saint Pierre and Miquelon
    'pn': 'pn', // Pitcairn
    'pr': 'pr', // Puerto Rico
    'ps': 'ps', // Palestinian Territory
    'pt': 'pt', // Portugal
    'pw': 'pw', // Palau
    'py': 'py', // Paraguay
    'qa': 'qa', // Qatar
    're': 're', // Réunion
    'ro': 'ro', // Romania
    'rs': 'rs', // Serbia
    'ru': 'ru', // Russia
    'rw': 'rw', // Rwanda
    'sa': 'sa', // Saudi Arabia
    'sb': 'sb', // Solomon Islands
    'sc': 'sc', // Seychelles
    'sd': 'sd', // Sudan
    'se': 'se', // Sweden
    'sg': 'sg', // Singapore
    'sh': 'sh', // Saint Helena, Ascension and Tristan Da Cunha
    'si': 'si', // Slovenia
    'sj': 'sj', // Svalbard and Jan Mayen
    'sk': 'sk', // Slovakia
    'sl': 'sl', // Sierra Leone
    'sm': 'sm', // San Marino
    'sn': 'sn', // Senegal
    'so': 'so', // Somalia
    'sr': 'sr', // Suriname
    'ss': 'ss', // South Sudan
    'st': 'st', // Sao Tome and Principe
    'sv': 'sv', // El Salvador
    'sx': 'sx', // Sint Maarten (Dutch Part)
    'sy': 'sy', // Syrian Arab Republic
    'sz': 'sz', // Swaziland
    'tc': 'tc', // Turks and Caicos Islands
    'td': 'td', // Chad
    'tf': 'tf', // French Southern Territories
    'tg': 'tg', // Togo
    'th': 'th', // Thailand
    'tj': 'tj', // Tajikistan
    'tk': 'tk', // Tokelau
    'tl': 'tl', // Timor-Leste
    'tm': 'tm', // Turkmenistan
    'tn': 'tn', // Tunisia
    'to': 'to', // Tonga
    'tr': 'tr', // Turkey
    'tt': 'tt', // Trinidad and Tobago
    'tv': 'tv', // Tuvalu
    'tw': 'tw', // Taiwan
    'tz': 'tz', // Tanzania
    'ua': 'ua', // Ukraine
    'ug': 'ug', // Uganda
    'um': 'um', // United States Minor Outlying Islands
    'us': 'us', // United States
    'uy': 'uy', // Uruguay
    'uz': 'uz', // Uzbekistan
    'va': 'va', // Vatican City
    'vc': 'vc', // Saint Vincent and The Grenadines
    've': 've', // Venezuela
    'vg': 'vg', // Virgin Islands, British
    'vi': 'vi', // Virgin Islands, U.S.
    'vn': 'vn', // Viet Nam
    'vu': 'vu', // Vanuatu
    'wf': 'wf', // Wallis and Futuna
    'ws': 'ws', // Samoa
    'ye': 'ye', // Yemen
    'yt': 'yt', // Mayotte
    'za': 'za', // South Africa
    'zm': 'zm', // Zambia
    'zw': 'zw', // Zimbabwe
   

    'gb-wls': 'gb-wls', // Wales
    'gb-eng': 'gb-eng', // England
    'gb-sct': 'gb-sct', // Scotland
    'gb-nir': 'gb-nir', // Northern Ireland
    'gb-gib': 'gb-gib', // Gibraltar
    'gb-gg': 'gb-gg', // Guernsey 
    
};

export const getCountryCode = (countryCode: string): string => {
    return countryCodeMap[countryCode.toLowerCase()] || ''; // Kode negara tidak valid
};