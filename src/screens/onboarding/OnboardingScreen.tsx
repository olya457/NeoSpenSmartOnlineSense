import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type Props = {
  step: number;
  image: any;
  title: string;
  description: string;
  buttonLabel: string;
  onPress: () => void;
};

export default function OnboardingScreen({
  step,
  image,
  title,
  description,
  buttonLabel,
  onPress,
}: Props) {
  const isSmall = height < 780;
  const isVerySmall = height < 700;

  const imageSize = isVerySmall
    ? width * 0.5
    : isSmall
    ? width * 0.56
    : width * 0.65;

  return (
    <ImageBackground
      source={require('../../assets/images/onboarding_bg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
  
        <View
          style={[
            styles.steps,
            {
              marginTop: isVerySmall ? 48 : isSmall ? 56 : 80,
            },
          ]}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <React.Fragment key={i}>
              <View
                style={[
                  styles.stepDot,
                  isVerySmall && styles.stepDotSmall,
                  i === step && styles.stepDotActive,
                ]}
              />
              {i < 5 && (
                <View
                  style={[
                    styles.stepLine,
                    isVerySmall && styles.stepLineSmall,
                    i < step && styles.stepLineActive,
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </View>


        <View
          style={[
            styles.imageWrap,
            {
              paddingTop: isVerySmall ? 6 : isSmall ? 12 : 20,
              flex: isVerySmall ? 0.85 : 1,
            },
          ]}
        >
          <Image
            source={image}
            style={{
              width: imageSize,
              height: imageSize,
            }}
            resizeMode="contain"
          />
        </View>


        <View
          style={[
            styles.content,
            {
              paddingHorizontal: isVerySmall ? 20 : isSmall ? 24 : 28,
              paddingBottom: isVerySmall ? 18 : isSmall ? 24 : 32,
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              {
                fontSize: isVerySmall ? 26 : isSmall ? 30 : 34,
                lineHeight: isVerySmall ? 31 : isSmall ? 36 : 40,
                marginBottom: isVerySmall ? 10 : 14,
              },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.description,
              {
                fontSize: isVerySmall ? 13.5 : isSmall ? 14 : 15,
                lineHeight: isVerySmall ? 20 : isSmall ? 21 : 22,
              },
            ]}
          >
            {description}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {
              marginHorizontal: isVerySmall ? 18 : 24,
              marginBottom: isVerySmall ? 18 : isSmall ? 24 : 18,
              height: isVerySmall ? 50 : isSmall ? 52 : 54,
              borderRadius: isVerySmall ? 12 : 14,
            },
          ]}
          onPress={onPress}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: isVerySmall ? 15 : 16,
              },
            ]}
          >
            {buttonLabel}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width,
    height,
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 15, 10, 0.72)',
  },

  steps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  stepDotSmall: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  stepDotActive: {
    backgroundColor: '#00ff88',
    shadowColor: '#00ff88',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: Platform.OS === 'android' ? 6 : 0,
  },
  stepLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 4,
  },
  stepLineSmall: {
    marginHorizontal: 3,
    height: 1.2,
  },
  stepLineActive: {
    backgroundColor: '#00ff88',
  },

  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {},

  title: {
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  description: {
    color: 'rgba(255,255,255,0.68)',
    fontWeight: '400',
  },

  button: {
    backgroundColor: '#00ff88',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.2,
  },
});