import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useState,useCallback } from "react";
import { getAllNotes, fetchNotes } from "../Services/Notes/NotesInterface";
import { signOut } from "../Services/Auth/notesAuth";
import { useFocusEffect } from "@react-navigation/native";

export default function NotesListView({ navigation }) {
    const notesData = getAllNotes()
    const [fetchRequired, setFetchRequired] = useState(true)

    async function handleFetchError(e) {
        if (e.code == "permission-denied")
            await signOut()
    }

    useFocusEffect(useCallback(() => {
        fetchNotes().then(status => {
            if(status)
                setFetchRequired(!fetchRequired)
        }).catch(handleFetchError)
    }))

    function formatTitle(title) {
        const maxLength = 15
        if (title.length > maxLength) {
            const cropped = title.substring(0, maxLength)
            return cropped + ".."
        }
        return title
    }

    function redirectTo(pageName, prop) {
        navigation.navigate(pageName, prop)
    }

    function renderItem(item) {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.item} onPress={() => navigation.navigate("Note details", {
                    note: item
                })}>{formatTitle(item.title)}</Text>
                <View style={styles.deleteButton}>
                    <Button color={"red"} title={"Slet"} onPress={() => redirectTo("Delete note",
                        { note: item })} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonLayout}>
                <Button title={"Opret"} color={"green"} onPress={() => redirectTo("Create note")} />
            </View>
            <FlatList id={"notesListView"} style={styles.listView}
                data={notesData}
                renderItem={({ item }) => renderItem(item)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLayout: {
        width: "100%",
        maxHeight: 32
    },
    listView: {
        width: "100%",
    },
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
    item: {
        fontSize: 32
    }
});