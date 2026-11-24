import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, shadows } from '../theme';
import { translateArea } from '../utils/translations';

// Ficha de receita: foto pequena, nome manuscrito e origem, num cartão de papel.
export default function RecipeRow({ meal, onPress }) {
  const area = translateArea(meal.area);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={meal.name}
      style={({ pressed }) => [styles.card, shadows.raised, pressed && styles.pressed]}
    >
      <View style={styles.photo}>
        <Image source={{ uri: `${meal.thumb}/small` }} style={styles.image} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {meal.name}
        </Text>
        {area ? (
          <View style={styles.stamp}>
            <Text style={styles.stampText}>Cozinha {area}</Text>
          </View>
        ) : null}
      </View>

      <Ionicons name="chevron-forward" size={22} color={colors.inkFaded} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.paper,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.paperEdge,
    borderLeftWidth: 6,
    borderLeftColor: colors.leather,
    padding: 10,
    marginBottom: 12,
  },
  pressed: {
    transform: [{ translateY: 2 }],
    backgroundColor: colors.paperDark,
  },
  photo: {
    padding: 4,
    backgroundColor: '#FDFBF6',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    transform: [{ rotate: '-2deg' }],
    ...shadows.raised,
  },
  image: {
    width: 64,
    height: 64,
    backgroundColor: colors.paperDark,
  },
  info: {
    flex: 1,
    marginHorizontal: 14,
    alignItems: 'flex-start',
  },
  name: {
    fontFamily: fonts.handBold,
    fontSize: 18,
    lineHeight: 22,
    color: colors.ink,
  },
  stamp: {
    marginTop: 6,
    borderWidth: 1.5,
    borderColor: colors.leather,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
    transform: [{ rotate: '-2deg' }],
  },
  stampText: {
    fontFamily: fonts.title,
    fontSize: 11,
    color: colors.leather,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
