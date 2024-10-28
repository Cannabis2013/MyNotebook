import { Button, StyleSheet, View } from "react-native";
import { signOut } from "../Services/Auth/auth-firebase";

export default function HomePage({navigation}){
    function navigateTo(route){
        navigation.navigate(route)
    }

    return (
        <View style={styles.container}>
            <Button title="Opret note" onPress={() => navigateTo("Create note")} />
            <Button title="Noter (Listeform)" onPress={() => navigateTo("Notes List")}/>
            <Button title="Noter (Kort)" onPress={() => navigateTo("Notes Map")}/>
            <Button title="Log ud" onPress={signOut}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        rowGap: 6
    }
})