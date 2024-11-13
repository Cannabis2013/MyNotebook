import { Animated, Button, StyleSheet, Text, View, PanResponder } from "react-native";
import React, { useRef, useState } from "react";

export default function NoteItem({ item, clickHandler, deleteHandler}) {
    const [x, setX] = useState(0)
    const [isMoving,setIsMoving] = useState(true)

    function handleMove(event,gestureState){
        setX(gestureState.dx)
    }

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: handleMove,
            onPanResponderRelease: function() {
                setX(1)
            },
        }),
    ).current;

    function formatTitle(title) {
        const maxLength = 15
        if (title.length > maxLength) {
            const cropped = title.substring(0, maxLength)
            return cropped + ".."
        }
        return title
    }

    return (
        <Animated.View
            style={{transform: [{ translateX: x }],}}
            {...panResponder.panHandlers}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle} onPress={() => clickHandler(item)}>{formatTitle(item.title)}</Text>
                <View style={styles.deleteButton}>
                    <Button color={"red"} title={"Slet"} onPress={() => deleteHandler(props.item)} />
                </View>
            </View>
        </Animated.View>

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