import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export interface HeaderProps {
  text: string;
  textCallback: () => void;
  user: string;
  showCallback: boolean;
  callbackText: string;
  userCallback: () => void;
  showRight: boolean;
}

const Header: React.FC<HeaderProps> = ({
  text,
  textCallback,
  user,
  callbackText,
  userCallback,
  showRight,
  showCallback
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={textCallback}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
    {showRight && (
      <View style={styles.right}>
        <Text style={styles.rightText}>{user}</Text>
        {showCallback && (
          <TouchableOpacity onPress={userCallback} style={styles.button}>
            <Text>{callbackText}</Text>
          </TouchableOpacity>
        )}
      </View>
    )}
  </View>
);

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#232323',
    padding: 10,
    paddingTop: 0,
    paddingLeft: 16,
    borderBottomColor: 'white',
    borderBottomWidth: 2
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  button: {
    backgroundColor: '#addead',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  right: {
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightText: {
    marginRight: 10,
    fontSize: 20,
    color: 'white'
  }
});
