import Avatar from "@/components/Avatar";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/context/authContext";
import { listenUpdateProfile, emitUpdateProfile } from "@/socket/socketEvents";
import { UserDataProps } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileModal = () => {
  const { user, signOut, updateToken } = useAuth();
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  const [userData, setUserData] = useState<UserDataProps>({
    name: "",
    email: "",
    avatar: null,
  });

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar,
    });
  }, [user]);

  const onPickImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setUserData({...userData,avatar: result.assets[0]});
    }
  }

  useEffect(() => {
    listenUpdateProfile(processUpdateProfile);
    return () => listenUpdateProfile(processUpdateProfile, true);
  }, []);

  const processUpdateProfile = (res: any) => {
    setIsLoading(false);
    console.log("updateProfile response:", res);

    if (res.success) {
      updateToken(res.token);
      router.back();
    } else {
      Alert.alert("Profile", res.msg);
    }
  };

  const handleLogout = async () => {
    router.back();
    await signOut();
  };

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: handleLogout },
    ]);
  };

  const onSubmit = () => {
    if (!userData.name.trim()) {
      Alert.alert("User", "Please enter your name");
      return;
    }

    setIsLoading(true);
    emitUpdateProfile({
      name: userData.name,
      avatar: userData.avatar,
    });
  };

  return (
    <ScreenWrapper isModal={true}>
      <View style={styles.container}>
        <Header
          title="Update Profile"
          leftIcon={
            Platform.OS === "android" && <BackButton color={colors.black} />
          }
          style={{ marginVertical: spacingY._15 }}
        />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Avatar uri={userData.avatar} size={170} />
            <TouchableOpacity style={styles.editIcon} onPress={onPickImage}>
              <Icons.Pencil
                size={verticalScale(20)}
                color={colors.neutral800}
              />
            </TouchableOpacity>
          </View>

          <View style={{ gap: spacingY._20 }}>
            <View style={styles.inputContainer}>
              <Typo style={{ paddingLeft: spacingX._10 }}>Email</Typo>
              <Input
                value={userData.email}
                editable={false}
                containerStyle={{
                  borderColor: colors.neutral350,
                  backgroundColor: colors.neutral300,
                  paddingLeft: spacingX._20,
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Typo style={{ paddingLeft: spacingX._10 }}>Name</Typo>
              <Input
                value={userData.name}
                onChangeText={(value) =>
                  setUserData({ ...userData, name: value })
                }
                containerStyle={{
                  borderColor: colors.neutral350,
                  paddingLeft: spacingX._20,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {!loading && (
          <Button
            style={{
              backgroundColor: colors.rose,
              height: verticalScale(56),
              width: verticalScale(56),
            }}
            onPress={showLogoutAlert}
          >
            <Icons.SignOut
              size={verticalScale(30)}
              color={colors.white}
              weight="bold"
            />
          </Button>
        )}

        <Button style={{ flex: 1 }} onPress={onSubmit} loading={loading}>
          <Typo size={16} fontWeight="700" color={colors.black}>
            Update
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: { gap: spacingY._7 },
  avatarContainer: { position: "relative", alignSelf: "center" },
  form: { gap: spacingY._30, marginTop: spacingY._15 },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    gap: scale(20),
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._15,
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
    marginBottom: spacingY._10,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },
});
