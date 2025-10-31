import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "@/constants/theme";
import { BackButtonProps } from "@/assets/types";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { verticalScale } from "@/utils/styling";

const BackButton = ({
  style,
  iconSize = 26,
  color = colors.white,
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={[styles.button, style]}
    >
      <ChevronLeft
        size={verticalScale(iconSize)}
        color={color}
        strokeWidth={3}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {},
});
