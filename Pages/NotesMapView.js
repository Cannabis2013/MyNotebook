import { StyleSheet, View } from "react-native"
import MapView from 'react-native-maps'
import { useState, useCallback } from "react"
import { getAllNotes, fetchNotes } from "../Services/Notes/NotesInterface"
import IconButton from "../Components/Controls/IconButton"
import { currentLocation } from '../Services/location/locations'
import { useFocusEffect } from "@react-navigation/native"
import NoteMarker from "../Components/Map/NoteMarker"
import { imageFetch } from "../Services/Images/imageFetch"

const initialCoords = {
    latitude: 55.640514005209646,
    longitude: 12.629873155214913,
    latitudeDelta: 0.75,
    longitudeDelta: 0.75
}

export default function NotesMapView({ navigation }) {
    const [mapCords, setMapCoords] = useState(initialCoords)
    const [markers, setMarkers] = useState([])
    const [needsFetch, setNeedsFetch] = useState(true)

    async function handleFetchError(e) {
        if (e.code == "permission-denied")
            await signOut()
    }

    useFocusEffect(useCallback(() => {
        fetchNotes().then((status) => {
            if(!needsFetch)
                return
            const notesData = getAllNotes()
            updateMarkers(notesData).then(noteMarkers => {
                setMarkers(noteMarkers)
                setNeedsFetch(false)
            })
        }).catch(handleFetchError)
    }))

    function createNote(e) {
        const coords = e.nativeEvent.coordinate
        navigation.navigate("Create note", { "coords": coords })
    }
    
    async function goToCurrentLocation() {
        const cPos = await currentLocation()
        const coords = {
            latitude: cPos.latitude,
            longitude: cPos.longitude,
            latitudeDelta: 0.75,
            longitudeDelta: 0.75
        }
        setMapCoords({})
        setMapCoords(coords)
    }

    function toLocationCoords(latitude, longitude) {
        return {
            latitude: latitude ?? initialCoords.latitude,
            longitude: longitude ?? initialCoords.longitude
        }
    }

    async function updateMarkers(notesData) {
        const noteMarkers = notesData.map(async (noteData) => {
            const coordinates = toLocationCoords(noteData.latitude, noteData.longitude)
            const imageUrl = noteData.images[0]?.uri ?? undefined
            const imageData = await imageFetch(imageUrl);
            return NoteMarker(coordinates, noteData.title, noteData.content, imageData)
        })
        return noteMarkers
    }

    return (
        <View style={styles.container}>
            <MapView region={mapCords} style={styles.map} onLongPress={createNote}>
                {markers}
            </MapView>
            <View style={styles.posWrapper}>
                <IconButton width={64}
                    height={64}
                    uri={require("../assets/cPos.png")}
                    onPress={goToCurrentLocation}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: "100%",
        height: "100%"
    },
    posWrapper: {
        position: "absolute",
        top: 20,
        left: 20,
        width: 64
    }
})