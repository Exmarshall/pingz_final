import { spacingX, spacingY } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ConversationItem = () => {
  return (
    <View>
      <Text>ConversationItem</Text>
    </View>
  );
};

export default ConversationItem;

const styles = StyleSheet.create({
  conversationItem: {
    gap: spacingX._10,
    marginVertical: spacingY._12,
    flexDirection: "row",
  },

  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },

  divider:{
    height:1,
    backgroundColor:'rgba(0,0,0,0.07)',
    width:"95%",
    alignSelf:'center'
  }
});
