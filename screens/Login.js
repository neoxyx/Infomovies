import React, { useState, useEffect } from "react";
import { Alert, Button, TextInput, View, StyleSheet, Text } from "react-native";
import { Image } from "react-native-elements";

function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    Alert.alert("Credentials", `${username} + ${password}`);
  };

  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ecf0f1",
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: "blue",
      marginBottom: 10,
      borderRadius: 10,
    },
    text: {
      color: "blue",
    },
  });

  return (
    <View style={style.container}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Auteco_logo.svg/1280px-Auteco_logo.svg.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <TextInput
        value={username}
        onChangeText={() => setUsername({ username })}
        placeholder={"Username"}
        style={style.input}
      />
      <TextInput
        value={password}
        onChangeText={() => setPassword({ password })}
        placeholder={"Password"}
        secureTextEntry={true}
        style={style.input}
      />

      <Button
        title={"Login"}
        style={style.input}
        onPress={onLogin.bind(this)}
      />
      <Text style={style.text} onPress={() => navigation.navigate("Register")}>
        <u>Register</u>
      </Text>
    </View>
  );
}

export default Login;
