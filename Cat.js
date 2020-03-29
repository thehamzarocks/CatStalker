import React , {useState} from 'react'
import {Text, View, Button, TextInput} from 'react-native'

export default function Cat(props) {
    const [isHungry, setisHungry] = useState(true);
    const [catSong, setCatSong] = useState('');

    return (
        <View>
            <Text>Hello There! I'm a Cat! And BTW, my name is {props.name}!</Text>
            <Text>{isHungry? "I'm pretty hungry!" : "Time to go to sleep"}</Text>
            <Button onPress={() => {
                setisHungry(false);
            }}
            disabled = {!isHungry}
            title = {isHungry? "Pour me some delicious milk!" : "Thanks zzz"}
            />
            <TextInput
                placeholder = "Sing to your cat!"
                onChangeText = {text => setCatSong(text)}
                defaultValue = {catSong}
            />
            <Text>{catSong.split(' ').map(word => '🍕').join(' ')}</Text>
        </View>
    )
}