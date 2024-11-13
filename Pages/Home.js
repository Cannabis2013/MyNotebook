import { StyleSheet, View} from "react-native";
import { signOut } from "../Services/Auth/auth-firebase";
import IconTile from "../Components/Controls/IconTile";

const listLogoUri = require("../assets/list.png")
const mapLogoUri = require("../assets/map.png")
const signOutLogoUri = require("../assets/signout.png")
const createLogoUri = require("../assets/create.png")

export default function HomePage({ navigation }) {
    function navigateTo(route) {
        navigation.navigate(route)
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.collout}>
                    <IconTile title={"Opret note"} imageUrl={createLogoUri} pressHandler={() => navigateTo("Create note")}/>
                    <IconTile title={"Noter"} imageUrl={listLogoUri} pressHandler={() => navigateTo("Notes List")}/>
                </View>
                <View style={styles.collout}>
                    <IconTile title={"Noter"} imageUrl={mapLogoUri} pressHandler={() => navigateTo("Notes Map")}/>
                    <IconTile title={"Log ud"} imageUrl={signOutLogoUri} pressHandler={signOut}/>
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