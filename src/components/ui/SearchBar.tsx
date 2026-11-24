import {
  Keyboard,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { Search, X } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  onSubmitEditing?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Mobile-optimized SearchBar component.
 *
 * Cross-Platform Design Notes:
 * 1. Android lacks native 'clearButtonMode="while-editing"' (which only works on iOS).
 *    We provide an explicit, styled Pressable with a Lucide 'X' icon so both platforms
 *    behave identically.
 * 2. Mobile Keyboard tuning: returnKeyType="search", autoCapitalize="none",
 *    and autoCorrect={false} prevent aggressive autocorrect and display the proper search key.
 * 3. Android padding: paddingVertical: 0 removes default native Android input offsets.
 */
export function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search products...',
  autoFocus = false,
  onSubmitEditing,
  style,
}: SearchBarProps) {
  const handleClear = () => {
    onChangeText('');
    if (onClear) onClear();
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (onSubmitEditing) onSubmitEditing();
  };

  return (
    <View style={[styles.container, style]}>
      {/* 1. Leading Search Icon */}
      <Search
        size={18}
        color={Colors.light.textSecondary}
        style={styles.searchIcon}
      />

      {/* 2. Optimized Native TextInput */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.textSecondary}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={autoFocus}
        onSubmitEditing={handleSubmit}
        style={styles.input}
        accessibilityRole="search"
        accessibilityLabel="Search products"
      />

      {/* 3. Cross-Platform Clear (X) Button (Visible only when text is entered) */}
      {value.length > 0 && (
        <Pressable
          onPress={handleClear}
          hitSlop={8}
          style={({ pressed }) => [
            styles.clearButton,
            pressed && styles.clearButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Clear search text"
        >
          <X size={14} color={Colors.light.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.button,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: Spacing.three,
    height: 44,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: Spacing.two,
  },
  input: {
    flex: 1,
    fontSize: Typography.body,
    color: Colors.light.text,
    paddingVertical: 0,
    height: '100%',
  },
  clearButton: {
    width: 22,
    height: 22,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.two,
  },
  clearButtonPressed: {
    opacity: 0.7,
  },
});

