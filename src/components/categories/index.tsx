import { categories } from "@/utils/categories";
import { FlatList } from "react-native";
import { Category } from "@/components/category";
import { styles } from "./styles";

export type CategoriesProps = {
    selectedCategory: string;
    onChange: (category: string) => void;
}

export function Categories({ selectedCategory, onChange }: CategoriesProps) {
    return (
        <FlatList 
            data={categories} 
            keyExtractor={item => item.id} 
            renderItem={({item}) => (
                <Category 
                    name={item.name} 
                    icon={item.icon} 
                    isSelected={item.name === selectedCategory} 
                    onPress={() => onChange(item.name)}
                />
            )} 
            horizontal
            style={styles.container}
            contentContainerStyle={styles.content}
            showsHorizontalScrollIndicator={false}
        />
    )
}