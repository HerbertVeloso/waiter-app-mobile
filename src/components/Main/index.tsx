import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { Button } from '../Button';
import { Cart } from '../Cart';
import { Categories } from '../Categories';
import { Header } from '../Header';
import { Empty } from '../Icons/Empty';
import { Menu } from '../Menu';
import { TableModal } from '../TableModal';
import { Text } from '../Text';
import { CategoriesContainer, CenteredContainer, Container, Footer, FooterContaier, MenuContainer } from './styles';

import { products as mockProducts } from '../../mocks/products';


export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading] = useState(false);
  const [products] = useState<Product[]>(mockProducts);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      if (itemIndex < 0) {
        return [...prevState, {
          quantity: 1,
          product,
        }];
      }

      const newCartItems = [...prevState];
      newCartItems[itemIndex].quantity += 1;

      return newCartItems;
    });
  }

  function handleDecrementToCart(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }

      newCartItems[itemIndex].quantity -= 1;

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header selectedTable={selectedTable} onCancel={handleResetOrder} />

        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator color='#d73035' size='large' />
          </CenteredContainer>
        ) : (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>

            {
              products.length > 0 ? (
                <MenuContainer>
                  <Menu
                    onAddToCart={handleAddToCart}
                    products={products}
                  />
                </MenuContainer>
              ) : (
                <CenteredContainer>
                  <Empty />
                  <Text color='#666' style={{ marginTop: 24 }}>Nenhum produto foi encontrado!</Text>
                </CenteredContainer>
              )
            }

          </>
        )}




      </Container>
      <Footer>
        <FooterContaier>
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
              Novo Pedido
            </Button>
          )}

          {!!selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementToCart}
              onOrderConfirmed={handleResetOrder}
            />
          )}
        </FooterContaier>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
