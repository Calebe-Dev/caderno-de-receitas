import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, layout, shadows } from '../theme';

// Folha de papel envelhecido. Com "ruled" ganha as pautas e a margem de caderno.
export default function PaperCard({ children, ruled = false, style, contentStyle }) {
  return (
    <View style={[styles.card, shadows.raised, style]}>
      <LinearGradient
        colors={[colors.paper, colors.paper, colors.paperDark]}
        locations={[0, 0.6, 1]}
        style={StyleSheet.absoluteFill}
      />
      {ruled ? (
        <View style={styles.clip} pointerEvents="none">
          <View style={styles.ruledLayer}>
            {Array.from({ length: 60 }).map((_, index) => (
              <View key={index} style={styles.line} />
            ))}
          </View>
          <View style={styles.margin} />
        </View>
      ) : null}
      <View style={[styles.content, ruled && styles.ruledContent, contentStyle]}>{children}</View>
    </View>
  );
}

const LINE_HEIGHT = 28;

const styles = StyleSheet.create({
  card: {
    borderRadius: layout.radius - 4,
    borderWidth: 1,
    borderColor: colors.paperEdge,
    overflow: 'hidden',
    backgroundColor: colors.paper,
  },
  content: {
    padding: 16,
  },
  // Recorte próprio para as pautas não deixarem o cartão rolável.
  clip: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  ruledLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 52,
  },
  line: {
    height: LINE_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: colors.paperLine,
  },
  margin: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 36,
    width: 1.5,
    backgroundColor: colors.paperMargin,
  },
  ruledContent: {
    paddingLeft: 48,
  },
});

export { LINE_HEIGHT };
