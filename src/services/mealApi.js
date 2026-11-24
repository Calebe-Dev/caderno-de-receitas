// Comunicação com a API pública TheMealDB (https://www.themealdb.com/api.php).
// A chave "1" é a chave de testes liberada pela própria API.
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

async function request(path) {
  const response = await fetch(`${BASE_URL}/${path}`);

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar a API`);
  }

  return response.json();
}

// Junta os campos strIngredient1..20 e strMeasure1..20 em uma lista.
function extractIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i += 1) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();

    if (name) {
      ingredients.push({ name, measure: measure || '' });
    }
  }

  return ingredients;
}

// Quebra o modo de preparo em passos, ignorando linhas vazias e títulos "STEP 1".
function extractSteps(instructions = '') {
  return instructions
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(step\s*\d+[:.)-]?|\d+[.)-])\s*/i, '').trim())
    .filter((line) => line.length > 2);
}

function normalizeMeal(meal) {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    thumb: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    tags: meal.strTags ? meal.strTags.split(',').filter(Boolean) : [],
    youtube: meal.strYoutube || null,
    source: meal.strSource || null,
    ingredients: extractIngredients(meal),
    steps: extractSteps(meal.strInstructions),
  };
}

function normalizeSummary(meal) {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    thumb: meal.strMealThumb,
    area: meal.strArea,
  };
}

export async function getCategories() {
  const data = await request('categories.php');

  return (data.categories || []).map((category) => ({
    id: category.idCategory,
    name: category.strCategory,
    thumb: category.strCategoryThumb,
    description: category.strCategoryDescription,
  }));
}

export async function getMealsByCategory(category) {
  const data = await request(`filter.php?c=${encodeURIComponent(category)}`);
  return (data.meals || []).map(normalizeSummary);
}

export async function searchMeals(term) {
  const data = await request(`search.php?s=${encodeURIComponent(term)}`);
  return (data.meals || []).map(normalizeMeal);
}

export async function getMealById(id) {
  const data = await request(`lookup.php?i=${encodeURIComponent(id)}`);
  return data.meals ? normalizeMeal(data.meals[0]) : null;
}

export async function getRandomMeal() {
  const data = await request('random.php');
  return data.meals ? normalizeMeal(data.meals[0]) : null;
}
