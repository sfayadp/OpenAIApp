import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { getChatGPTResponse } from './services/OpenAIService';


export default function App() {

  const [text, setText] = React.useState("");
  const [textOutput, setTextOutput] = React.useState("");
  
  
  const Search = async () => {
    setTextOutput('');
    const response = await getChatGPTResponse(text);
    console.warn(response);
    setTextOutput(response);
  }

  const Clear = () => {
    setText("");
    setTextOutput("");
  }

  return (
    
    <View style={styles.container}>
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
        multiline = {true}
        editable = {false}
        numberOfLines = {4}
      /> 
    </View> 
   
   <View style={styles.buttonAreaView}>
    <TouchableOpacity style={styles.searchBtn} onPress={ () => Search()} >
        <Text style={styles.loginText}>Buscar</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.cleanBtn} onPress={ () => Clear()} >
        <Text style={styles.loginText}>Limpiar</Text> 
      </TouchableOpacity> 
   </View>
   
    
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
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
  buttonAreaView:{
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
