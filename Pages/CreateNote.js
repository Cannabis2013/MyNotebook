import {Button, TextInput, View} from "react-native";
import {StyleSheet} from "react-native";
import {useState} from "react";
import {saveNote} from "../Notes/Notes";
import {launchCamera, pickImage} from "../Components/IODevices/Camera/images";

export default function CreateNote({navigation}){
    const [title, titleChanged] = useState("Title")
    const [content, contentChanged] = useState("Content")
    
    const handleSaveClicked = async () => {
        console.log(`Title: ${title} Content: ${content}`)
        await saveNote(title,content)
        navigation.goBack()
    }
    
    return (
        <View style={styles.container}>
            <TextInput onChangeText={titleChanged} style={styles.titleInput} placeholder={"Title"}/>
            <TextInput onChangeText={contentChanged} multiline editable style={styles.contentInput} placeholder={"Content"}/>
            <View style={styles.buttonGroup}>
                <Button title={"Vælg billed"} onPress={launchCamera}/>
                <Button title={"Gem"} onPress={async () => await handleSaveClicked()}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12
    },
    inputComp: {
        flexDirection: "row",
        rowGap: 6
    },
    inputLabel: {
        maxWidth: 64,
        fontSize: 24,
        textAlignVertical: "center"
    },
    titleInput: {
        width: "100%",
        backgroundColor: "white"
    },
    contentInput: {
        marginTop: 2,
        width: "100%",
        textAlignVertical: "top",
        backgroundColor: "white",
        minHeight: 256
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})