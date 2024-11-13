import { Button, StyleSheet, Text, View } from "react-native";

export default function NoteItem(props){
    function formatTitle(title) {
        const maxLength = 15
        if (title.length > maxLength) {
            const cropped = title.substring(0, maxLength)
            return cropped + ".."
        }
        return title
    }
    
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle} onPress={() => props.clickHandler(props.item)}>{formatTitle(props.item.title)}</Text>
            <View style={styles.deleteButton}>
                <Button color={"red"} title={"Slet"} onPress={() => props.deleteHandler(props.item)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 6,
        backgroundColor: "beige",
        borderBottomWidth: 1
    },
    deleteButton: {
        flex: 1,
        maxWidth: 64,
        maxHeight: 32,
        overflow: "hidden",
        borderRadius: 12
    },
    itemTitle: {
        fontSize: 32
    }
});