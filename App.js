import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Linking
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import Tts from "react-native-tts";
import Clipboard from "@react-native-clipboard/clipboard";
// import Snackbar from "react-native-snackbar";

// Tts.setDefaultLanguage('en-GB');
// Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
// Tts.setDefaultRate(0.5);
// Tts.setDefaultPitch(1.2)

export default function App() {
  const [quote, setQuote] = useState({
    content: '',
    author: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const randomQuote = async () => {
    setIsLoading(true);
    const res = await fetch("https://api.quotable.io/quotes/random");
    const result = await res.json();
    setQuote({
      content: result[0].content,
      author: result[0].author,
    });
    setIsLoading(false);
    console.log(result);
  };

  useEffect(() => {
    randomQuote();
  }, []);

  const textToSpeachAction = () => {
    Tts.stop();
    Tts.speak(quote.content + " by " + quote.author);
  };

  const copyAction = () => {
    console.log({c: quote.content});
    const {content} = quote
    Clipboard.setString(content);
    Snackbar.show({
      text: "Quote copied!",
      duration: Snackbar.LENGTH_LONG,
    });
  };

  const tweetAction = () => {
    const url = `https://twitter.com/intent/tweet?text=${quote.content}`;
    Linking.openURL(url)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.box}>
        <Text style={styles.header}>Quote of the Day</Text>
        <FontAwesome5
          name="quote-left"
          style={{ ...styles.quote, marginBottom: -12 }}
          color="#000"
        />
        {isLoading ? (
          <ActivityIndicator style={{}} />
        ) : (
          <Text style={styles.body}>{quote && quote.content}</Text>
        )}
        <FontAwesome5
          name="quote-right"
          style={{
            ...styles.quote,
            textAlign: "right",
            marginTop: -20,
            marginBottom: 20,
          }}
          color="#000"
        />
        <Text style={styles.author}>--- {quote && quote.author}</Text>
        <TouchableOpacity onPress={randomQuote} style={styles.btnContainer}>
          <Text
            style={{
              ...styles.btnText,
              backgroundColor: isLoading
                ? "rgba(83,114,240, 0.7)"
                : "rgba(83,114,240, 1)",
            }}
          >
            {isLoading ? "Loading..." : "New Quote"}
          </Text>
        </TouchableOpacity>

        <View style={styles.list}>
          <TouchableOpacity onPress={textToSpeachAction} style={styles.volume}>
            <FontAwesome name="volume-up" size={22} color="#5372f0" />
          </TouchableOpacity>
          <TouchableOpacity onPress={copyAction} style={styles.volume}>
            <FontAwesome name="copy" size={22} color="#5372f0" />
          </TouchableOpacity>
          <TouchableOpacity onPress={tweetAction} style={styles.volume}>
            <FontAwesome name="twitter" size={22} color="#5372f0" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5372f0",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  header: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },
  body: {
    color: "#000",
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 1.1,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  btnContainer: {
    backgroundColor: "#5372f0",
    padding: 20,
    borderRadius: 30,
    marginVertical: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  author: {
    textAlign: "right",
    fontWeight: "300",
    fontSize: 16,
    fontStyle: "italic",
    color: "#000",
  },
  quote: {
    fontSize: 20,
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  volume: {
    borderWidth: 2,
    borderColor: "#5372f0",
    borderRadius: 50,
    padding: 15,
  },
});
