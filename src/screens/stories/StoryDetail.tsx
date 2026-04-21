import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Share,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { stories } from '../../data/stories';
import { isStorySaved, toggleSavedStory } from '../../utils/savedStories';

const { width, height } = Dimensions.get('window');

type StoriesStackParamList = {
  StoriesList: undefined;
  StoryDetail: { id: string };
};

type Props = {
  navigation: NativeStackNavigationProp<StoriesStackParamList, 'StoryDetail'>;
  route: RouteProp<StoriesStackParamList, 'StoryDetail'>;
};

export default function StoryDetail({ navigation, route }: Props) {
  const story = stories.find((s) => s.id === route.params.id);
  const [saved, setSaved] = useState(false);

  const isSmall = height < 780;
  const isVerySmall = height < 700;
  const androidOffset = Platform.OS === 'android' ? 20 : 0;
  const androidBottomExtra = Platform.OS === 'android' ? 40 : 0;

  useEffect(() => {
    let mounted = true;

    const loadSaved = async () => {
      if (!story) return;
      const result = await isStorySaved(story.id);
      if (mounted) setSaved(result);
    };

    loadSaved();

    return () => {
      mounted = false;
    };
  }, [story]);

  if (!story) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        title: story.title,
        message: `${story.title}\n\n${story.content}`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const handleToggleSave = async () => {
    const updated = await toggleSavedStory(story.id);
    setSaved(updated.includes(story.id));
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
        <View
          style={[
            styles.header,
            {
              paddingTop: 15 + androidOffset,
              paddingHorizontal: isVerySmall ? 14 : 16,
              paddingBottom: isVerySmall ? 10 : 12,
            },
          ]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={[styles.backText, { fontSize: isVerySmall ? 24 : 28 }]}>‹</Text>
          </TouchableOpacity>

          <Text
            style={[
              styles.headerTitle,
              {
                fontSize: isVerySmall ? 14 : isSmall ? 15 : 16,
              },
            ]}
            numberOfLines={1}
          >
            Educational stories
          </Text>

          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={handleToggleSave}
              style={[
                saved ? styles.headerIconBtnSaved : styles.headerIconBtn,
                {
                  width: isVerySmall ? 34 : 36,
                  height: isVerySmall ? 34 : 36,
                  borderRadius: isVerySmall ? 9 : 10,
                },
              ]}
            >
              <Text style={styles.headerIcon}>🔖</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleShare}
              style={[
                styles.headerIconBtn,
                {
                  width: isVerySmall ? 34 : 36,
                  height: isVerySmall ? 34 : 36,
                  borderRadius: isVerySmall ? 9 : 10,
                },
              ]}
            >
              <Text style={styles.headerIcon}>⬆</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scroll,
            {
              paddingTop: 8 + androidOffset,
              paddingHorizontal: isVerySmall ? 16 : 20,
              paddingBottom: 120 + androidBottomExtra,
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              {
                fontSize: isVerySmall ? 20 : isSmall ? 21 : 22,
                lineHeight: isVerySmall ? 26 : isSmall ? 27 : 28,
                marginBottom: isVerySmall ? 16 : 20,
              },
            ]}
          >
            {story.title}
          </Text>

          <Text
            style={[
              styles.content,
              {
                fontSize: isVerySmall ? 14 : 15,
                lineHeight: isVerySmall ? 22 : 24,
              },
            ]}
          >
            {story.content}
          </Text>
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
    backgroundColor: 'rgba(5, 15, 10, 0.72)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backText: {
    color: '#ffffff',
    lineHeight: 30,
  },
  headerTitle: {
    flex: 1,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  headerActions: {
    width: 84,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  headerIconBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconBtnSaved: {
    backgroundColor: '#d0d0d0',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#d0d0d0',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerIcon: {
    fontSize: 16,
  },
  scroll: {},
  title: {
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.3,
    textAlign: 'center',
    alignSelf: 'center',
  },
  content: {
    color: 'rgba(255,255,255,0.78)',
  },
});