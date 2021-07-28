import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, ScrollView, TextInput, Image, TouchableHighlight, Button, Alert, Dimensions, } from "react-native";
import { Picker } from "@react-native-picker/picker";
import tailwind from "tailwind-rn";

const Separator = () => <View style={styles.separator} />;
// https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-fun-children-s-day-poster-background-image_228639.jpg
// https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-blue-cartoon-children-s-day-advertising-background-image_227742.jpg
const image = {
  uri: "https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-blue-cartoon-children-s-day-advertising-background-image_227742.jpg",
};
const { width, height } = Dimensions.get("window");
export default function Game({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View>
        <View style={tailwind('max-w-screen')}>
              <View
                style={tailwind('mb-4 flex flex-row justify-center max-w-full')}
                // className="m-4 flex justify-center "
                // onSubmit={(e) => handleOnSubmit(e)}
                >
                <Image
                  style={tailwind('px-4 py-4 rounded-full  text-gray-800 border-gray-200 bg-white')}
                  source={{
                    uri: 'https://yt3.ggpht.com/ytc/AKedOLSilrN3bx_7mqy_RRmdRFiMLPgc8e537GbYW5Sq=s900-c-k-c0x00ffffff-no-rj',
                  }}
                />

              </View>
              <View
                style={tailwind('mb-4 flex flex-row justify-center max-w-full')}
                // className="m-4 flex justify-center "
                // onSubmit={(e) => handleOnSubmit(e)}
                >
                <Image
                  style={tailwind('px-16 py-16 rounded-lg  text-gray-800 border-gray-200 bg-white')}
                  source={{
                    uri: 'https://asset.kompas.com/crops/sn--2PkUfeAmtszsB-wnqXmwBkM=/0x0:5184x3456/750x500/data/photo/2020/12/11/5fd303549b2c9.jpg',
                  }}
                />

              </View>

              <View style={tailwind('flex flex-row items-center max-w-full')}>
                <TouchableHighlight
                  // onPress={onPress}
                  >
                  <View style={tailwind('px-8 py-2 mx-1 min-w-1/4 rounded-full bg-blue-400 text-center text-gray-800 font-bold uppercase border-blue-500')}>
                    <Text>Answer A</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  // onPress={onPress}
                  >
                  <View style={tailwind('px-8 py-2 mx-1 min-w-1/4 rounded-full bg-blue-400 text-center text-gray-800 font-bold uppercase border-blue-500')}>
                    <Text>Answer B</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={tailwind('flex flex-row items-center max-w-full mt-4 mb-4')}>
                <TouchableHighlight
                  // onPress={onPress}
                  >
                  <View style={tailwind('px-8 py-2 mx-1 min-w-1/4 rounded-full bg-blue-400 text-center text-gray-800 font-bold uppercase border-blue-500')}>
                    <Text>Answer C</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  // onPress={onPress}
                  >
                  <View style={tailwind('px-8 py-2 mx-1 min-w-1/4 rounded-full bg-blue-400 text-center text-gray-800 font-bold uppercase border-blue-500')}>
                    <Text>Answer D</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>

            <View
              style={tailwind('mb-4 flex flex-row justify-center max-w-full')}
              // className="m-4 flex justify-center "
              // onSubmit={(e) => handleOnSubmit(e)}
              >
              <Image
                style={tailwind('px-4 py-4 rounded-full  text-gray-800 border-gray-200 bg-white')}
                source={{
                  uri: 'https://img.freepik.com/free-vector/isolated-retro-vintage-microphone_1284-38772.jpg?size=338&ext=jpg',
                }}
              />

            </View>
            <TouchableHighlight
              // onPress={onPress}
              >
              <View style={tailwind('mt-4 px-4 py-2 rounded-full bg-red-300 text-center text-gray-800 font-bold uppercase border-yellow-500 ')}>
                <Text>Submit</Text>
              </View>
            </TouchableHighlight>
        </View>
        {/* <Text style={styles.text}>Inside</Text> */}
      </ImageBackground>
    </SafeAreaView>





    //   <SafeAreaView style={tailwind('h-full')}>
    // 	<View style={tailwind('pt-12 items-center bg-red-600 min-h-full')}>
    // 		<View style={tailwind('bg-red-600 px-3 py-1 rounded-full max-w-full')}>
    // 			<Text style={tailwind('text-blue-800 font-semibold max-w-full')}>
    // 				Android Tailwind
    // 			</Text>

    //         <View style={tailwind('max-w-screen')}>
    //           <View
    //             style={tailwind('mb-4 flex flex-row justify-center max-w-full')}
    //             // className="m-4 flex justify-center "
    //             // onSubmit={(e) => handleOnSubmit(e)}
    //             >
    //             <Image
    //               style={tailwind('px-4 py-4 rounded-full  text-gray-800 border-gray-200 bg-white')}
    //               source={{
    //                 uri: 'https://yt3.ggpht.com/ytc/AKedOLSilrN3bx_7mqy_RRmdRFiMLPgc8e537GbYW5Sq=s900-c-k-c0x00ffffff-no-rj',
    //               }}
    //             />

    //           </View>
    //           <View
    //             style={tailwind('mb-4 flex flex-row justify-center max-w-full')}
    //             // className="m-4 flex justify-center "
    //             // onSubmit={(e) => handleOnSubmit(e)}
    //             >
    //             <Image
    //               style={tailwind('px-16 py-16 rounded-lg  text-gray-800 border-gray-200 bg-white')}
    //               source={{
    //                 uri: 'https://asset.kompas.com/crops/sn--2PkUfeAmtszsB-wnqXmwBkM=/0x0:5184x3456/750x500/data/photo/2020/12/11/5fd303549b2c9.jpg',
    //               }}
    //             />

    //           </View>

    //           <View style={tailwind('flex flex-row items-center max-w-full')}>
    //             <TouchableHighlight
    //               // onPress={onPress}
    //               >
    //               <View style={tailwind('px-8 py-2 mx-1 min-w-1/4 rounded-full bg-blue-400 text-center text-gray-800 font-bold uppercase border-blue-500')}>
    //                 <Text>Answer A</Text>
    //               </View>
    //             </TouchableHighlight>
    //             <TouchableHighlight
    //               // onPress={onPress}
    //               >
    //               <View style={tailwind('px-8 py-2 mx-1 min-w-1/4 rounded-full bg-blue-400 text-center text-gray-800 font-bold uppercase border-blue-500')}>
    //                 <Text>Answer B</Text>
    //               </View>
    //             </TouchableHighlight>
    //           </View>
    //           <View style={tailwind('flex flex-row items-center max-w-full mt-4 mb-4')}>
    //             <TouchableHighlight
    //               // onPress={onPress}
    //               >
    //               <View style={tailwind('px-8 py-2 mx-1 min-w-1/4 rounded-full bg-blue-400 text-center text-gray-800 font-bold uppercase border-blue-500')}>
    //                 <Text>Answer C</Text>
    //               </View>
    //             </TouchableHighlight>
    //             <TouchableHighlight
    //               // onPress={onPress}
    //               >
    //               <View style={tailwind('px-8 py-2 mx-1 min-w-1/4 rounded-full bg-blue-400 text-center text-gray-800 font-bold uppercase border-blue-500')}>
    //                 <Text>Answer D</Text>
    //               </View>
    //             </TouchableHighlight>
    //           </View>
    //         </View>

    //         <View
    //           style={tailwind('mb-4 flex flex-row justify-center max-w-full')}
    //           // className="m-4 flex justify-center "
    //           // onSubmit={(e) => handleOnSubmit(e)}
    //           >
    //           <Image
    //             style={tailwind('px-4 py-4 rounded-full  text-gray-800 border-gray-200 bg-white')}
    //             source={{
    //               uri: 'https://img.freepik.com/free-vector/isolated-retro-vintage-microphone_1284-38772.jpg?size=338&ext=jpg',
    //             }}
    //           />

    //         </View>
    //         <TouchableHighlight
    //           // onPress={onPress}
    //           >
    //           <View style={tailwind('mt-4 px-4 py-2 rounded-full bg-red-300 text-center text-gray-800 font-bold uppercase border-yellow-500 ')}>
    //             <Text>Submit</Text>
    //           </View>
    //         </TouchableHighlight>
    // 		</View>
    // 	</View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginHorizontal: 0,
    // marginVertical: 0,
    // backgroundColor: "#96BAFF",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  tinyLogo: {
    width: 50,
    height: 50,
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
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});
