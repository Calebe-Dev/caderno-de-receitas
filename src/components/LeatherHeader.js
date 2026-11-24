import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors, embossedText, fonts, layout, shadows } from '../theme';

// Cabeçalho de couro costurado, com título gravado e botão de latão para voltar.
export default function LeatherHeader({ title, subtitle, onBack, right }) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[colors.leatherLight, colors.leather, colors.leatherDark]}
      style={[styles.container, { paddingTop: insets.top + 10 }]}
    >
      <View style={styles.stitching}>
        <View style={styles.row}>
          <View style={styles.side}>
            {onBack ? (
              <BrassButton icon="chevron-back" onPress={onBack} label="Voltar" />
            ) : null}
          </View>

          <View style={styles.titleBox}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subtitle ? (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>

          <View style={[styles.side, styles.sideRight]}>{right}</View>
        </View>
      </View>
    </LinearGradient>
  );
}

export function BrassButton({ icon, onPress, label }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      style={({ pressed }) => [styles.brass, pressed ? shadows.buttonPressed : shadows.button]}
    >
      {({ pressed }) => (
        <LinearGradient
          colors={pressed ? [colors.brass, colors.brassLight] : [colors.brassLight, colors.brass, colors.brassDark]}
          style={styles.brassFill}
        >
          <Ionicons name={icon} size={20} color={colors.leatherDark} />
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: colors.leatherDark,
    zIndex: 2,
    ...shadows.floating,
  },
  stitching: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: layout.maxWidth,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.stitch,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  side: {
    width: 44,
    alignItems: 'flex-start',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  titleBox: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 22,
    color: colors.stitch,
    ...embossedText,
  },
  subtitle: {
    fontFamily: fonts.hand,
    fontSize: 14,
    color: 'rgba(233, 201, 143, 0.8)',
    marginTop: -2,
  },
  brass: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.brassDark,
    overflow: 'hidden',
  },
  brassFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
