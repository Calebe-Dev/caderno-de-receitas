import { useState } from 'react';
import { Linking, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import GlossyButton from '../components/GlossyButton';
import IngredientItem from '../components/IngredientItem';
import LeatherHeader from '../components/LeatherHeader';
import PaperCard from '../components/PaperCard';
import Polaroid from '../components/Polaroid';
import ScreenContainer from '../components/ScreenContainer';
import Stamp from '../components/Stamp';
import StatusMessage from '../components/StatusMessage';
import useApi from '../hooks/useApi';
import { getMealById } from '../services/mealApi';
import { colors, fonts, layout } from '../theme';
import { translateArea, translateCategory } from '../utils/translations';

export default function RecipeScreen({ navigation, route }) {
  const { id, name } = route.params;
  const { width } = useWindowDimensions();
  const [checked, setChecked] = useState({});

  const { data: meal, loading, error, reload } = useApi(() => getMealById(id), [id]);

  // Em telas largas a foto e os ingredientes ficam lado a lado.
  const wide = width >= 640;
  const photoSize = Math.min(width - layout.gutter * 2 - 40, 300);

  const toggle = (index) => setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  const goBack = () => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home'));

  const header = (
    <LeatherHeader title={meal?.name || name || 'Receita'} subtitle="ficha da receita" onBack={goBack} />
  );

  if (loading || error || !meal) {
    return (
      <ScreenContainer header={header} scroll={false}>
        {loading ? <StatusMessage message="Pré-aquecendo o forno..." /> : null}
        {error ? (
          <StatusMessage type="error" message="Não foi possível abrir esta receita." onRetry={reload} />
        ) : null}
        {!loading && !error && !meal ? (
          <StatusMessage type="empty" message="Receita não encontrada." />
        ) : null}
      </ScreenContainer>
    );
  }

  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <ScreenContainer header={header}>
      <View style={[styles.top, wide && styles.topWide]}>
        <View style={styles.photoBox}>
          <Polaroid uri={meal.thumb} size={wide ? 260 : photoSize} tilt={-2} caption={meal.name} />
        </View>

        <View style={[styles.summary, wide && styles.summaryWide]}>
          <View style={styles.stamps}>
            {meal.category ? (
              <Stamp icon="pricetag" label={translateCategory(meal.category)} />
            ) : null}
            {meal.area ? <Stamp icon="earth" label={`Cozinha ${translateArea(meal.area)}`} /> : null}
            {meal.tags.map((tag) => (
              <Stamp key={tag} label={tag} />
            ))}
          </View>

          <View style={styles.actions}>
            {meal.youtube ? (
              <GlossyButton
                title="Assistir vídeo"
                icon="logo-youtube"
                variant="leather"
                onPress={() => Linking.openURL(meal.youtube)}
                style={styles.action}
              />
            ) : null}
            {meal.source ? (
              <GlossyButton
                title="Receita original"
                icon="open-outline"
                variant="brass"
                onPress={() => Linking.openURL(meal.source)}
                style={styles.action}
              />
            ) : null}
          </View>
        </View>
      </View>

      <PaperCard ruled style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Ingredientes</Text>
          <Text style={styles.counter}>
            {doneCount}/{meal.ingredients.length}
          </Text>
        </View>
        {meal.ingredients.map((ingredient, index) => (
          <IngredientItem
            key={`${ingredient.name}-${index}`}
            ingredient={ingredient}
            checked={!!checked[index]}
            onToggle={() => toggle(index)}
          />
        ))}
      </PaperCard>

      <PaperCard style={styles.sheet}>
        <Text style={styles.sheetTitle}>Modo de preparo</Text>
        {meal.steps.map((step, index) => (
          <View key={index} style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </PaperCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  top: {
    alignItems: 'center',
    marginBottom: layout.gutter,
  },
  topWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  photoBox: {
    paddingTop: 10,
    paddingBottom: layout.gutter,
  },
  summary: {
    width: '100%',
  },
  summaryWide: {
    flex: 1,
    marginLeft: 28,
    paddingTop: 16,
  },
  stamps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 8,
  },
  action: {
    flexGrow: 1,
    minWidth: 150,
  },
  sheet: {
    marginBottom: layout.gutter + 4,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  sheetTitle: {
    fontFamily: fonts.title,
    fontSize: 22,
    color: colors.leather,
    marginBottom: 8,
  },
  counter: {
    fontFamily: fonts.handBold,
    fontSize: 16,
    color: colors.green,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.leather,
    borderWidth: 1,
    borderColor: colors.leatherDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
    boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.35), 0px 2px 3px rgba(30,14,4,0.35)',
  },
  stepNumberText: {
    fontFamily: fonts.title,
    fontSize: 14,
    color: colors.stitch,
  },
  stepText: {
    flex: 1,
    fontFamily: fonts.hand,
    fontSize: 16,
    lineHeight: 24,
    color: colors.ink,
  },
});
