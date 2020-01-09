import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

interface AnsweringScreenProps {
  roomId: number;
  userId: string | null;
  connecting: boolean;
}

const AnsweringScreen: React.FC<AnsweringScreenProps> = ({
  roomId,
  userId,
  connecting
}) => {
  return (
    <View>
      {connecting ? (
        <Text style={{color: 'white'}}>Loading...</Text>
      ) : (
        <Text>Text</Text>
      )}
    </View>
  );
};

export default AnsweringScreen;
