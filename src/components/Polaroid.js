import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, shadows } from '../theme';

// Foto revelada com borda branca, presa por um pedaço de fita adesiva.
// Aceita uma URL (uri) ou uma imagem local (source).
export default function Polaroid({ uri, source, caption, size = 120, tilt = 0, tape = true, style }) {
  return (
    <View style={[styles.frame, shadows.floating, { transform: [{ rotate: `${tilt}deg` }] }, style]}>
      {tape ? <View style={styles.tape} /> : null}
      <Image
        source={source || { uri }}
        style={[styles.image, typeof size === 'number' ? { width: size, height: size } : styles.fluid]}
        resizeMode="cover"
      />
      {caption ? (
        <Text style={styles.caption} numberOfLines={2}>
          {caption}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: '#FDFBF6',
    padding: 7,
    paddingBottom: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    alignItems: 'center',
  },
  image: {
    backgroundColor: colors.paperDark,
  },
  fluid: {
    width: '100%',
    aspectRatio: 1,
  },
  caption: {
    fontFamily: fonts.hand,
    color: colors.ink,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  tape: {
    position: 'absolute',
    top: -9,
    alignSelf: 'center',
    width: 54,
    height: 18,
    backgroundColor: colors.tape,
    borderWidth: 1,
    borderColor: 'rgba(200, 180, 130, 0.5)',
    transform: [{ rotate: '-3deg' }],
    zIndex: 2,
  },
});
