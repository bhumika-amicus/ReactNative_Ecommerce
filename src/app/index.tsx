
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.heroSection}>
        <Text style={styles.title}>
          Welcome to React Native!
        </Text>

        <Text style={styles.subtitle}>
          Build amazing mobile apps with React Native and Expo.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => Alert.alert('Welcome!', 'You pressed Get Started.')}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: Spacing.four,
  },

  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    width: '100%',
  },

  title: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111111',
    marginBottom: Spacing.four,
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    color: '#555555',
    marginBottom: Spacing.four,
  },

  button: {
    backgroundColor: '#0866E8',
    width: '100%',
    height: 54,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.three,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
