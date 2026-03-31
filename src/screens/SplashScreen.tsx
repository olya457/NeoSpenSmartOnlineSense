import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const MATRIX_HTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
  }
  .ai-matrix-loader {
    width: 120px;
    height: 160px;
    margin: 30px auto;
    position: relative;
    perspective: 800px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
  }
  .digit {
    color: #00ff88;
    font-family: monospace;
    font-size: 18px;
    text-align: center;
    text-shadow: 0 0 5px #00ff88;
    animation: matrix-fall 2s infinite, matrix-flicker 0.5s infinite;
    opacity: 0;
  }
  .digit:nth-child(1) { animation-delay: 0.1s; }
  .digit:nth-child(2) { animation-delay: 0.3s; }
  .digit:nth-child(3) { animation-delay: 0.5s; }
  .digit:nth-child(4) { animation-delay: 0.7s; }
  .digit:nth-child(5) { animation-delay: 0.9s; }
  .digit:nth-child(6) { animation-delay: 1.1s; }
  .digit:nth-child(7) { animation-delay: 1.3s; }
  .digit:nth-child(8) { animation-delay: 1.5s; }
  .glow {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%);
    animation: matrix-pulse 2s infinite;
  }
  @keyframes matrix-fall {
    0%   { transform: translateY(-50px) rotateX(90deg); opacity: 0; }
    20%, 80% { transform: translateY(0) rotateX(0deg); opacity: 0.8; }
    100% { transform: translateY(50px) rotateX(-90deg); opacity: 0; }
  }
  @keyframes matrix-flicker {
    0%, 19%, 21%, 100% { opacity: 0.8; }
    20% { opacity: 0.2; }
  }
  @keyframes matrix-pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.7; }
  }
</style>
</head>
<body>
  <div class="ai-matrix-loader">
    <div class="glow"></div>
    <div class="digit">1</div>
    <div class="digit">0</div>
    <div class="digit">1</div>
    <div class="digit">0</div>
    <div class="digit">1</div>
    <div class="digit">0</div>
    <div class="digit">1</div>
    <div class="digit">0</div>
  </div>
</body>
</html>
`;

export default function SplashScreen({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Onboarding');
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/splash_bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <Animated.View style={[styles.center, { opacity: fadeAnim }]}>
        <WebView
          source={{ html: MATRIX_HTML }}
          style={styles.webview}
          scrollEnabled={false}
          backgroundColor="transparent"
          originWhitelist={['*']}
        />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    width: 200,
    height: 240,
    backgroundColor: 'transparent',
  },
});