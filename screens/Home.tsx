import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import Prompt from '../components/Prompt';

interface HomeScreenProps {
  callback: (room: number) => void;
  changeRooms?: boolean;
  setCurrRoom: any;
  setText: any;
  openModal: any;
}

interface Room {
  name: string;
  id: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  callback,
  changeRooms,
  setCurrRoom,
  setText,
  openModal
}) => {
  const [roomId, setRoomId] = useState<string>('');
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('rooms').then(data => {
      if (data) {
        const parsed: Room[] = JSON.parse(data);
        console.log(parsed);
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

  useEffect(() => {
    console.log('reload rooms');
    AsyncStorage.getItem('rooms').then(data => {
      if (data) {
        const parsed: Room[] = JSON.parse(data);
        setRooms(parsed);
      }
    });
  }, [changeRooms]);

  const rename = (value: number | string) => () => {
    setCurrRoom(value);
    setText(rooms.find(room => room.id === value)?.name ?? '');
    setTimeout(() => openModal(), 10);
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
        <TouchableOpacity
          key={`${room.id}-${room.name}`}
          onPress={submit(room.id)}
          onLongPress={rename(room.id)}>
          <View
            key={`room-join-${room.id}`}
            style={{
              padding: 20,
              margin: 10,
              backgroundColor: '#ddd',
              borderRadius: 5
            }}>
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
                right: 10,
                top: 0,
                bottom: 0,
                justifyContent: 'center',
                padding: 5
              }}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HomeScreen;
