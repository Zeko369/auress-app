import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {HomeScreen, AnsweringScreen} from './screens';
import Header, {HeaderProps} from './components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import {connect, login, logout} from './foobar';
import {parse} from './parser';
import FormInput from './components/FormInput';

enum PAGE {
  HOME,
  ANSWER
}

const Main: React.FC = () => {
  const [connecting, setConnecting] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [page, setPage] = useState<PAGE>(PAGE.HOME);
  const [roomId, setRoomId] = useState<number>();

  const [config, setConfig] = useState<any>({});

  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState('');
  const [changeRooms, setChangeRooms] = useState(false);
  const [currRoom, setCurrRoom] = useState('2222');
  const [modal, setModal] = useState('login');

  useEffect(() => {
    AsyncStorage.getItem('userId').then(data => {
      if (data) {
        setUserId(data);
      }
    });
  }, []);

  const callback = (room: number) => {
    setRoomId(room);
    setConnecting(true);
    setPage(PAGE.ANSWER);
    logout()
      .then(() => {
        return connect(room);
      })
      .then(data => {
        setConfig(parse(data.raw));
        setConnecting(false);
        if (userId) {
          return login(userId);
        } else {
          setUsername('anonymous');
        }
      })
      .then(data => {
        setUsername(data || null);
      })
      .catch(e => {
        Alert.alert('Error', e);
      });
  };

  // useEffect(() => {
  //   AsyncStorage.setItem('rooms', '[]');
  // });

  // return <Text>Hello</Text>;

  const goBack = () => {
    setPage(PAGE.HOME);
  };

  const openLogin = () => {
    // Alert.prompt('Login', 'Enter userId', (text: string) => {
    //   login(text)
    //     .then(data => {
    //       setUsername(data || null);
    //       setUserId(text);
    //       return AsyncStorage.setItem('userId', text);
    //     })
    //     .then(() => console.log('done'));
    // });

    setModalOpen(true);
    setModal('login');
    setText(userId || '');
  };

  const openLogout = () => {
    setPage(PAGE.HOME);
    logout()
      .then(() => AsyncStorage.removeItem('userId'))
      .then(() => setUserId(''));
  };

  const loggedIn = username !== 'anonymous' && username !== null;

  const headerData: HeaderProps =
    page === PAGE.HOME
      ? {
          text: 'Auress',
          textCallback: goBack,
          user: '',
          showCallback: false,
          callbackText: '',
          userCallback: openLogin,
          showRight: false
        }
      : {
          text: `Room: ${roomId}`,
          textCallback: goBack,
          user: username || '',
          showCallback: true,
          callbackText: loggedIn ? 'Logout' : 'Login',
          userCallback: loggedIn ? openLogout : openLogin,
          showRight: true
        };

  const opneModal = () => {
    setModalOpen(true);
    setModal('name');
  };

  const onSubmit = () => {
    if (modal === 'login') {
      login(text)
        .then(data => {
          setUsername(data || null);
          setUserId(text);
          setModalOpen(false);
          return AsyncStorage.setItem('userId', text);
        })
        .then(() => console.log('Logged in'));
    } else {
      AsyncStorage.getItem('rooms').then(data => {
        if (data) {
          const rooms = JSON.parse(data);
          const newData = JSON.stringify(
            rooms.map((room: any) => {
              if (room.id === currRoom) {
                return {
                  id: room.id,
                  name: text
                };
              } else {
                return room;
              }
            })
          );

          // console.log(newData);

          AsyncStorage.setItem('rooms', newData).then(() => {
            setChangeRooms(!changeRooms);
            setModalOpen(false);
          });
        }
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#232323'}}>
      <SafeAreaView style={{flex: 1}}>
        <Header {...headerData} />
        {page === PAGE.HOME ? (
          <HomeScreen
            callback={callback}
            changeRooms={changeRooms}
            setCurrRoom={setCurrRoom}
            setText={setText}
            openModal={opneModal}
          />
        ) : page === PAGE.ANSWER ? (
          <AnsweringScreen
            connecting={connecting}
            config={config}
            setConfig={setConfig}
          />
        ) : (
          <View>
            <Text>Error</Text>
          </View>
        )}

        {modalOpen && (
          <View
            style={{
              position: 'absolute',
              ...StyleSheet.absoluteFillObject,
              backgroundColor: '#44444488',
              zIndex: 100
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                ...StyleSheet.absoluteFillObject,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100
              }}
              onPress={() => setModalOpen(false)}>
              <View
                style={{
                  width: '90%',
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: 'white'
                }}>
                <Text>Enter {modal === 'login' ? 'userID' : 'name'}: </Text>
                <FormInput
                  label="Save"
                  onSubmit={onSubmit}
                  text={text}
                  color={'black'}
                  returnType={'go'}
                  setText={setText}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default Main;
