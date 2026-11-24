import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import InsetField from '../components/InsetField';
import LeatherHeader from '../components/LeatherHeader';
import RecipeRow from '../components/RecipeRow';
import StatusMessage from '../components/StatusMessage';
import WoodBackground from '../components/WoodBackground';
import useApi from '../hooks/useApi';
import { getMealsByCategory } from '../services/mealApi';
import { colors, fonts, layout } from '../theme';
import { translateCategory } from '../utils/translations';

export default function CategoryScreen({ navigation, route }) {
  const { category } = route.params;
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('');

  const { data: meals, loading, error, reload } = useApi(
    () => getMealsByCategory(category),
    [category],
  );

  // Filtra localmente as receitas já carregadas da categoria.
  const visibleMeals = useMemo(() => {
    if (!meals) return [];
    const term = filter.trim().toLowerCase();
    return term ? meals.filter((meal) => meal.name.toLowerCase().includes(term)) : meals;
  }, [meals, filter]);

  const goBack = () => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home'));

  return (
    <WoodBackground>
      <LeatherHeader
        title={translateCategory(category)}
        subtitle={meals ? `${meals.length} receitas` : 'carregando...'}
        onBack={goBack}
      />

      {loading ? <StatusMessage message="Abrindo a gaveta de receitas..." /> : null}
      {error ? (
        <StatusMessage
          type="error"
          message="Não foi possível carregar as receitas desta categoria."
          onRetry={reload}
        />
      ) : null}

      {meals ? (
        <FlatList
          data={visibleMeals}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
          ListHeaderComponent={
            <View style={styles.filterBox}>
              <InsetField
                value={filter}
                onChangeText={setFilter}
                placeholder="Filtrar nesta categoria..."
              />
            </View>
          }
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhuma receita com "{filter}" por aqui.</Text>
          }
          renderItem={({ item }) => (
            <RecipeRow
              meal={item}
              onPress={() => navigation.navigate('Recipe', { id: item.id, name: item.name })}
            />
          )}
        />
      ) : null}
    </WoodBackground>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.gutter,
    paddingTop: layout.gutter,
  },
  filterBox: {
    marginBottom: layout.gutter,
  },
  empty: {
    fontFamily: fonts.hand,
    fontSize: 18,
    color: colors.stitch,
    textAlign: 'center',
    marginTop: 24,
  },
});
