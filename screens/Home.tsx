import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

interface HomeScreenProps {
  callback: (room: number) => void;
}

interface Room {
  name: string;
  id: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({callback}) => {
  const [roomId, setRoomId] = useState<string>('2222');
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('rooms').then(data => {
      if (data) {
        const parsed: Room[] = JSON.parse(data);
        setRooms(parsed);
      }
    });
  }, []);

  const remove = (id: number) => {
    setRooms(tmp => {
      const newRooms = tmp.filter(item => item.id !== id);
      AsyncStorage.setItem('rooms', JSON.stringify(newRooms));
      return newRooms;
    });
  };

  const submit = (value: number | string = roomId) => () => {
    if (value.toString().length === 4 && parseInt(value.toString()) !== NaN) {
      callback(parseInt(value.toString()));

      if (rooms.every(item => item.id !== value)) {
        AsyncStorage.setItem(
          'rooms',
          JSON.stringify([...rooms, {id: value, name: null}])
        );
      }
    } else {
      Alert.alert("Are you sure?\nThat doens't seem right");
    }
  };

  return (
    <View>
      <Text>Join room</Text>
      <TextInput
        value={roomId}
        onChangeText={(text: string) => {
          setRoomId(text);
          console.log(text);
        }}
        style={{
          padding: 10,
          fontSize: 20,
          borderColor: 'red',
          borderWidth: 1,
          borderStyle: 'solid'
        }}
        returnKeyType={'go'}
        keyboardType={'numeric'}
        onSubmitEditing={submit()}
      />
      <TouchableOpacity
        onPress={submit()}
        style={{padding: 20, backgroundColor: 'blue'}}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
          Join room
        </Text>
      </TouchableOpacity>

      {rooms.map((room: Room) => (
        <View
          key={`room-join-${room.id}`}
          style={{
            padding: 20,
            margin: 10,
            backgroundColor: '#ddd',
            borderRadius: 5
          }}>
          <TouchableOpacity onPress={submit(room.id)}>
            {room.name ? (
              <>
                <Text style={{fontSize: 20, marginBottom: 5}}>{room.name}</Text>
                <Text>{room.id}</Text>
              </>
            ) : (
              <>
                <Text style={{fontSize: 20, marginBottom: 5}}>{room.id}</Text>
              </>
            )}

            <TouchableOpacity
              onPress={() => remove(room.id)}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                justifyContent: 'center',
                padding: 5
              }}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default HomeScreen;
