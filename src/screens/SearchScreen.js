import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import InsetField from '../components/InsetField';
import LeatherHeader from '../components/LeatherHeader';
import RecipeRow from '../components/RecipeRow';
import StatusMessage from '../components/StatusMessage';
import WoodBackground from '../components/WoodBackground';
import { searchMeals } from '../services/mealApi';
import { colors, fonts, layout } from '../theme';

export default function SearchScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const [term, setTerm] = useState(route.params?.term || '');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Busca automaticamente depois que o usuário para de digitar por um instante.
  useEffect(() => {
    const query = term.trim();

    if (query.length < 2) {
      setResults(null);
      setError(null);
      return undefined;
    }

    let active = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const meals = await searchMeals(query);
        if (active) setResults(meals);
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    }, 450);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [term]);

  const goBack = () => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home'));

  const renderStatus = () => {
    if (loading) return <StatusMessage message="Procurando no caderno..." />;
    if (error) return <StatusMessage type="error" message="A busca falhou. Tente novamente." />;
    if (!results) {
      return (
        <StatusMessage
          type="empty"
          message="Digite o nome de um prato em inglês, como chicken, cake ou pasta."
        />
      );
    }
    return null;
  };

  return (
    <WoodBackground>
      <LeatherHeader title="Buscar receitas" subtitle="por nome do prato" onBack={goBack} />

      <View style={styles.fieldBox}>
        <InsetField
          value={term}
          onChangeText={setTerm}
          placeholder="Ex.: chicken, cake, soup..."
          autoFocus
        />
      </View>

      {renderStatus() || (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
          ListHeaderComponent={
            results.length ? (
              <Text style={styles.count}>
                {results.length} {results.length === 1 ? 'receita encontrada' : 'receitas encontradas'}
              </Text>
            ) : null
          }
          ListEmptyComponent={
            <StatusMessage type="empty" message={`Nenhuma receita encontrada para "${term.trim()}".`} />
          }
          renderItem={({ item }) => (
            <RecipeRow
              meal={item}
              onPress={() => navigation.navigate('Recipe', { id: item.id, name: item.name })}
            />
          )}
        />
      )}
    </WoodBackground>
  );
}

const styles = StyleSheet.create({
  fieldBox: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.gutter,
    paddingTop: layout.gutter,
  },
  list: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.gutter,
    paddingTop: layout.gutter,
  },
  count: {
    fontFamily: fonts.hand,
    fontSize: 16,
    color: colors.stitch,
    marginBottom: 10,
  },
});
