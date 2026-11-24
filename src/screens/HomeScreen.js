import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import CategoryTile from '../components/CategoryTile';
import LeatherHeader from '../components/LeatherHeader';
import PaperCard from '../components/PaperCard';
import ScreenContainer from '../components/ScreenContainer';
import StatusMessage from '../components/StatusMessage';
import useApi from '../hooks/useApi';
import { getCategories } from '../services/mealApi';
import { colors, fonts, layout } from '../theme';
import { translateCategory } from '../utils/translations';

// Quantas colunas cabem na grade de acordo com a largura da tela.
function columnsFor(width) {
  if (width >= 700) return 4;
  if (width >= 480) return 3;
  return 2;
}

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { data: categories, loading, error, reload } = useApi(getCategories);

  const columns = columnsFor(width);
  const tileWidth = `${100 / columns}%`;

  const openCategory = (category) =>
    navigation.navigate('Category', { category: category.name });

  return (
    <ScreenContainer
      header={<LeatherHeader title="Caderno de Receitas" subtitle="sabores do mundo todo" />}
    >
      <PaperCard style={styles.intro}>
        <Text style={styles.introTitle}>Bem-vindo à cozinha!</Text>
        <Text style={styles.introText}>
          Escolha uma categoria no mural abaixo para ver as receitas.
        </Text>
      </PaperCard>

      <Text style={styles.sectionTitle}>Categorias</Text>

      {loading ? <StatusMessage message="Separando os ingredientes..." /> : null}
      {error ? (
        <StatusMessage
          type="error"
          message="Não foi possível carregar as categorias. Verifique sua conexão."
          onRetry={reload}
        />
      ) : null}

      {categories ? (
        <View style={styles.grid}>
          {categories.map((category, index) => (
            <CategoryTile
              key={category.id}
              category={category}
              label={translateCategory(category.name)}
              index={index}
              width={tileWidth}
              onPress={() => openCategory(category)}
            />
          ))}
        </View>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  intro: {
    marginBottom: layout.gutter,
    transform: [{ rotate: '-0.8deg' }],
  },
  introTitle: {
    fontFamily: fonts.title,
    fontSize: 22,
    color: colors.leather,
  },
  introText: {
    fontFamily: fonts.hand,
    fontSize: 17,
    color: colors.ink,
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: fonts.titleItalic,
    fontSize: 20,
    color: colors.stitch,
    marginTop: 4,
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
  },
});
