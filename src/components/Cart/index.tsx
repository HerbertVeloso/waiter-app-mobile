import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { Text } from '../Text';
import { Actions, Image, Item, ProductDetails, Summary, TextsContainer, TotalContainer } from './styles';

interface CartProps {
  cartItems: CartItem[];
  onAdd(product: Product): void;
  onDecrement(product: Product): void;
  onOrderConfirmed(): void;
}

export function Cart({ cartItems, onAdd, onDecrement, onOrderConfirmed }: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading] = useState(false);

  function handleConfirm() {
    setIsModalVisible(true);
  }

  function onOk() {
    onOrderConfirmed();
    setIsModalVisible(false);
  }

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={onOk}
      />

      {cartItems.length > 0 && (
        <FlatList
          style={{ marginBottom: 20, maxHeight: 140 }}
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductDetails>
                <Image
                  source={{
                    uri: `http://192.168.0.174:3001/uploads/${cartItem.product.imagePath}`
                  }}
                />
                <Text size={20} color='#666'>{cartItem.quantity}x</Text>
                <TextsContainer>
                  <Text size={14} weight='600' style={{ marginBottom: 4 }}>{cartItem.product.name}</Text>
                  <Text size={14} color='#666'>{formatCurrency(cartItem.product.price)}</Text>
                </TextsContainer>
              </ProductDetails>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 16 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />

      )}
      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color='#666'>Total</Text>
              <Text size={20} weight='600'>{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color='#999'>Seu carrinho está vazio</Text>
          )}

        </TotalContainer>
        <Button onPress={handleConfirm}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >Confirmar pedido</Button>
      </Summary>
    </>
  );
}
