import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { stories } from '../../data/stories';
import { getSavedStoryIds, toggleSavedStory } from '../../utils/savedStories';

const { width, height } = Dimensions.get('window');

type StoriesStackParamList = {
  StoriesList: undefined;
  StoryDetail: { id: string };
};

export default function StoriesList() {
  const navigation = useNavigation<NativeStackNavigationProp<StoriesStackParamList>>();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const isSmall = height < 780;
  const isVerySmall = height < 700;
  const androidOffset = Platform.OS === 'android' ? 20 : 0;
  const androidBottomExtra = Platform.OS === 'android' ? 40 : 0;

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      const loadSaved = async () => {
        const ids = await getSavedStoryIds();
        if (mounted) setSavedIds(ids);
      };

      loadSaved();

      return () => {
        mounted = false;
      };
    }, [])
  );

  const handleToggleSave = async (id: string) => {
    const updated = await toggleSavedStory(id);
    setSavedIds(updated);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onboarding_bg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={stories}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            {
              paddingTop: 15 + androidOffset,
              paddingHorizontal: isVerySmall ? 16 : 20,
              paddingBottom: 120 + androidBottomExtra,
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
              Educational stories
            </Text>
          }
          renderItem={({ item }) => {
            const saved = savedIds.includes(item.id);

            return (
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    borderRadius: isVerySmall ? 14 : 16,
                    padding: isVerySmall ? 14 : 16,
                    marginBottom: isVerySmall ? 12 : 14,
                  },
                ]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('StoryDetail', { id: item.id })}
              >
                <View style={styles.cardBody}>
                  <Text
                    style={[
                      styles.cardTitle,
                      {
                        fontSize: isVerySmall ? 14 : 15,
                        marginBottom: isVerySmall ? 5 : 6,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={[
                      styles.cardPreview,
                      {
                        fontSize: isVerySmall ? 12.5 : 13,
                        lineHeight: isVerySmall ? 17 : 18,
                      },
                    ]}
                    numberOfLines={4}
                  >
                    {item.preview}
                  </Text>
                </View>

                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={[
                      styles.iconBtn,
                      {
                        width: isVerySmall ? 34 : 36,
                        height: isVerySmall ? 34 : 36,
                        borderRadius: isVerySmall ? 9 : 10,
                      },
                    ]}
                    onPress={() => navigation.navigate('StoryDetail', { id: item.id })}
                  >
                    <Text style={styles.iconBtnText}>↗</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      saved ? styles.iconBtnSaved : styles.iconBtnGhost,
                      {
                        width: isVerySmall ? 34 : 36,
                        height: isVerySmall ? 34 : 36,
                        borderRadius: isVerySmall ? 9 : 10,
                      },
                    ]}
                    onPress={() => handleToggleSave(item.id)}
                  >
                    <Text
                      style={[
                        saved ? styles.iconBtnSavedText : styles.iconBtnGhostText,
                      ]}
                    >
                      🔖
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
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
    width,
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 15, 10, 0.72)',
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
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,136,0.12)',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardBody: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontWeight: '600',
    color: '#ffffff',
  },
  cardPreview: {
    color: 'rgba(255,255,255,0.55)',
  },
  cardActions: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
  iconBtn: {
    backgroundColor: '#00ff88',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnText: {
    fontSize: 16,
    color: '#000000',
  },
  iconBtnGhost: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  iconBtnGhostText: {
    fontSize: 17,
  },
  iconBtnSaved: {
    backgroundColor: '#00ff88',
    alignItems: 'center',
    justifyContent: 'center',
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
  iconBtnSavedText: {
    fontSize: 17,
  },
});