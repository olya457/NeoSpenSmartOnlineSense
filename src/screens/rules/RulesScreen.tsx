import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Share,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { rules } from '../../data/rules';
import { getSavedRuleIds, toggleSavedRule } from '../../utils/savedRules';

const { height } = Dimensions.get('window');

export default function RulesScreen() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const isSmall = height < 780;
  const isVerySmall = height < 700;

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      getSavedRuleIds().then((ids) => {
        if (mounted) setSavedIds(ids);
      });

      return () => {
        mounted = false;
      };
    }, [])
  );

  const handleToggleSave = async (id: string) => {
    const updated = await toggleSavedRule(id);
    setSavedIds(updated);
  };

  const handleShare = async (text: string) => {
    try {
      await Share.share({ message: text });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onboarding_bg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <SafeAreaView style={styles.safe}>
        <FlatList
          data={rules}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            {
              paddingTop: 15,
              paddingHorizontal: isVerySmall ? 16 : 20,
              paddingBottom: 120,
            },
          ]}
          ListHeaderComponent={
            <Text
              style={[
                styles.heading,
                {
                  fontSize: isVerySmall ? 24 : isSmall ? 26 : 28,
                  lineHeight: isVerySmall ? 30 : isSmall ? 32 : 34,
                  marginBottom: isVerySmall ? 16 : 20,
                },
              ]}
            >
              Rules
            </Text>
          }
          renderItem={({ item }) => {
            const isSaved = savedIds.includes(item.id);

            return (
              <View
                style={[
                  styles.card,
                  {
                    borderRadius: isVerySmall ? 14 : 16,
                    padding: isVerySmall ? 14 : 16,
                    marginBottom: isVerySmall ? 10 : 12,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.cardText,
                    {
                      fontSize: isVerySmall ? 14 : 15,
                      lineHeight: isVerySmall ? 21 : 22,
                      marginBottom: isVerySmall ? 12 : 14,
                    },
                  ]}
                >
                  {item.text}
                </Text>

                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={[
                      styles.actionBtn,
                      {
                        width: isVerySmall ? 36 : 40,
                        height: isVerySmall ? 36 : 40,
                        borderRadius: isVerySmall ? 9 : 10,
                      },
                    ]}
                    onPress={() => handleShare(item.text)}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.actionIcon}>⬆</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionBtn,
                      isSaved && styles.actionBtnSaved,
                      {
                        width: isVerySmall ? 36 : 40,
                        height: isVerySmall ? 36 : 40,
                        borderRadius: isVerySmall ? 9 : 10,
                      },
                    ]}
                    onPress={() => handleToggleSave(item.id)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.actionIcon,
                        isSaved && styles.actionIconSaved,
                      ]}
                    >
                      🔖
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5,15,10,0.78)',
  },
  safe: {
    flex: 1,
  },
  list: {},
  heading: {
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
    textAlign: 'center',
    alignSelf: 'center',
  },

  card: {
    backgroundColor: 'rgba(0, 40, 25, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,136,0.1)',
  },
  cardText: {
    fontWeight: '600',
    color: '#ffffff',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnSaved: {
    backgroundColor: '#00ff88',
    borderColor: '#00ff88',
    ...Platform.select({
      ios: {
        shadowColor: '#00ff88',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  actionIcon: {
    fontSize: 16,
    opacity: 0.75,
  },
  actionIconSaved: {
    opacity: 1,
  },
});