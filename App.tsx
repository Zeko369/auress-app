import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  TextInput,
  ScrollView
} from 'react-native';

import CookieManager from 'react-native-cookie-store';
import {connect, sendShort, sendText} from './foobar';

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

const extractMyAns = (html: string) => {
  return html
    .split('Answers')[1]
    .split('</div>')[0]
    .slice(3)
    .split('), ');
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [config, setConfig] = useState({id: 1, questionCount: 5});
  const [error, setError] = useState(false);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const ref = useRef<ScrollView | null>(null);

  const [myAnswers, setMyAnswers] = useState<string[]>([]);

  useEffect(() => {
    console.log('BEGIN: ----------------');

    connect(6387)
      .then(data => {
        console.log(data);
        setConfig(data.config);
        setLoggedIn(true);
      })
      .catch(e => {
        setError(e);
        console.error(e);
      });
  }, []);

  const onPress = (item: string) => (event: GestureResponderEvent): void => {
    setSubmitting(true);

    if (submitting) {
      return;
    }

    sendShort(item)
      .then(data => {
        setSubmitting(false);
        return data.text();
      })
      .then(html => {
        setMyAnswers(extractMyAns(html));
        setTimeout(() => ref.current?.scrollToEnd(), 100);
      })
      .catch(e => console.error(e));
  };

  const onSubmit = () => {
    sendText(text)
      .then(() => {
        console.log('Sent: ', text);
        setText('');
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
            <Text>Hello</Text>
            <Text>Youre in room: {config.id}</Text>

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
              />
              <TouchableOpacity
                style={{padding: 10, margin: 10, backgroundColor: '#adadad'}}
                onPress={onSubmit}>
                <Text>Submit text</Text>
              </TouchableOpacity>
            </View>

            <ScrollView ref={ref}>
              {myAnswers.map((item, index) => (
                <Text key={`ans-${item}-${index}`}>{item})</Text>
              ))}
            </ScrollView>
          </View>
        ) : (
          <Text>Logging in...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
export default App;
