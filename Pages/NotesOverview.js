import {Button, FlatList, StyleSheet, Text, View} from "react-native";

import {useState} from "react";
import {getAllNotes} from "../Notes/Notes";


const fetch = async () => await getAllNotes()

export default function NotesOverview({navigation}){
    const [notesData, setNotesData] = useState([])
    fetch().then(notes => setNotesData(notes))
    
    const renderItem = item => (
        <View style={styles.itemContainer}>
            <Text style={styles.item} onPress={() => navigation.navigate("Note details",{
                note: item
            })}>{item.title}</Text>
            <View style={styles.deleteButton}>
                <Button color={"red"} title={"Slet"} onPress={() => navigation.navigate("Delete note",{
                    note: item
                })}/>
            </View>
        </View>
    )
    
    return (
        <View style={styles.container}>
            <View style={styles.buttonLayout}>
                <Button title={"Opret"} color={"green"} onPress={() => navigation.navigate("Create note")}/>
            </View>
            <FlatList id={"notesListView"} style={styles.listView}
                      data={notesData}
                      renderItem={({item}) => renderItem(item)}/>
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