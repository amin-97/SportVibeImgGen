import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React from "react";
import imagePlaceholder from "../assets/images/imageplaceholder.png";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

interface ImagePickerProps {
  onImageSelect: (uri: string) => void;
  teamLabel: string;
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({
  onImageSelect,
  teamLabel,
}) => {
  const [img, setImg] = useState<any>(imagePlaceholder);

  const handlePress = () => {
    Alert.alert(
      `Choose ${teamLabel} Logo`,
      "Do you want to take a photo or choose from gallery?",
      [
        { text: "Take Photo", onPress: handleCameraLaunch },
        { text: "Choose from Gallery", onPress: openImagePicker },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const openImagePicker = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "You need to grant gallery access to select images."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log("Picker result:", result);

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setImg({ uri: imageUri });
        onImageSelect(imageUri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const handleCameraLaunch = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "You need to grant camera access to take photos."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log("Camera result:", result);

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setImg({ uri: imageUri });
        onImageSelect(imageUri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{teamLabel}</Text>
      <TouchableOpacity onPress={handlePress}>
        <Image style={styles.image} resizeMode="contain" source={img} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
});

export default ImagePickerComponent;
