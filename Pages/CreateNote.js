import {Button, TextInput, View} from "react-native";
import {StyleSheet} from "react-native";
import {useState} from "react";
import {launchCamera} from "../Components/IODevices/Camera/images";
import {saveNote} from "../Notes/NotesInterface";

export default function CreateNote({navigation}){
    const [title, titleChanged] = useState("Title")
    const [content, contentChanged] = useState("Content")
    const [imageCaptured, setImageCaptured] = useState(false)
    const [imageUri,setImageUri] = useState("")
    
    const handleSaveClicked = async () => {
        await saveNote(title,content, imageUri,() => {
            navigation.goBack()
        })
    }
    
    const captureImage = async () => {
        const result = await launchCamera()
        if(result){
            setImageCaptured(true)
            setImageUri(result)
        }
    }

    const imageSelectGroup = () => {
        if(imageCaptured){
            return (
                <Button color={"red"} title={"Fortryd billede"} onPress={() => {
                    setImageUri("")
                    setImageCaptured(false)
                }}/>
        )
        }
        else {
            return (
                <Button title={"Vælg billed"} onPress={captureImage}/>
            )
        }
    }
    
    return (
        <View style={styles.container}>
            <TextInput onChangeText={titleChanged} style={styles.titleInput} placeholder={"Title"}/>
            <TextInput onChangeText={contentChanged} multiline editable style={styles.contentInput} placeholder={"Content"}/>
            <View style={styles.buttonGroup}>
                {imageSelectGroup()}
                <Button title={"Gem"} onPress={handleSaveClicked}></Button>
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
    imageSelectGroup: {
        flexDirection: "row"
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})