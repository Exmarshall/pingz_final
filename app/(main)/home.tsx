import Button from "@/components/Button";
import ConversationItem from "@/components/ConversationItem";
import Loading from "@/components/Loading";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/context/authContext";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const Home = () => {
  const { user: currentUser, signOut } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  const conversations = [
    {
      name: "Zainab",
      type: "direct",
      lastMessage: {
        senderName: "Zainab",
        content: "Are you coming today? 😊",
        createdAt: "2024-05-12T14:22:00.000Z",
      },
    },
    {
      name: "Ayo",
      type: "direct",
      lastMessage: {
        senderName: "You",
        content: "Say less bro 🔥",
        createdAt: "2024-05-12T13:10:00.000Z",
      },
    },
    {
      name: "Lukman",
      type: "direct",
      lastMessage: {
        senderName: "Lukman",
        content: "Check your WhatsApp",
        createdAt: "2024-05-12T10:45:00.000Z",
      },
    },
    {
      name: "Fatima",
      type: "direct",
      lastMessage: {
        senderName: "Fatima",
        content: "Okay, talk later 💕",
        createdAt: "2024-05-11T21:03:00.000Z",
      },
    },

    // GROUPS
    {
      name: "The Boys GC",
      type: "group",
      lastMessage: {
        senderName: "Ayo",
        content: "Who dey online? 😂",
        createdAt: "2024-05-12T08:32:00.000Z",
      },
    },
    {
      name: "Family Group",
      type: "group",
      lastMessage: {
        senderName: "Mum",
        content: "Everybody be home by 7.",
        createdAt: "2024-05-11T19:10:00.000Z",
      },
    },
    {
      name: "Project Team 7",
      type: "group",
      lastMessage: {
        senderName: "Zainab",
        content: "Submit your part before evening.",
        createdAt: "2024-05-11T16:52:00.000Z",
      },
    },
    {
      name: "Crypto Gang",
      type: "group",
      lastMessage: {
        senderName: "Lukman",
        content: "BTC just pumped 🚀",
        createdAt: "2024-05-10T23:40:00.000Z",
      },
    },
  ];
  let directConversations = conversations
    .filter((item: any) => item.type == "direct")
    .sort((a: any, b: any) => {
      const aDate = a?.lastMessage?.createdAt || a.createdAt;
      const bDate = b?.lastMessage?.createdAt || b.createdAt;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });

  let groupConversations = conversations
    .filter((item: any) => item.type == "group")
    .sort((a: any, b: any) => {
      const aDate = a?.lastMessage?.createdAt || a.createdAt;
      const bDate = b?.lastMessage?.createdAt || b.createdAt;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });

  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.4}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Typo
              color={colors.neutral200}
              size={16}
              textProps={{ numberOfLines: 1 }}
            >
              Welcome back,{" "}
              <Typo size={19} color={colors.white} fontWeight={"800"}>
                {currentUser?.name}
              </Typo>{" "}
              🤙
            </Typo>
          </View>
          <TouchableOpacity
            style={styles.settingIcon}
            onPress={() => router.push("/(main)/profileModal")}
          >
            <Icons.GearSixIcon
              color={colors.white}
              weight="fill"
              size={verticalScale(22)}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: spacingY._20 }}
          >
            <View style={styles.navBar}>
              <View style={styles.tabs}>
                {/* ✅ FIXED HERE */}
                <TouchableOpacity
                  onPress={() => setSelectedTab(0)}
                  style={[
                    styles.tabStyle,
                    selectedTab == 0 && styles.activeTabStyle,
                  ]}
                >
                  <Typo>Direct Messages</Typo>
                </TouchableOpacity>

                {/* ✅ FIXED HERE */}
                <TouchableOpacity
                  onPress={() => setSelectedTab(1)}
                  style={[
                    styles.tabStyle,
                    selectedTab == 1 && styles.activeTabStyle,
                  ]}
                >
                  <Typo>Groups</Typo>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.conversationList}>
              {selectedTab == 0 &&
                directConversations.map((item: any, index) => {
                  return (
                    <ConversationItem
                      item={item}
                      key={index}
                      router={router}
                      showDivider={directConversations.length != index + 1}
                    />
                  );
                })}

              {selectedTab == 1 &&
                groupConversations.map((item: any, index) => {
                  return (
                    <ConversationItem
                      item={item}
                      key={index}
                      router={router}
                      showDivider={directConversations.length != index + 1}
                    />
                  );
                })}
            </View>
            {!loading &&
              selectedTab == 0 &&
              directConversations.length == 0 && (
                <Typo style={{ textAlign: "center" }}>No Messages Yet!!</Typo>
              )}

            {!loading && selectedTab == 1 && groupConversations.length == 0 && (
              <Typo style={{ textAlign: "center" }}>
                You are not in any group Yet!!
              </Typo>
            )}

            {loading && <Loading />}
          </ScrollView>
        </View>
      </View>

      <Button
        style={styles.floatingButton}
        onPress={() =>
          router.push({
            pathname: "/(main)/newConversationModal",
            params: { isGroup: selectedTab },
          })
        }
      >
        <Icons.Plus size={verticalScale(24)} color={colors.black} weight="bold" />
      </Button>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30),
  },
  settingIcon: {
    padding: spacingY._10,
    backgroundColor: colors.neutral700,
    borderRadius: radius.full,
  },
  conversationList: {
    paddingVertical: spacingY._20,
  },
  activeTabStyle: {
    backgroundColor: colors.primaryLight,
  },
  tabStyle: {
    paddingVertical: spacingY._10,
    paddingHorizontal: spacingX._20,
    borderRadius: radius.full,
    backgroundColor: colors.neutral100,
  },
  tabs: {
    flexDirection: "row",
    gap: spacingX._10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navBar: {
    flexDirection: "row",
    gap: spacingX._15,
    paddingHorizontal: spacingX._10,
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._50,
    borderTopRightRadius: radius._50,
    borderCurve: "continuous",
    overflow: "hidden",
    paddingHorizontal: spacingX._20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacingX._20,
    gap: spacingY._15,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._20,
  },
  container: {
    flex: 1,
  },
});
