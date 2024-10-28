import 'react-native-get-random-values'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateNote from "./Pages/CreateNote";
import NotesListView from "./Pages/NotesListView";
import NoteDetails from "./Pages/NoteDetails";
import DeleteNote from "./Pages/DeleteNode";
import SignInPage from './Pages/SignIn';
import StartPage from './Pages/Start';
import SignUpPage from './Pages/SignUp';
import { initAuth, onSignedInChanged } from './Services/Auth/notesAuth';
import UserPage from './Pages/UserDetails';
import { useState } from 'react';
import NoteMapView from './Pages/NoteMapView';
import HomePage from './Pages/Home';
import NotesMapView from './Pages/NotesMapView';

const Stack = createNativeStackNavigator();

initAuth()

function StackView() {

    const [signedIn, setSignedIn] = useState(false)

    onSignedInChanged((status) => {
        setSignedIn(status)
    })

    function signedInBody() {
        return (
            <>
                <Stack.Screen name="Notes Menu" component={HomePage} />
                <Stack.Screen name="Notes List" component={NotesListView} />
                <Stack.Screen name="Create note" component={CreateNote} />
                <Stack.Screen name="Notes Map" component={NotesMapView}/>
                <Stack.Screen name="Note details" component={NoteDetails} />
                <Stack.Screen name="Delete note" component={DeleteNote} />
                <Stack.Screen name="UserPage" component={UserPage} />
                <Stack.Screen name='NoteCreateMap' component={NoteMapView}
                    options={{ title: "Select location" }} />
            </>
        )
    }

    function signedOutBody() {
        return (
            <>
                <Stack.Screen name='Start' component={StartPage} />
                <Stack.Screen name='SignIn' component={SignInPage} />
                <Stack.Screen name='SignUp' component={SignUpPage} />
            </>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {signedIn ? signedInBody() : signedOutBody()}
            </Stack.Navigator>
        </NavigationContainer >
    );
}

export default function App() {
    return StackView()
}


