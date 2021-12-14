import React, { useState, useEffect } from "react";
import { Button, View, Text, StatusBar } from "react-native";
import { Image } from "react-native-elements";
import Loader from "./components/utilities/Loader";
import Constants from "./components/utilities/Constants";
import { FlatGrid } from "react-native-super-grid";
import Styles from "./screens/Styles";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import * as Location from "expo-location";

const RootStack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @description Function to search the entered query.
   * @param searchText The word that is to be searched.
   */

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    getMovies();
  }, []);

  /**
   * @description Callback for searchButtonPressed()
   * @returns movieList
   */

  const getMovies = async () => {
    var endpoint =
      Constants.URL.BASE_URL +
      Constants.URL.POPULAR_MOVIES +
      Constants.URL.API_KEY +
      "&language=en-US&page=1";
    let response = await fetch(endpoint);
    let json = await response.json();
    setMovieList(json.results);
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <Loader show={true} loading={isLoading} /> : null}
      <StatusBar
        backgroundColor={Constants.Colors.Cyan}
        barStyle="light-content"
      />
      <FlatGrid
        itemDimension={130}
        data={movieList}
        style={Styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <View style={[Styles.itemContainer]}>
            <Image
              source={{
                uri: "https://image.tmdb.org/t/p/w500" + item.poster_path,
              }}
              style={{ width: 280, height: 380 }}
            />
            <Button
              title="See"
              onPress={() =>
                navigate("Details", {
                  id: item.id,
                  image: item.backdrop_path,
                  name: item.title,
                  overview: item.overview,
                  vote: item.vote_average,
                  release: item.release_date,
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
}

function Details({ route }) {
  return (
    <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={{
          uri: "https://image.tmdb.org/t/p/w500" + route.params.image,
        }}
        style={{ width: 350, height: 550 }}
      />
      <Text>
        <b>Name:</b> {route.params.name}
      </Text>
      <Text>
        <b>Overview:</b> {route.params.overview}
      </Text>
      <Text>
        <b>Punctuation:</b> {route.params.vote}
      </Text>
      <Text>
        <b>Release Date:</b> {route.params.release}
      </Text>
      <Button
        title="Reviews"
        onPress={() => navigate("Reviews", { id: route.params.id })}
      />
    </View>
  );
}

function Reviews({ route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews();
  });
  const getReviews = async () => {
    var endpoint =
      Constants.URL.BASE_URL +
      "movie/" +
      route.params.id +
      "/reviews?" +
      Constants.URL.API_KEY +
      "&language=en-US&page=1";
    let response = await fetch(endpoint);
    let json = await response.json();
    setReviews(json.results);
    setIsLoading(false);
  };
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <Loader show={true} loading={isLoading} /> : null}
      <StatusBar
        backgroundColor={Constants.Colors.Cyan}
        barStyle="light-content"
      />
      <FlatGrid
        itemDimension={130}
        data={reviews}
        style={Styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <View style={[Styles.itemContainer]}>
            <Text>
              <b>Author:</b> {item.author}
            </Text>
            <Image
              source={{
                uri:
                  "https://image.tmdb.org/t/p/w500" +
                  item.author_details.avatar_path,
              }}
              style={{ width: 100, height: 100 }}
            />
            <Text>
              <b>Comment:</b>
              {item.content}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Popular Movies",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerRight: () => (
              <Button
                onPress={() => navigate("Login")}
                title="Login"
                color="blue"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
          }}
        />
        <RootStack.Screen
          name="Details"
          component={Details}
          options={{
            title: "Details",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
          }}
        />
        <RootStack.Screen
          name="Reviews"
          component={Reviews}
          options={{
            title: "Reviews",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
          }}
        />
        <RootStack.Screen
          name="Register"
          component={Register}
          options={{
            title: "Register",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
