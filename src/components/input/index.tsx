import { TextInput, TextInputProps } from "react-native"
import { styles } from "./styles"
import { colors } from "@/styles/colors"

export type InputProps = TextInputProps

export function Input(props: InputProps) {
    return (
        <TextInput 
            placeholderTextColor={colors.gray[400]} 
            style={styles.container} 
            {...props} 
        />
    )
}