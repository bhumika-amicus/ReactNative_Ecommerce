import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Colors } from '@/constants/theme';
import { CartProvider } from '@/context/CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: Colors.light.background,
          },
        }}
      />
    </CartProvider>
  );
}
