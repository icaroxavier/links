import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useState } from "react";
import { categories } from "@/utils/categories";
import { linkStorage } from "@/storage/link-storage";

export default function Add() {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    async function handleAdd() {
        if (!category) {
            return Alert.alert('Categoria', 'Selecione uma categoria');
        }
        if (!name.trim()) {
            return Alert.alert('Nome', 'Informe o nome');
        }
        if (!url.trim()) {
            return Alert.alert('URL', 'Informe a URL');
        }
        try {
            await linkStorage.save({
                id: String(Date.now()),
                name,
                url,
                category
            })

            Alert.alert('Sucesso', 'Link adicionado com sucesso', [
                {
                    text: 'Ok',
                    onPress: () => router.back()
                }
            ]);

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível adicionar o link');
            console.log(error);
        }
    } 



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
                </TouchableOpacity>
                <Text style={styles.title}>Novo</Text>
            </View>
            <Text style={styles.label}>
                Selecione uma categoria
            </Text>
            <Categories onChange={setCategory} selectedCategory={category}/>
            <View style={styles.form}>
                <Input placeholder="Nome" value={name} onChangeText={setName} autoCorrect={false} />
                <Input placeholder="URL" value={url} onChangeText={setUrl} autoCorrect={false}  autoCapitalize="none"/>
                <Button title="Adicionar" onPress={handleAdd} />
            </View>
        </View>
    )
}