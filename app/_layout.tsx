import { AuthProvider } from "@/context/authContext";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <AuthProvider>
      <StackLayout />
      {/* ✅ Toast must be mounted here */}
      <Toast />
    </AuthProvider>
  );
};

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(main)/profileModal"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
