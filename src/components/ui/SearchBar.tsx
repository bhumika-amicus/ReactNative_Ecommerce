import { Search, X } from 'lucide-react-native';
import { useRef } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  type TextInputInstance,
  View,
} from 'react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search products...',
}: SearchBarProps) {
  const inputRef = useRef<TextInputInstance>(null);

  const handleClear = () => {
    onChangeText('');
    inputRef.current?.blur();
  };

  return (
    <View style={styles.container}>
      <Search size={18} color={Colors.light.textSecondary} style={styles.searchIcon} />

      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />

      {value.length > 0 && (
        <Pressable onPress={handleClear} style={styles.clearButton} accessibilityLabel="Clear search">
          <X size={16} color={Colors.light.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.card,
    paddingHorizontal: Spacing.two,
    height: 44,
    marginBottom: Spacing.two,
  },
  searchIcon: {
    marginRight: Spacing.one,
  },
  input: {
    flex: 1,
    fontSize: Typography.small,
    color: Colors.light.text,
    paddingVertical: 0,
  },
  clearButton: {
    padding: Spacing.half,
  },
});
