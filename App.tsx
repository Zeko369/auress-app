import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import {HomeScreen, AnsweringScreen} from './screens';
import Header from './components/Header';

enum PAGE {
  HOME,
  ANSWER
}

const Main: React.FC = () => {
  const [page, setPage] = useState<PAGE>(PAGE.HOME);
  const [roomId, setRoomId] = useState<number>(2222);

  const callback = (room: number) => {
    setRoomId(room);
    setPage(PAGE.ANSWER);
  };

  const goBack = () => {
    setPage(PAGE.HOME);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#232323'}}>
      <SafeAreaView>
        <Header
          text="Auress"
          textCallback={goBack}
          user="Anon"
          callbackText={'LOGIN'}
          userCallback={() => console.log('Hello')}
          showRight={page === PAGE.ANSWER}
        />
        {page === PAGE.HOME ? (
          <HomeScreen callback={callback} />
        ) : page === PAGE.ANSWER ? (
          <AnsweringScreen roomId={roomId} goBack={goBack} />
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
