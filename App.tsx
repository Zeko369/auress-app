import React, { useEffect, useState } from "react";
import {
  View,
  AsyncStorage,
  Text,
  SafeAreaView,
  TouchableOpacity,
  GestureResponderEvent,
  ScrollView
} from "react-native";
import axios from "axios";

import Login from "./screens/Login";
import Main from "./screens/NewTesting";

const URL = "https://www.auress.org/s";

const getInitSSID = async () => {
  // await axios.get(`${URL}/logout.php`);
  // const res = await axios.get(`${URL}/index.php`);
  // console.log(res.headers);
  // return "foo";

  return fetch("https://www.auress.org/s/index.php")
    .then(res => {
      const setCookie = res.headers["map"]["set-cookie"];
      const sessionID = setCookie.split(";")[0].split("=")[1];
      return sessionID;
    })
    .catch(e => console.error(e));
};

// await fetch("https://www.auress.org/s/", {
//     "credentials": "include",
//     "headers": {
//         "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0",
//         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//         "Accept-Language": "en-US,en;q=0.8,hr-HR;q=0.5,hr;q=0.3",
//         "Content-Type": "application/x-www-form-urlencoded",
//         "Upgrade-Insecure-Requests": "1"
//     },
//     "referrer": "https://www.auress.org/s/",
//     "body": "idSobe=7636&udiUSobu=Start%0D%0A",
//     "method": "POST",
//     "mode": "cors"
// });

const signInToRoom = (roomId, initSSID) => {
  const cookie = `PHPSESSID=${initSSID}`;

  axios.get(URL).then(d => console.log(d));

  return axios
    .post(URL, `idSobe=${roomId}&udiUSobu=Start%0D%0A`, {
      headers: {
        cookie: cookie
      }
    })
    .then(data => {
      console.log("HERE", data.headers);
      return data.headers["set-cookie"][0].split(";")[0].split("=")[1];
    })
    .catch(e => console.error(e));
};

const sendResponse = (ssid: string, letter: string) => {
  return axios.post(
    URL,
    `odgovor=${letter.toUpperCase()}&device=Linux&browser=Firefox`,
    {
      headers: {
        cookie: `PHPSESSID=${ssid}`
      }
    }
  );
};

const sendJMBAG = (ssid: string, jmbag: string) => {
  return axios.post(
    URL,
    `porukaStudenta=JMBAG=${jmbag}&posaljiPoruku=Send+text`,
    {
      headers: {
        cookie: `PHPSESSID=${ssid}`
      }
    }
  );
};

const App = () => {
  const [jmbag, setJmbag] = useState<string | null>(null);
  const [phpsessid, setPhpsessid] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loggingIn, setLoggingIn] = useState<boolean>(true);
  const [roomId, setRoomId] = useState(3148);

  const [responses, setResponses] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("phpsessid").then(item => {
      // if (item === null) {
      getInitSSID().then(data => {
        console.log(`init ssid = ${data}`);
        signInToRoom(roomId, data).then(data => {
          console.log(data);
          setLoading(false);
          setPhpsessid(data);
          AsyncStorage.setItem("phpsessid", data)
            .then(() => console.log("saved"))
            .catch(e => console.error(e));
        });
      });
      // } else {
      //   setLoading(false);
      //   setPhpsessid(item);

      //   // todo, check if works
      // }
    });
  }, [roomId]);

  useEffect(() => {
    AsyncStorage.getItem("jmbag")
      .then(data => {
        if (data === null) {
          console.log("login");
        } else {
          console.log(data);
          setJmbag(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (jmbag && phpsessid) {
      sendJMBAG(phpsessid, jmbag).then(res => {
        console.log("Logged in");
        setLoggingIn(false);
      });
    }
  }, [jmbag, phpsessid]);

  const onPress = letter => (_e: GestureResponderEvent) => {
    sendResponse(phpsessid, letter)
      .then(res => {
        const data = res.data
          .split("Answers")[1]
          .split("</div>")[0]
          .slice(3)
          .split("), ");
        setResponses(data);
      })
      .catch(e => console.error(e));
  };

  return (
    <View style={{ paddingTop: 50 }}>
      <SafeAreaView>
        <ScrollView>
          <Login />
          <Text>{`JMBAG: ${jmbag}`}</Text>

          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Text>Loaded PHPSESSID: {phpsessid}</Text>
          )}

          <Text>{roomId}</Text>

          <Text>{loggingIn ? "Logging in" : "Logged in"}</Text>

          {Array.from(new Array(5), (_, i) => String.fromCharCode(65 + i)).map(
            item => (
              <TouchableOpacity
                style={{ backgroundColor: "blue", padding: 10, margin: 10 }}
                key={`ans-${item}`}
                onPress={onPress(item)}
              >
                <Text style={{ color: "white" }}>Answer {item}</Text>
              </TouchableOpacity>
            )
          )}

          <View style={{ flex: 1 }}>
            {responses.map((item, index) => (
              <Text key={`ans-${item}-${index}`}>{item})</Text>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

// export default App;

export default Main;
