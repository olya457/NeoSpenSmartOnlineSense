import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { BlogStackParamList } from '../../navigation/BlogNavigator';
import { blogPosts } from '../../data/blog';
import { getSavedBlogIds, toggleSavedBlog } from '../../utils/savedBlog';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<BlogStackParamList, 'BlogPost'>;
  route: RouteProp<BlogStackParamList, 'BlogPost'>;
};

export default function BlogPost({ navigation, route }: Props) {
  const post = blogPosts.find((p) => p.id === route.params.id);
  const [saved, setSaved] = useState(false);

  const isSmall = height < 780;
  const isVerySmall = height < 700;

  const imageHeight = isVerySmall ? width * 0.5 : isSmall ? width * 0.53 : width * 0.55;

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      getSavedBlogIds().then((ids) => {
        if (mounted) {
          setSaved(ids.includes(post?.id ?? ''));
        }
      });

      return () => {
        mounted = false;
      };
    }, [post?.id])
  );

  if (!post) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        title: post.title,
        message: `${post.title}\n\n${post.content}`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const handleToggleSave = async () => {
    const updated = await toggleSavedBlog(post.id);
    setSaved(updated.includes(post.id));
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onboarding_bg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <SafeAreaView style={styles.safeArea}>
        <View
          style={[
            styles.header,
            {
              paddingTop: Platform.OS === 'android' ? 35 : 15,
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
            Blog
          </Text>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[
                styles.actionBtn,
                {
                  width: isVerySmall ? 34 : 36,
                  height: isVerySmall ? 34 : 36,
                  borderRadius: isVerySmall ? 9 : 10,
                },
              ]}
              onPress={handleShare}
            >
              <Text style={styles.actionIcon}>⬆</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionBtn,
                saved && styles.actionBtnSaved,
                {
                  width: isVerySmall ? 34 : 36,
                  height: isVerySmall ? 34 : 36,
                  borderRadius: isVerySmall ? 9 : 10,
                },
              ]}
              onPress={handleToggleSave}
            >
              <Text
                style={[
                  styles.actionIcon,
                  saved && styles.actionIconSaved,
                ]}
              >
                🔖
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scroll,
            {
              paddingTop: Platform.OS === 'android' ? 20 : 0,
              paddingHorizontal: isVerySmall ? 16 : 20,
              paddingBottom: Platform.OS === 'android' ? 160 : 120,
            },
          ]}
        >
          <Image
            source={post.image}
            style={[
              styles.image,
              {
                height: imageHeight,
                borderRadius: isVerySmall ? 14 : 16,
                marginBottom: isVerySmall ? 16 : 20,
              },
            ]}
            resizeMode="cover"
          />

          <Text
            style={[
              styles.title,
              {
                fontSize: isVerySmall ? 18 : isSmall ? 19 : 20,
                lineHeight: isVerySmall ? 24 : isSmall ? 25 : 26,
                marginBottom: isVerySmall ? 14 : 16,
              },
            ]}
          >
            {post.title}
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
            {post.content}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5,15,10,0.75)',
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
  actionBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnSaved: {
    backgroundColor: '#d0d0d0',
    borderColor: '#d0d0d0',
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
  actionIcon: {
    fontSize: 16,
    opacity: 0.8,
  },
  actionIconSaved: {
    opacity: 1,
  },
  scroll: {},
  image: {
    width: '100%',
    overflow: 'hidden',
  },
  title: {
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  content: {
    color: 'rgba(255,255,255,0.74)',
  },
});