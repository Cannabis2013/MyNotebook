import {StyleSheet, View, Text, Image} from "react-native";
export default function NoteDetails({route}){
    const note = route.params.note
    const image = () => {
        return (
            <Image id={"noteLogo"}  source={{uri: note.logoUri}} width={256} height={256}/>
        )
    }
    
    const showImage = () => {
        if(note.logoUri !== ""){
            return image()
        }
        else
            return (
                <Text>Intet billede at vise</Text>
            )
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.noteTitle} >{note.title}</Text>
            <Text style={styles.noteContent}>{note.content}</Text>
            <View style={styles.imageGroup}>
                {showImage()}
            </View>
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
        fontSize: 24,
        borderBottomWidth: 1,
        marginBottom: 6
    },
    noteContent: {
        minHeight: 128
    },
    imageLogo: {
        position: "absolute",
        left: 20,
        top: 150
    },
    imageGroup: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    }
})
