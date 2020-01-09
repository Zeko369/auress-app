import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  TextInput,
  ScrollView,
  Keyboard
} from 'react-native';

import CookieManager from 'react-native-cookie-store';
import {connect, sendShort, sendText, login, logout} from './foobar';
import {extractConfig, extractMyAns, extractMyText} from './parser';
import Main from './index';

// const URL = 'https://auress.org/s/';

// const run = () => {
//   CookieManager.clearAll().then(res => {
//     console.log('CookieManager.clearAll =>', res);
//     fetch(URL).then(res => {
//       console.log(res.headers['map']['set-cookie']);
//       CookieManager.get(URL).then(data => {
//         console.log('CookieManager.get =>', data); // => 'user_session=abcdefg; path=/;'
//       });
//     });
//   });
// };

const App = () => {
  const [userId, setUserId] = useState('0036524344');
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [config, setConfig] = useState({id: 1, questionCount: 5});
  const [error, setError] = useState(false);
  const [text, setText] = useState('');
  const [myText, setmyText] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const ref = useRef<ScrollView | null>(null);

  const [myAnswers, setMyAnswers] = useState<string>('');

  useEffect(() => {
    console.log('BEGIN: ----------------');

    CookieManager.clearAll().then(() => {
      connect(2222)
        .then(data => {
          console.log(data);
          setConfig(data.config);
          setLoggedIn(true);

          return login(userId);
        })
        .then(data => {
          console.log('Logged flow done:', data);
          setUsername(data || '');
        })
        .catch(e => {
          setError(e);
          console.error(e);
        });
    });
  }, [userId]);

  const updateData = (html: string) => {
    setMyAnswers(extractMyAns(html));
    setmyText(extractMyText(html));
    setConfig(extractConfig(html));
  };

  const onPress = (item: string) => (event: GestureResponderEvent): void => {
    setSubmitting(true);

    if (submitting) {
      return;
    }

    sendShort(item)
      .then(html => {
        updateData(html);
        setSubmitting(false);
        setTimeout(() => ref.current?.scrollToEnd(), 20);
      })
      .catch(e => console.error(e));
  };

  const onSubmit = () => {
    if (text === '') {
      return;
    }

    Keyboard.dismiss();
    setText('');
    sendText(text)
      .then(html => {
        updateData(html);
        setTimeout(() => ref.current?.scrollToEnd(), 20);
      })
      .catch(e => console.error(e));
  };

  return (
    <SafeAreaView>
      <View>
        {error ? (
          <Text>{error}</Text>
        ) : loggedIn ? (
          <View style={{height: '100%'}}>
            <Text>Hello {username}</Text>
            <Text>Youre in room: {config.id}</Text>

            <TouchableOpacity
              style={{backgroundColor: 'red', padding: 20}}
              onPress={() => {
                logout()
                  .then(() => {
                    console.log('Logged out');
                    setUserId('');
                  })
                  .catch(e => console.log(e));
              }}>
              <Text>Logout</Text>
            </TouchableOpacity>

            {submitting ? <Text>Loading...</Text> : <Text>Go...</Text>}

            <View style={{flexDirection: 'column'}}>
              {Array.from(new Array(config.questionCount), (_, i) =>
                String.fromCharCode(65 + i)
              ).map(item => (
                <TouchableOpacity
                  onPress={onPress(item)}
                  key={`ans-${item}`}
                  style={{
                    padding: 10,
                    margin: 10,
                    backgroundColor: '#adadad'
                  }}>
                  <Text>{submitting ? 'Loading' : item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View>
              <TextInput
                value={text}
                onChangeText={t => setText(t)}
                style={{
                  borderColor: 'red',
                  borderWidth: 1,
                  borderStyle: 'solid'
                }}
                returnKeyType={'go'}
                onSubmitEditing={onSubmit}
              />
              <TouchableOpacity
                style={{padding: 10, margin: 10, backgroundColor: '#adadad'}}
                onPress={onSubmit}>
                <Text>Submit text</Text>
              </TouchableOpacity>
            </View>

            <ScrollView ref={ref}>
              <Text>{myAnswers}</Text>
              <Text>{myText}</Text>
            </ScrollView>
          </View>
        ) : (
          <Text>Logging in...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

// export default App;

export default Main;
