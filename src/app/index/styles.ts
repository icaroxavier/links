import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 62,
        flex: 1,
    },
    title: {
        color: colors.green[900],
        fontSize: 30
    },
    header: {
        paddingHorizontal: 24,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32
    },  
    logo: {
        height: 32,
        width: 38
    }
})