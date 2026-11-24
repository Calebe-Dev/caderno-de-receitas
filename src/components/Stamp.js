import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../theme';

// Etiqueta de metal pendurada, usada para categoria, origem e tags.
export default function Stamp({ icon, label }) {
  return (
    <View style={styles.tag}>
      <View style={styles.hole} />
      {icon ? <Ionicons name={icon} size={13} color={colors.leatherDark} style={styles.icon} /> : null}
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brassLight,
    borderWidth: 1,
    borderColor: colors.brassDark,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    paddingVertical: 4,
    paddingLeft: 6,
    paddingRight: 10,
    marginRight: 8,
    marginBottom: 8,
    boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.7), inset 0px -2px 2px rgba(138,106,31,0.4), 0px 2px 3px rgba(30,14,4,0.35)',
  },
  hole: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.wood,
    marginRight: 6,
    boxShadow: 'inset 0px 1px 2px rgba(0,0,0,0.6)',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontFamily: fonts.title,
    fontSize: 12,
    color: colors.leatherDark,
    textShadowColor: 'rgba(255, 255, 255, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
});
