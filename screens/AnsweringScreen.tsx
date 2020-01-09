import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';

interface AnsweringScreenProps {
  roomId: number;
}

const AnsweringScreen: React.FC<AnsweringScreenProps> = ({roomId}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Room: {roomId}</Text>
      </View>
    </SafeAreaView>
  );
};

export default AnsweringScreen;
