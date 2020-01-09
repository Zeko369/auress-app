import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../components/Header';
import FormInput from '../components/FormInput';

interface HomeScreenProps {
  callback: (room: number) => void;
}

interface Room {
  name: string;
  id: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({callback}) => {
  const [roomId, setRoomId] = useState<string>('');
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
      <FormInput
        text={roomId}
        setText={setRoomId}
        onSubmit={submit()}
        type="numeric"
        label="Join room"
        returnType="go"
      />

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
