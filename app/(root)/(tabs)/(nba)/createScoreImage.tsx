import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { useState, useRef } from "react";
import ImagePicker from "@/components/imagePicker";
import * as MediaLibrary from "expo-media-library";
import ViewShot from "react-native-view-shot";

const CreateScoreImage = () => {
  const [team1Logo, setTeam1Logo] = useState<string | null>(null);
  const [team2Logo, setTeam2Logo] = useState<string | null>(null);
  const [team1Score, setTeam1Score] = useState<string>("");
  const [team2Score, setTeam2Score] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const viewShotRef = useRef<any>(null);

  const handleGeneratePreview = () => {
    if (!team1Logo || !team2Logo || !team1Score || !team2Score) {
      alert("Please select both team logos and enter scores");
      return;
    }
    setShowPreview(true);
  };

  const saveImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "granted") {
        const localUri = await viewShotRef.current.capture();
        await MediaLibrary.saveToLibraryAsync(localUri);
        alert("Image saved to gallery!");
      } else {
        alert("We need permission to save the image");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Failed to save image");
    }
  };

  const PreviewModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPreview}
      onRequestClose={() => setShowPreview(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ViewShot
            ref={viewShotRef}
            options={{
              format: "png",
              quality: 1.0,
            }}
            style={styles.previewContainer}
          >
            <View style={styles.previewHeader}>
              <Text style={styles.previewTitle}>Match Result</Text>
            </View>

            <View style={styles.previewTeamsContainer}>
              <View style={styles.previewTeam}>
                <Image
                  source={team1Logo ? { uri: team1Logo } : undefined}
                  style={styles.previewLogo}
                  resizeMode="contain"
                />
                <Text style={styles.previewScore}>{team1Score}</Text>
              </View>

              <View style={styles.previewVS}>
                <Text style={styles.previewVSText}>VS</Text>
              </View>

              <View style={styles.previewTeam}>
                <Image
                  source={team2Logo ? { uri: team2Logo } : undefined}
                  style={styles.previewLogo}
                  resizeMode="contain"
                />
                <Text style={styles.previewScore}>{team2Score}</Text>
              </View>
            </View>
          </ViewShot>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPreview(false)}
            >
              <Text style={styles.closeButtonText}>Close Preview</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.closeButton, styles.saveButton]}
              onPress={saveImage}
            >
              <Text style={styles.closeButtonText}>Save Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.teamsContainer}>
          <View style={styles.teamSection}>
            <ImagePicker
              teamLabel="Team 1"
              onImageSelect={(uri) => setTeam1Logo(uri)}
            />
            <View style={styles.scoreInputContainer}>
              <Text style={styles.scoreLabel}>Score:</Text>
              <TextInput
                style={styles.scoreInput}
                value={team1Score}
                onChangeText={setTeam1Score}
                keyboardType="numeric"
                placeholder="0"
                maxLength={3}
                placeholderTextColor="#666"
              />
            </View>
          </View>

          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          <View style={styles.teamSection}>
            <ImagePicker
              teamLabel="Team 2"
              onImageSelect={(uri) => setTeam2Logo(uri)}
            />
            <View style={styles.scoreInputContainer}>
              <Text style={styles.scoreLabel}>Score:</Text>
              <TextInput
                style={styles.scoreInput}
                value={team2Score}
                onChangeText={setTeam2Score}
                keyboardType="numeric"
                placeholder="0"
                maxLength={3}
                placeholderTextColor="#666"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGeneratePreview}
        >
          <Text style={styles.generateButtonText}>Generate Preview</Text>
        </TouchableOpacity>
      </View>

      <PreviewModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  teamsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  teamSection: {
    alignItems: "center",
    flex: 1,
  },
  vsContainer: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  vsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8d8ddf",
  },
  scoreInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
    color: "#000",
  },
  scoreInput: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: "#8d8ddf",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
    textAlign: "center",
  },
  generateButton: {
    backgroundColor: "#8d8ddf",
    padding: 16,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
    width: "80%",
    maxWidth: 300,
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxWidth: 500,
    alignItems: "center",
  },
  previewContainer: {
    backgroundColor: "#000",
    borderRadius: 15,
    padding: 20,
    width: "100%",
  },
  previewHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  previewTeamsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  previewTeam: {
    flex: 1,
    alignItems: "center",
  },
  previewLogo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  previewScore: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
  },
  previewVS: {
    paddingHorizontal: 15,
  },
  previewVSText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  closeButton: {
    backgroundColor: "#8d8ddf",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default CreateScoreImage;
