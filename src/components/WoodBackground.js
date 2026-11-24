import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../theme';

// Veios da madeira: faixas finas com larguras e posições variadas.
const GRAIN = [
  { top: '4%', height: 2 },
  { top: '11%', height: 1 },
  { top: '19%', height: 3 },
  { top: '27%', height: 1 },
  { top: '36%', height: 2 },
  { top: '44%', height: 1 },
  { top: '53%', height: 3 },
  { top: '61%', height: 1 },
  { top: '70%', height: 2 },
  { top: '78%', height: 1 },
  { top: '87%', height: 3 },
  { top: '95%', height: 1 },
];

// Fundo de mesa de madeira usado em todas as telas.
export default function WoodBackground({ children }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.woodLight, colors.wood, colors.woodDark]}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.grainClip} pointerEvents="none">
        <View style={styles.grainLayer}>
          {GRAIN.map((line, index) => (
            <View
              key={index}
              style={[styles.grain, { top: line.top, height: line.height, opacity: 0.5 + (index % 3) * 0.2 }]}
            />
          ))}
        </View>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.wood,
  },
  // Recorte separado para os veios girados não ultrapassarem a tela.
  grainClip: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  grainLayer: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ rotate: '-4deg' }, { scale: 1.2 }],
  },
  grain: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: colors.woodGrain,
  },
});
