import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { colors, embossedText, fonts, shadows } from '../theme';

const VARIANTS = {
  green: {
    normal: [colors.greenLight, colors.green, colors.greenDark],
    pressed: [colors.greenDark, colors.green],
    border: colors.greenDark,
    text: colors.white,
  },
  leather: {
    normal: [colors.leatherLight, colors.leather, colors.leatherDark],
    pressed: [colors.leatherDark, colors.leather],
    border: colors.leatherDark,
    text: colors.stitch,
  },
  brass: {
    normal: [colors.brassLight, colors.brass, colors.brassDark],
    pressed: [colors.brassDark, colors.brass],
    border: colors.brassDark,
    text: colors.leatherDark,
  },
};

// Botão em relevo com brilho superior, que "afunda" ao ser pressionado.
export default function GlossyButton({ title, icon, onPress, variant = 'green', style, disabled }) {
  const palette = VARIANTS[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        { borderColor: palette.border, opacity: disabled ? 0.6 : 1 },
        pressed ? shadows.buttonPressed : shadows.button,
        pressed && styles.pressed,
        style,
      ]}
    >
      {({ pressed }) => (
        <LinearGradient colors={pressed ? palette.pressed : palette.normal} style={styles.fill}>
          {!pressed ? <View style={styles.gloss} pointerEvents="none" /> : null}
          {icon ? <Ionicons name={icon} size={18} color={palette.text} style={styles.icon} /> : null}
          <Text
            style={[
              styles.text,
              { color: palette.text },
              variant === 'brass' ? styles.brassText : embossedText,
            ]}
          >
            {title}
          </Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pressed: {
    transform: [{ translateY: 2 }],
  },
  fill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  gloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontFamily: fonts.title,
    fontSize: 16,
    letterSpacing: 0.3,
  },
  brassText: {
    textShadowColor: 'rgba(255, 255, 255, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
});
