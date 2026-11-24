import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, shadows } from '../theme';

// Campo de texto "afundado" na madeira, com sombra interna.
export default function InsetField({ value, onChangeText, onSubmit, placeholder, autoFocus, style }) {
  return (
    <View style={[styles.field, shadows.inset, style]}>
      <Ionicons name="search" size={18} color={colors.inkSoft} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor={colors.inkFaded}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        autoFocus={autoFocus}
        style={styles.input}
      />
      {value ? (
        <Ionicons
          name="close-circle"
          size={18}
          color={colors.inkFaded}
          onPress={() => onChangeText('')}
          accessibilityLabel="Limpar busca"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.paperDark,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.woodDark,
    paddingHorizontal: 14,
    minHeight: 46,
  },
  input: {
    flex: 1,
    fontFamily: fonts.hand,
    fontSize: 17,
    color: colors.ink,
    marginLeft: 8,
    paddingVertical: 8,
    outlineStyle: 'none',
  },
});
