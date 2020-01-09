import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

interface AnsweringScreenProps {
  roomId: number;
  goBack: () => void;
}

const AnsweringScreen: React.FC<AnsweringScreenProps> = ({roomId, goBack}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Room: {roomId}</Text>
        <TouchableOpacity onPress={goBack} style={{backgroundColor: 'navy'}}>
          <Text>Go back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AnsweringScreen;
