import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";

import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as Permissions from "expo-permissions";

import { textNormal } from "../../../styles/containers";
import { color } from "../../../styles/colors";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UpdateAvatar = ({ navigation }) => {
  const stackNavigator = useRef(navigation.dangerouslyGetParent()).current;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);

  useLayoutEffect(() => {
    stackNavigator.setOptions({
      tabBarVisible: false,
    });
    const onBlur = navigation.addListener("blur", () => {
      stackNavigator.setOptions({
        tabBarVisible: true,
      });
    });
    return onBlur;
  }, []);

  const requestPermissions = async () => {
    try {
      const cameraPermission = await Camera.requestPermissionsAsync();
      setHasPermission(cameraPermission.status === "granted");
    } catch (error) {
      console.log("Error from requestPermissions", error);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const pickImage = async () => {
    try {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!image.cancelled) {
        setImage(image);
      }
    } catch (error) {
      console.log("Error from pickImage", error);
    }
  };

  const takePhoto = async () => {
    try {
      if (camera) {
        let photo = await camera.takePictureAsync();
        if (type === Camera.Constants.Type.front) {
          photo = await ImageManipulator.manipulateAsync(photo.uri, [
            { flip: ImageManipulator.FlipType.Horizontal },
          ]);
        }
        setImage(photo);
      }
    } catch (error) {
      console.log("Error from takePhoto", error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const keepPhoto = async () => {
    photo = await ImageManipulator.manipulateAsync(image.uri, [
      { resize: { width: 500 } },
    ]);
    navigation.navigate("UpdateProfile", { image: photo });
  };

  return (
    <View style={styles.container}>
      {image ? (
        <>
          <ImageBackground
            source={{ uri: image.uri }}
            resizeMode="contain"
            style={[styles.image]}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.buttons}>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    setImage(undefined);
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera-retake-outline"
                    size={28}
                    color="white"
                  />
                </Pressable>
                <Pressable style={styles.button} onPress={keepPhoto}>
                  <Text style={textNormal}>Use that Photo</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </>
      ) : (
        <Camera
          style={styles.camera}
          type={type}
          autoFocus="on"
          flashMode="auto"
          ref={(ref) => {
            setCamera(ref);
          }}
        >
          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <Pressable onPress={pickImage}>
                <Ionicons name="ios-images" size={30} color="white" />
              </Pressable>
              <Pressable onPress={takePhoto}>
                <View style={styles.photoOuterCircle}>
                  <View style={styles.photoInnerCircle}></View>
                </View>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.front
                      ? Camera.Constants.Type.back
                      : Camera.Constants.Type.front
                  );
                }}
              >
                <Ionicons name="ios-sync" size={30} color="white" />
              </Pressable>
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: color.background,
  },
  camera: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  photoOuterCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: color.white,
    alignItems: "center",
    justifyContent: "center",
  },
  photoInnerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.white,
  },
});

export default UpdateAvatar;
