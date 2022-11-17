import { useState } from 'react';
import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { AddToCartButton, Image, Product, ProductDetails, Separator } from './styles';

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(category);
  }

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={products}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      ItemSeparatorComponent={Separator}
      keyExtactor={product => product._id}
      renderItem={({ item: product }) => {
        return (
          <Product >
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

            <AddToCartButton>
              <PlusCircle />
            </AddToCartButton>
          </Product>
        );
      }}
    />
  );
}

