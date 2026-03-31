import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Share,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TestStackParamList } from '../../navigation/TestNavigator';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<TestStackParamList, 'TestResults'>;
  route: RouteProp<TestStackParamList, 'TestResults'>;
};

const PSIZE = 130;

export default function TestResults({ navigation, route }: Props) {
  const { correct, total, answers } = route.params;

  const isSmall = height < 780;
  const isVerySmall = height < 700;

  const skipped = Object.values(answers).filter((v) => v === 'skip').length;
  const wrong = total - correct - skipped;

  const correctDeg = (correct / total) * 360;
  const wrongDeg = (wrong / total) * 360;
  const skipDeg = (skipped / total) * 360;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Knowledge test result: ${correct}/${total} correct answers!`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const pieSize = isVerySmall ? 112 : isSmall ? 120 : 130;
  const pieInner = pieSize * 0.52;

  return (
    <ImageBackground
      source={require('../../assets/images/onboarding_bg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: 15,
              paddingHorizontal: isVerySmall ? 16 : 20,
              paddingBottom: 90,
            },
          ]}
        >
          <Text
            style={[
              styles.heading,
              {
                fontSize: isVerySmall ? 26 : isSmall ? 28 : 30,
                lineHeight: isVerySmall ? 32 : isSmall ? 34 : 36,
                marginBottom: isVerySmall ? 18 : 22,
              },
            ]}
          >
            Knowledge test
          </Text>

          <View
            style={[
              styles.card,
              {
                borderRadius: isVerySmall ? 16 : 20,
                padding: isVerySmall ? 14 : isSmall ? 16 : 20,
              },
            ]}
          >
            <View
              style={[
                styles.cardHeader,
                {
                  marginBottom: isVerySmall ? 18 : 24,
                },
              ]}
            >
              <Text
                style={[
                  styles.cardTitle,
                  {
                    fontSize: isVerySmall ? 14 : 16,
                  },
                ]}
              >
                Completed question:
              </Text>

              <TouchableOpacity
                onPress={handleShare}
                style={[
                  styles.shareBtn,
                  {
                    width: isVerySmall ? 34 : 36,
                    height: isVerySmall ? 34 : 36,
                    borderRadius: isVerySmall ? 9 : 10,
                  },
                ]}
              >
                <Text style={styles.shareIcon}>⬆</Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.chartRow,
                isVerySmall && styles.chartRowSmall,
                {
                  gap: isVerySmall ? 16 : 24,
                },
              ]}
            >
              <View
                style={[
                  styles.pieContainer,
                  {
                    width: pieSize,
                    height: pieSize,
                    borderRadius: pieSize / 2,
                  },
                ]}
              >
                <View
                  style={[
                    styles.pieSlice,
                    styles.pieGreen,
                    {
                      width: pieSize,
                      height: pieSize,
                      borderRadius: pieSize / 2,
                      borderWidth: pieSize / 2,
                      transform: [{ rotate: '0deg' }],
                    },
                  ]}
                />

                <View
                  style={[
                    styles.pieSlice,
                    styles.pieRed,
                    {
                      width: pieSize,
                      height: pieSize,
                      borderRadius: pieSize / 2,
                      borderWidth: pieSize / 2,
                      transform: [{ rotate: `${correctDeg}deg` }],
                    },
                  ]}
                />

                <View
                  style={[
                    styles.pieSlice,
                    styles.pieGray,
                    {
                      width: pieSize,
                      height: pieSize,
                      borderRadius: pieSize / 2,
                      borderWidth: pieSize / 2,
                      transform: [{ rotate: `${correctDeg + wrongDeg}deg` }],
                    },
                  ]}
                />

                <View
                  style={[
                    styles.pieCenter,
                    {
                      width: pieInner,
                      height: pieInner,
                      borderRadius: pieInner / 2,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.piePct,
                      {
                        fontSize: isVerySmall ? 16 : 18,
                      },
                    ]}
                  >
                    {Math.round((correct / total) * 100)}%
                  </Text>
                </View>
              </View>

              <View style={styles.legend}>
                <View style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: '#00e676' }]} />
                  <Text
                    style={[
                      styles.legendLabel,
                      {
                        fontSize: isVerySmall ? 12.5 : 13,
                      },
                    ]}
                  >
                    Correct answer
                  </Text>
                </View>

                <View style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: '#d32f2f' }]} />
                  <Text
                    style={[
                      styles.legendLabel,
                      {
                        fontSize: isVerySmall ? 12.5 : 13,
                      },
                    ]}
                  >
                    Not correct answer
                  </Text>
                </View>

                <View style={styles.legendRow}>
                  <View
                    style={[
                      styles.legendDot,
                      { backgroundColor: 'rgba(255,255,255,0.3)' },
                    ]}
                  />
                  <Text
                    style={[
                      styles.legendLabel,
                      {
                        fontSize: isVerySmall ? 12.5 : 13,
                      },
                    ]}
                  >
                    Skip answer
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.restartBtn,
              {
                height: isVerySmall ? 52 : 56,
                borderRadius: isVerySmall ? 14 : 16,
                marginTop: isVerySmall ? 16 : 20,
              },
            ]}
            onPress={() => navigation.replace('TestScreen')}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.restartText,
                {
                  fontSize: isVerySmall ? 15 : 16,
                },
              ]}
            >
              Restart test
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width,
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 12, 8, 0.82)',
  },
  scrollContent: {
    flexGrow: 1,
  },

  heading: {
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
    textAlign: 'center',
    alignSelf: 'center',
  },

  card: {
    backgroundColor: 'rgba(0, 30, 18, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,136,0.12)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontWeight: '700',
    color: '#ffffff',
  },
  shareBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    fontSize: 16,
    color: '#ffffff',
  },

  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartRowSmall: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  pieContainer: {
    backgroundColor: '#1a3a28',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  pieSlice: {
    position: 'absolute',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  pieGreen: {
    borderTopColor: '#00e676',
    borderRightColor: '#00e676',
  },
  pieRed: {
    borderTopColor: '#d32f2f',
    borderRightColor: '#d32f2f',
  },
  pieGray: {
    borderTopColor: 'rgba(255,255,255,0.25)',
    borderRightColor: 'rgba(255,255,255,0.25)',
  },
  pieCenter: {
    position: 'absolute',
    backgroundColor: 'rgba(5,12,8,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  piePct: {
    fontWeight: '800',
    color: '#00e676',
  },

  legend: {
    flex: 1,
    gap: 14,
    alignSelf: 'stretch',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
    flexShrink: 1,
  },

  restartBtn: {
    backgroundColor: '#00e676',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#00e676',
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  restartText: {
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.3,
  },
});