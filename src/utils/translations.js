// A API só fornece textos em inglês; aqui ficam os nomes em português
// das categorias e das nacionalidades exibidas nas etiquetas.
const categories = {
  Beef: 'Carne bovina',
  Breakfast: 'Café da manhã',
  Chicken: 'Frango',
  Dessert: 'Sobremesas',
  Goat: 'Cabrito',
  Lamb: 'Cordeiro',
  Miscellaneous: 'Diversos',
  Pasta: 'Massas',
  Pork: 'Carne suína',
  Seafood: 'Frutos do mar',
  Side: 'Acompanhamentos',
  Starter: 'Entradas',
  Vegan: 'Veganas',
  Vegetarian: 'Vegetarianas',
};

const areas = {
  American: 'Americana',
  British: 'Britânica',
  Canadian: 'Canadense',
  Chinese: 'Chinesa',
  Croatian: 'Croata',
  Dutch: 'Holandesa',
  Egyptian: 'Egípcia',
  Filipino: 'Filipina',
  French: 'Francesa',
  Greek: 'Grega',
  Indian: 'Indiana',
  Irish: 'Irlandesa',
  Italian: 'Italiana',
  Jamaican: 'Jamaicana',
  Japanese: 'Japonesa',
  Kenyan: 'Queniana',
  Malaysian: 'Malaia',
  Mexican: 'Mexicana',
  Moroccan: 'Marroquina',
  Polish: 'Polonesa',
  Portuguese: 'Portuguesa',
  Russian: 'Russa',
  Spanish: 'Espanhola',
  Thai: 'Tailandesa',
  Tunisian: 'Tunisiana',
  Turkish: 'Turca',
  Ukrainian: 'Ucraniana',
  Vietnamese: 'Vietnamita',
  Brazilian: 'Brasileira',
  Norway: 'Norueguesa',
  Unknown: 'Desconhecida',
};

export function translateCategory(name) {
  return categories[name] || name;
}

export function translateArea(name) {
  if (!name) return null;
  return areas[name] || name;
}
