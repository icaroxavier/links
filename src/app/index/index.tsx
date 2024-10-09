import { Alert, FlatList, Image, Linking, Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { Categories } from '@/components/categories';
import { Link } from '@/components/link';
import { Option } from '@/components/option';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { categories } from '@/utils/categories';
import { LinkStorage, linkStorage } from '@/storage/link-storage';


export default function Index() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedLink, setSelectedLink] = useState<LinkStorage | undefined>(undefined);
    const [category, setCategory] = useState(categories[0].name);
    const [links, setLinks] = useState([] as LinkStorage[]);
    const linksFilteredByCategory = useMemo(() => {
        return links.filter(link => link.category === category);
    }, [links, category]);

    async function getLinks() {
        try {
            const links = await linkStorage.get();
            setLinks(links);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os links');
            console.log(error);
        }
    }

    function handleDetails(selected: LinkStorage) {
        setIsModalVisible(true)
        setSelectedLink(selected);
    }

    function handleCloseModal() {
        setIsModalVisible(false);
        setSelectedLink(undefined);
    }

    async function removeLink(id: string) {
        try {
            await linkStorage.remove(id);
            getLinks();
            handleCloseModal();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o link');
            console.log(error);
        }
    }

    async function handleRemove() {
        if (!selectedLink) {
            return;
        }
        
        Alert.alert('Excluir', 'Deseja realmente excluir o link?', [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: () => removeLink(selectedLink.id)
            }   
        ])      
    }

    async function handleOpenLink() {
        if (!selectedLink)  return
        try {
            await Linking.openURL(selectedLink?.url);
            handleCloseModal()  
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível abrir o link');
            console.log(error);
        }
    }

    useFocusEffect(useCallback(() => {
        getLinks();
    }, []))

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('@/assets/logo.png')} style={styles.logo} />
                <TouchableOpacity onPress={() => router.navigate('/add')}>
                    <MaterialIcons name='add' size={32} color={colors.green[300]} />
                </TouchableOpacity>
            </View>
            <Categories selectedCategory={category} onChange={setCategory} />

            <FlatList
                data={linksFilteredByCategory}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Link name={item.name} url={item.url} 
                    onDetails={() => handleDetails(item)} />
                }
                style={styles.links}
                contentContainerStyle={styles.linksContent}
                showsVerticalScrollIndicator={false}
            />

            <Modal visible={isModalVisible} transparent animationType='slide'>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalCategory}>Curso</Text>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <MaterialIcons name='close' size={20} color={colors.gray[400]} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalLinkName}>{selectedLink?.name}</Text>
                        <Text style={styles.modalLinkUrl}>{selectedLink?.url}</Text>
                        <View style={styles.modalFooter}>
                            <Option name="Excluir" variant='secondary' icon='delete' onPress={handleRemove}></Option>
                            <Option name="Abrir" icon='language' onPress={handleOpenLink}></Option>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

