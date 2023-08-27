import {StyleSheet, View, Text} from "react-native";
export default function NoteDetails({route,navigation}){
    const note = route.params.note
    
    return (
        <View style={styles.container}>
            <Text style={styles.noteTitle} >{note.title}</Text>
            <Text>{note.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 12
    },
    noteTitle: {
        fontSize: 24
    }
})
