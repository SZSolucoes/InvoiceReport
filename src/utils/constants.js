
export const colorAppPrimary = '#0F1632';
export const colorAppSecondary = '#0195DB';
const sideMenuKeyValue = {
    regiao: 'Região',
    equipe: 'Equipe',
    estabelecimento: 'Estabelecimento',
    bu: 'BU',
    segmento: 'Segmento'
};

export const getMenuName = (value) => sideMenuKeyValue[value];

