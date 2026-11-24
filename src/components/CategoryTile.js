import { Pressable, StyleSheet } from 'react-native';

import Polaroid from './Polaroid';

// Foto de uma categoria; cada uma fica levemente torta, como presa num mural.
const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5];

export default function CategoryTile({ category, label, index, width, onPress }) {
  const tilt = TILTS[index % TILTS.length];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.tile,
        { width },
        pressed && { transform: [{ scale: 0.96 }] },
      ]}
    >
      <Polaroid uri={category.thumb} caption={label} size="fluid" tilt={tilt} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    padding: 10,
    paddingTop: 16,
  },
});
