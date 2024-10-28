import { Marker, Callout } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Image as ImageSvg } from "react-native-svg";

let index = 0

export default function NoteMarker(coordinates, title, content, imageData) {
    function renderImage(data) {
        return (
            <View style={styles.imageWrapper}>
                <Svg width={'100%'} height={'100%'}>
                    <ImageSvg
                        width={'100%'}
                        height={'100%'}
                        preserveAspectRatio="none"
                        href={{ uri: `${data}` }}
                    />
                </Svg>
            </View>
        )
    }

    return (
        <Marker key={index++} coordinate={coordinates}>
            <Callout>
                <View style={styles.markerContainter}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>{title}</Text>
                    <Text style={{fontSize: 14}}>{content}</Text>
                    {imageData ? renderImage(imageData) : null}
                </View>
            </Callout>
        </Marker>
    )
}

const styles = StyleSheet.create({
    markerContainter: {
        width: 192,
        height: 256,
        padding: 8
    }
})