import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ShoppingBag, Trash2 } from 'lucide-react-native';

import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { type CartItem, useCart } from '@/context/CartContext';

export default function CartScreen() {
  const router = useRouter();
  const { items, cartCount, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();

  const renderCartItem = ({ item }: { item: CartItem }) => {
    return (
      <Card variant="bordered" padding="md" style={styles.itemCard}>
        <Image
          source={{ uri: item.product.image }}
          style={styles.itemImage}
          resizeMode="cover"
        />

        <View style={styles.itemDetails}>
          <View style={styles.itemHeaderRow}>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {item.product.title}
            </Text>
            <Pressable
              onPress={() => removeFromCart(item.product.id)}
              hitSlop={8}
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.deleteButtonPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${item.product.title} from cart`}
            >
              <Trash2 size={16} color={Colors.light.danger} />
            </Pressable>
          </View>

          <Text style={styles.itemCategory}>{item.product.category}</Text>

          <View style={styles.itemFooterRow}>
            <Text style={styles.itemPrice}>
              ${(item.product.price * item.quantity).toFixed(2)}
            </Text>

            <QuantitySelector
              quantity={item.quantity}
              onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
              onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
            />
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <AppHeader title="My Cart" showBack showCart={false} />

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <ShoppingBag size={48} color={Colors.light.textSecondary} />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven&apos;t added anything to your cart yet.
          </Text>
          <Button
            title="Start Shopping"
            size="md"
            variant="primary"
            onPress={() => router.push('/')}
            style={styles.emptyCta}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.product.id}
            renderItem={renderCartItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </Text>
              <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.freeShipping}>FREE</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Estimated Total</Text>
              <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
            </View>

            <Button
              title="Proceed to Checkout"
              size="lg"
              variant="primary"
              onPress={() => {}}
              style={styles.checkoutButton}
            />

            <Pressable
              onPress={clearCart}
              hitSlop={8}
              style={styles.clearCartButton}
              accessibilityRole="button"
              accessibilityLabel="Clear entire shopping cart"
            >
              <Text style={styles.clearCartText}>Clear Cart</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.three,
    gap: Spacing.gap,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.gap,
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: Radius.small,
    backgroundColor: Colors.light.backgroundElement,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.light.text,
    flex: 1,
    marginRight: Spacing.xs,
  },
  deleteButton: {
    padding: Spacing.xs,
    borderRadius: Radius.pill,
  },
  deleteButtonPressed: {
    backgroundColor: Colors.light.backgroundElement,
  },
  itemCategory: {
    fontSize: Typography.micro,
    color: Colors.light.textSecondary,
    textTransform: 'uppercase',
    marginTop: Spacing.xxs,
    marginBottom: Spacing.xs,
  },
  itemFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPrice: {
    fontSize: Typography.body,
    fontWeight: '800',
    color: Colors.light.primary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
  },
  emptyIconCircle: {
    width: 88,
    height: 88,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  emptyTitle: {
    fontSize: Typography.title,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    fontSize: Typography.small,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.four,
  },
  emptyCta: {
    paddingHorizontal: Spacing.four,
  },
  summaryContainer: {
    backgroundColor: Colors.light.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.four,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    fontSize: Typography.small,
    color: Colors.light.textSecondary,
  },
  summaryValue: {
    fontSize: Typography.small,
    fontWeight: '600',
    color: Colors.light.text,
  },
  freeShipping: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.light.success,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: Spacing.xs,
  },
  totalLabel: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.light.text,
  },
  totalValue: {
    fontSize: Typography.heading,
    fontWeight: '800',
    color: Colors.light.primary,
  },
  checkoutButton: {
    marginTop: Spacing.two,
  },
  clearCartButton: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    marginTop: Spacing.xs,
  },
  clearCartText: {
    fontSize: Typography.caption,
    color: Colors.light.textSecondary,
    fontWeight: '600',
  },
});
