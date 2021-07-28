import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Button,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import tailwind from "tailwind-rn";
import Animated from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const Separator = () => <View style={styles.separator} />;
// https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-fun-children-s-day-poster-background-image_228639.jpg
// https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-blue-cartoon-children-s-day-advertising-background-image_227742.jpg
const image = {
  uri: "https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-fun-children-s-day-poster-background-image_228639.jpg",
};
const { width, height } = Dimensions.get("window");
export default function Home({ navigation }) {
  const { register, handleSubmit } = useForm();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View>
          <View
            style={tailwind("mb-4 flex flex-row justify-center max-w-full")}
            // className="m-4 flex justify-center "
            // onSubmit={(e) => handleOnSubmit(e)}
          >
            <TextInput
              style={tailwind(
                "px-4 py-2 rounded-full  text-gray-800 border-gray-200 bg-white"
              )}
              placeholder="input pin"
              onChange={(e) => onChangeHandlerRoomkey(e)}
            />
          </View>
          <View
            style={tailwind("mb-4 flex flex-row justify-center max-w-full")}
            // className="m-4 flex justify-center "
            // onSubmit={(e) => handleOnSubmit(e)}
          >
            <TextInput
              style={tailwind(
                "px-4 py-2 rounded-full max-w-4/12 text-gray-800 border-gray-200 bg-white"
              )}
              placeholder="nickname"
              onChange={(e) => onChangeHandlerPlayername(e)}
            />
          </View>
          <TouchableHighlight
          // onPress={onPress}
          >
            <View
              style={tailwind(
                "mt-4 mx-16 px-4 py-2 rounded-full bg-yellow-400 text-center text-gray-800 font-bold uppercase border-yellow-500 "
              )}
            >
              <Text>Join</Text>
            </View>
          </TouchableHighlight>
        </View>
        {/* <Text style={styles.text}>Inside</Text> */}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginHorizontal: 0,
    // marginVertical: 0,
    // backgroundColor: '#96BAFF'
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  score: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  // container: {
  //   flex: 1,
  // },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
