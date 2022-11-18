import { useState } from 'react';
import { FlatList } from 'react-native';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import { AddToCartButton, Image, ProductContainer, ProductDetails, Separator } from './styles';

interface MenuProps {
  products: Product[];
  onAddToCart(product: Product): void;
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <FlatList
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={Separator}
        showsHorizontalScrollIndicator={false}
        data={products}
        keyExtractor={product => product._id}
        renderItem={({ item: product }) => {
          return (
            <ProductContainer onPress={() => handleOpenModal(product)}>
              <Image
                source={{
                  uri: `http://192.168.0.174:3001/uploads/${product.imagePath}`
                }}
              />
              <ProductDetails>
                <Text weight='600'>{product.name}</Text>
                <Text size={14} color='#666' style={{ marginVertical: 8 }}>{product.description}</Text>
                <Text size={14} weight='600'>{formatCurrency(product.price)}</Text>
              </ProductDetails>

              <AddToCartButton onPress={() => onAddToCart(product)}>
                <PlusCircle />
              </AddToCartButton>
            </ProductContainer>
          );
        }}
      />

      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
    </>
  );
}

