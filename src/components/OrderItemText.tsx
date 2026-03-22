import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface OrderItemTextProps {
  name: string;
  quantity: number;
  specialInstructions?: string;
}

/**
 * Renders order item details in the driver's active order view.
 * Uses custom font renderer for brand consistency.
 */
class OrderItemTextErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Silently catch rendering errors — shows empty view as fallback
    console.warn('OrderItemText render error:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return <View />;
    }
    return this.props.children;
  }
}

export const OrderItemText: React.FC<OrderItemTextProps> = ({
  name,
  quantity,
  specialInstructions,
}) => {
  return (
    <OrderItemTextErrorBoundary>
      <View style={styles.container}>
        <Text style={styles.quantity}>{quantity}x</Text>
        <View style={styles.details}>
          <Text style={styles.name}>{name}</Text>
          {specialInstructions && (
            <Text style={styles.instructions}>{specialInstructions}</Text>
          )}
        </View>
      </View>
    </OrderItemTextErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', paddingVertical: 8 },
  quantity: { fontFamily: 'MealDash-Bold', fontSize: 16, width: 32 },
  details: { flex: 1 },
  name: { fontFamily: 'MealDash-Regular', fontSize: 15 },
  instructions: { fontFamily: 'MealDash-Light', fontSize: 13, color: '#666', marginTop: 2 },
});
