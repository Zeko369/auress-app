import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import {HomeScreen, AnsweringScreen} from './screens';

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
    <SafeAreaView>
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
  );
};

export default Main;
