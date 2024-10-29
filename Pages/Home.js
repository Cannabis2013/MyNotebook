import { Button, Image, StyleSheet, View, Text } from "react-native";
import { signOut } from "../Services/Auth/auth-firebase";
import { TouchableOpacity } from "react-native";

const listLogoUri = require("../assets/list.png")
const mapLogoUri = require("../assets/map.png")
const signOutLogoUri = require("../assets/signout.png")
const createLogoUri = require("../assets/create.png")
export default function HomePage({ navigation }) {
    function navigateTo(route) {
        navigation.navigate(route)
    }

    function renderTitle(title, tileImage, pressHandler) {
        const imageUrl = tileImage ?? ""
        return (
            <View style={{ padding: 8,width: 128, height: 128, backgroundColor: "rgba(0,0,180,0.3)", }}>
                <TouchableOpacity onPress={pressHandler}>
                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>
                        {title}
                    </Text>
                    <View style={{ height: 85, width: "100%",justifyContent: "center",alignItems: "center" }}>
                        <Image  source={imageUrl} style={{ height: 70, width: 70 }}></Image>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.collout}>
                    {renderTitle("Opret note", createLogoUri,() => navigateTo("Create note"))}
                    {renderTitle("Noter", listLogoUri,() => navigateTo("Notes List"))}
                </View>
                <View style={styles.collout}>
                    {renderTitle("Noter", mapLogoUri,() => navigateTo("Notes Map"))}
                    {renderTitle("Log ud", signOutLogoUri, signOut)}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        rowGap: 2
    },
    collout: {
        flexDirection: "row",
        columnGap: 2
    }
})