import { View, TouchableOpacity, Text} from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';

type LinkProps = {
    name: string;
    url: string;
    onDetails: () => void;      
}
export function Link({ name, url, onDetails }: LinkProps) {
    return (
        <View style={styles.container}>
            <View style={styles.details}>
                <Text style={styles.name} numberOfLines={1}>{name}</Text>
                <Text style={styles.url} numberOfLines={1}>{url}</Text>
            </View>
            <TouchableOpacity>
                <MaterialIcons name='more-horiz' size={20} color={colors.gray[400]} onPress={onDetails} />
            </TouchableOpacity>
        </View>
    )
}