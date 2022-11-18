import { useState } from 'react';
import { FlatList } from 'react-native';
import { categories as mockCategories } from '../../mocks/categories';
import { Text } from '../Text';
import { Category, Icon } from './styles';

interface Category {
  _id: string;
  name: string;
  icon: string;
}

export function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories] = useState<Category[]>(mockCategories);


  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(category);
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={category => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;

        return (
          <Category onPress={() => handleSelectCategory(category._id)} >
            <Icon>
              <Text opacity={isSelected ? 1 : 0.6}>{category.icon}</Text>
            </Icon>
            <Text size={14} weight='600' opacity={isSelected ? 1 : 0.6}>{category.name}</Text>
          </Category>
        );
      }}
    />
  );
}

