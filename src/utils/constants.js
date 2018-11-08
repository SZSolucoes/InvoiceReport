
export const colorAppPrimary = '#0F1632';
export const colorAppSecondary = '#0195DB';
export const colorAppDiario = '#000062';
export const colorAppAcumulado = '#DD6F00';
export const colorAppProjecao = '#006666';

const sideMenuKeyValue = {
    regiao: 'Região',
    equipe: 'Equipe',
    estabelecimento: 'Estabelecimento',
    bu: 'BU',
    segmento: 'Segmento'
};

export const getMenuName = (value) => sideMenuKeyValue[value];

