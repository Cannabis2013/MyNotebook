import 'react-native-get-random-values'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CreateNote from "./Pages/CreateNote";
import NotesOverview from "./Pages/NotesOverview";
import NoteDetails from "./Pages/NoteDetails";
import DeleteNote from "./Pages/DeleteNode";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Noter" component={NotesOverview} />
                <Stack.Screen name="Create note" component={CreateNote} />
                <Stack.Screen name="Note details" component={NoteDetails} />
                <Stack.Screen name="Delete note" component={DeleteNote} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}




