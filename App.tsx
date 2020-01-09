import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';

import {HomeScreen, AnsweringScreen} from './screens';
import Header, {HeaderProps} from './components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import {connect, login, logout} from './foobar';
import {parse} from './parser';

enum PAGE {
  HOME,
  ANSWER
}

const Main: React.FC = () => {
  const [connecting, setConnecting] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [page, setPage] = useState<PAGE>(PAGE.HOME);
  const [roomId, setRoomId] = useState<number>(2222);

  const [config, setConfig] = useState<any>({});

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
        }
      })
      .then(data => {
        setUsername(data || null);
      })
      .catch(e => {
        Alert.alert('Error', e);
      });
  };

  const goBack = () => {
    setPage(PAGE.HOME);
  };

  const openLogin = () => {
    Alert.prompt('Login', 'Enter userId', (text: string) => {
      login(text)
        .then(data => {
          setUsername(data || null);
          setUserId(text);
          return AsyncStorage.setItem('userId', text);
        })
        .then(() => console.log('done'));
    });
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

  return (
    <View style={{flex: 1, backgroundColor: '#232323'}}>
      <SafeAreaView>
        <Header {...headerData} />
        {page === PAGE.HOME ? (
          <HomeScreen callback={callback} />
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
      </SafeAreaView>
    </View>
  );
};

export default Main;
