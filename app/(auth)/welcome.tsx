import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Button from "@/components/Button";
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useRouter } from 'expo-router';

const Welcome = () => {
  const router = useRouter()
  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.5}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Typo size={43} color={colors.white} fontWeight="900">
            {" "}
            MCHAT
          </Typo>
        </View>

        <Animated.Image
          entering={FadeIn.duration(100).springify()}
          source={require("../../assets/images/welcome.png")}
          style={styles.welcomeImage}
          resizeMode="contain"
        />

        <View>
          <Typo color={colors.white} size={33} fontWeight={800}>
            Stay Connected
          </Typo>
          <Typo color={colors.white} size={33} fontWeight={800}>
           with 
          </Typo>
          <Typo color={colors.white} size={33} fontWeight={800}>
            Friends & Loved ones
          </Typo>
        </View>

        <Button  style={{backgroundColor:colors.white}} onPress={()=>router.push('/(auth)/register')}>
            <Typo size={23} fontWeight={'bold'} >
                Get Started
            </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-around',
        paddingHorizontal:spacingX._20,
        marginVertical:spacingY._10,

    },

    background:{
        flex:1,
        backgroundColor:colors.neutral900,
    },

    welcomeImage:{
        height:verticalScale(300),
        aspectRatio:1,
        alignSelf:'center',
    }
})