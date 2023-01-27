import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import axios from 'axios';

const API_KEY = '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';
const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions';


export default function App() {

  const [text, setText] = React.useState("");
  const [textOutput, setTextOutput] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const getChatGPTResponse = async (prompt) => {
    setLoading(true);
    console.warn(prompt);
    try {
      const response = await axios.post(API_ENDPOINT, {
        prompt: prompt,
        max_tokens: 1000,
      },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
        });
      console.warn(response);
      setTextOutput(response.data.choices[0].text);
      setLoading(false);
      return response.data.choices[0].text;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const Search = async () => {
    setTextOutput('');
    const response = await getChatGPTResponse(text);
    console.warn(response);
  }

  const Clear = () => {
    setText("");
    setTextOutput("");
  }

  return (

    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#1e981e" />}
      <StatusBar style="auto" />
      <Text style={styles.headerText}>OpenAI - React Native app</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="¿Escribe una pregunta?."
          placeholderTextColor="#003f5c"
          value={text}
          onChangeText={setText}
        />
      </View>
      <View style={styles.textAreaView}>
        <TextInput
          style={styles.TextArea}
          placeholderTextColor="#003f5c"
          value={textOutput}
          onChangeText={setTextOutput}
          multiline={true}
          editable={false}
          numberOfLines={0}
        />
      </View>

      <View style={styles.buttonAreaView}>
        <TouchableOpacity style={styles.searchBtn} onPress={() => Search()} >
          <Text style={styles.loginText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cleanBtn} onPress={() => Clear()} >
          <Text style={styles.loginText}>Limpiar</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#beecbe",
    borderRadius: 30,
    width: "85%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  textAreaView: {
    backgroundColor: "#beecbe",
    borderRadius: 30,
    width: "85%",
    height: 400,
    alignItems: "center",
  },
  buttonAreaView: {
    flexDirection: 'row'
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  TextArea: {
    height: 100,
    flex: 1,
    padding: 1,
    marginLeft: 20,
  },
  searchBtn: {
    width: "40%",
    borderRadius: 15,
    height: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#1e981e",
  },
  cleanBtn: {
    width: "40%",
    borderRadius: 15,
    height: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#beecbe",
  },
  headerText: {
    fontSize: 18,
    fontStyle: 'bold',
    marginBottom: 20,
  }
});
