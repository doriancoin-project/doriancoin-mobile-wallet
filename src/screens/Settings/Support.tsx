import React, {useContext} from 'react';
import {View, StyleSheet, Linking, TouchableOpacity} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';

import Header from '../../components/Header';
import HeaderButton from '../../components/Buttons/HeaderButton';
import TranslateText from '../../components/TranslateText';
import {ScreenSizeContext} from '../../context/screenSize';

type RootStackParamList = {
  Support: undefined;
};

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Support'>;
}

const SUPPORT_EMAIL = 'support@doriancoin.com';

const Support: React.FC<Props> = () => {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
    useContext(ScreenSizeContext);
  const styles = getStyles(SCREEN_WIDTH, SCREEN_HEIGHT);

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${SUPPORT_EMAIL}`);
  };

  return (
    <View style={styles.container}>
      <Header modal={true} />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <TranslateText
            textValue="?"
            textStyle={styles.iconText}
            maxSizeInPixels={SCREEN_HEIGHT * 0.05}
          />
        </View>
        <TranslateText
          textKey="support_title"
          domain="settingsTab"
          textStyle={styles.title}
          maxSizeInPixels={SCREEN_HEIGHT * 0.028}
        />
        <TranslateText
          textKey="support_description"
          domain="settingsTab"
          textStyle={styles.description}
          maxSizeInPixels={SCREEN_HEIGHT * 0.018}
        />
        <TouchableOpacity style={styles.emailButton} onPress={handleEmailPress}>
          <TranslateText
            textValue={SUPPORT_EMAIL}
            textStyle={styles.emailText}
            maxSizeInPixels={SCREEN_HEIGHT * 0.02}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (screenWidth: number, screenHeight: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F7F7',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      paddingTop: screenHeight * 0.08,
      paddingHorizontal: screenWidth * 0.1,
    },
    iconContainer: {
      height: 70,
      width: 70,
      borderRadius: 20,
      backgroundColor: '#1a1a50',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: screenHeight * 0.03,
    },
    iconText: {
      fontFamily: 'Satoshi Variable',
      fontWeight: '700',
      color: 'white',
      fontSize: 36,
    },
    title: {
      fontFamily: 'Satoshi Variable',
      fontWeight: '700',
      color: '#484859',
      fontSize: 22,
      marginBottom: screenHeight * 0.015,
      textAlign: 'center',
    },
    description: {
      fontFamily: 'Satoshi Variable',
      fontWeight: '400',
      color: '#6B6B80',
      fontSize: 15,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: screenHeight * 0.04,
    },
    emailButton: {
      backgroundColor: '#1a1a50',
      paddingHorizontal: 30,
      paddingVertical: 14,
      borderRadius: 12,
    },
    emailText: {
      fontFamily: 'Satoshi Variable',
      fontWeight: '700',
      color: 'white',
      fontSize: 16,
    },
  });

export const SupportNavigationOptions = navigation => {
  return {
    ...TransitionPresets.ModalPresentationIOS,
    headerTitle: '',
    headerTransparent: true,
    headerBackTitleVisible: false,
    headerTintColor: 'white',
    headerLeft: () => (
      <View style={{paddingTop: 30}}>
        <HeaderButton
          onPress={() => navigation.goBack()}
          imageSource={require('../../assets/images/back-icon.png')}
          textKey="back"
          textDomain="buyTab"
        />
      </View>
    ),
  };
};

export default Support;
