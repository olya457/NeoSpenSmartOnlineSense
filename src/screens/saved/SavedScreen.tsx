import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  Share,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { stories } from '../../data/stories';
import { places } from '../../data/places';
import { blogPosts } from '../../data/blog';
import { rules } from '../../data/rules';
import { getSavedStoryIds, toggleSavedStory } from '../../utils/savedStories';
import { getSavedPlaceIds, toggleSavedPlace } from '../../utils/savedPlaces';
import { getSavedBlogIds, toggleSavedBlog } from '../../utils/savedBlog';
import { getSavedRuleIds, toggleSavedRule } from '../../utils/savedRules';

const { width, height } = Dimensions.get('window');

type AnyNavigation = NativeStackNavigationProp<any>;

type SavedItem =
  | { kind: 'story'; id: string; title: string; preview: string }
  | { kind: 'place'; id: string; title: string; location: string; image: any }
  | { kind: 'blog'; id: string; title: string; preview: string; image: any }
  | { kind: 'rule'; id: string; text: string };

export default function SavedScreen() {
  const navigation = useNavigation<AnyNavigation>();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  const isSmall = height < 780;
  const isVerySmall = height < 700;

  const placeImageWidth = isVerySmall ? width * 0.3 : isSmall ? width * 0.31 : width * 0.32;
  const placeImageHeight = isVerySmall ? width * 0.22 : isSmall ? width * 0.23 : width * 0.24;
  const blogImageHeight = isVerySmall ? width * 0.45 : isSmall ? width * 0.5 : width * 0.55;

  const load = useCallback(async () => {
    const [storyIds, placeIds, blogIds, ruleIds] = await Promise.all([
      getSavedStoryIds(),
      getSavedPlaceIds(),
      getSavedBlogIds(),
      getSavedRuleIds(),
    ]);

    const saved: SavedItem[] = [
      ...rules
        .filter((r) => ruleIds.includes(r.id))
        .map<SavedItem>((r) => ({ kind: 'rule', id: r.id, text: r.text })),
      ...stories
        .filter((s) => storyIds.includes(s.id))
        .map<SavedItem>((s) => ({ kind: 'story', id: s.id, title: s.title, preview: s.preview })),
      ...places
        .filter((p) => placeIds.includes(p.id))
        .map<SavedItem>((p) => ({
          kind: 'place',
          id: p.id,
          title: p.name,
          location: p.location,
          image: p.image,
        })),
      ...blogPosts
        .filter((b) => blogIds.includes(b.id))
        .map<SavedItem>((b) => ({
          kind: 'blog',
          id: b.id,
          title: b.title,
          preview: b.preview,
          image: b.image,
        })),
    ];

    setSavedItems(saved);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const handleRemove = async (item: SavedItem) => {
    if (item.kind === 'story') await toggleSavedStory(item.id);
    if (item.kind === 'place') await toggleSavedPlace(item.id);
    if (item.kind === 'blog') await toggleSavedBlog(item.id);
    if (item.kind === 'rule') await toggleSavedRule(item.id);
    load();
  };

  const handleOpen = (item: SavedItem) => {
    if (item.kind === 'story') {
      navigation.navigate('Stories', {
        screen: 'StoryDetail',
        params: { id: item.id },
      });
    }

    if (item.kind === 'place') {
      navigation.navigate('Places', {
        screen: 'PlaceDetail',
        params: { id: item.id },
      });
    }

    if (item.kind === 'blog') {
      navigation.navigate('Blog', {
        screen: 'BlogPost',
        params: { id: item.id },
      });
    }
  };

  const handleShare = async (item: SavedItem) => {
    const msg =
      item.kind === 'rule'
        ? item.text
        : item.kind === 'place'
        ? `${item.title}, ${item.location}`
        : `${item.title}\n\n${item.preview}`;

    try {
      await Share.share({ message: msg });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const isEmpty = savedItems.length === 0;

  const renderRuleItem = (item: Extract<SavedItem, { kind: 'rule' }>) => (
    <View
      key={`${item.kind}-${item.id}`}
      style={[
        styles.ruleCard,
        {
          borderRadius: isVerySmall ? 14 : 16,
          padding: isVerySmall ? 14 : 16,
          marginBottom: isVerySmall ? 12 : 14,
        },
      ]}
    >
      <Text
        style={[
          styles.ruleText,
          {
            fontSize: isVerySmall ? 14 : 15,
            lineHeight: isVerySmall ? 21 : 22,
            marginBottom: isVerySmall ? 12 : 14,
          },
        ]}
      >
        {item.text}
      </Text>

      <View style={[styles.actionRow, { gap: isVerySmall ? 8 : 10 }]}>
        <TouchableOpacity
          style={[
            styles.actionBtn,
            {
              width: isVerySmall ? 36 : 40,
              height: isVerySmall ? 36 : 40,
              borderRadius: isVerySmall ? 9 : 10,
            },
          ]}
          onPress={() => handleShare(item)}
        >
          <Text style={styles.actionIcon}>⬆</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionBtnSaved,
            {
              width: isVerySmall ? 36 : 40,
              height: isVerySmall ? 36 : 40,
              borderRadius: isVerySmall ? 9 : 10,
            },
          ]}
          onPress={() => handleRemove(item)}
        >
          <Text style={styles.actionIcon}>🔖</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPlaceItem = (item: Extract<SavedItem, { kind: 'place' }>) => (
    <TouchableOpacity
      key={`${item.kind}-${item.id}`}
      style={[
        styles.placeCard,
        {
          borderRadius: isVerySmall ? 14 : 16,
          marginBottom: isVerySmall ? 12 : 14,
        },
      ]}
      activeOpacity={0.85}
      onPress={() => handleOpen(item)}
    >
      <Image
        source={item.image}
        style={[
          styles.placeImage,
          {
            width: placeImageWidth,
            height: placeImageHeight,
          },
        ]}
        resizeMode="cover"
      />

      <View style={styles.placeBody}>
        <Text
          style={[
            styles.placeTitle,
            {
              fontSize: isVerySmall ? 13.5 : 14,
              lineHeight: isVerySmall ? 18 : 20,
            },
          ]}
          numberOfLines={2}
        >
          {item.title}, {item.location}
        </Text>
      </View>

      <View
        style={[
          styles.placeActions,
          {
            paddingRight: isVerySmall ? 10 : 12,
            gap: isVerySmall ? 8 : 10,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.iconBtnGreen,
            {
              width: isVerySmall ? 36 : 40,
              height: isVerySmall ? 36 : 40,
              borderRadius: isVerySmall ? 9 : 10,
            },
          ]}
          onPress={() => handleOpen(item)}
        >
          <Text style={styles.iconBtnGreenText}>↗</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionBtnSaved,
            {
              width: isVerySmall ? 36 : 40,
              height: isVerySmall ? 36 : 40,
              borderRadius: isVerySmall ? 9 : 10,
            },
          ]}
          onPress={() => handleRemove(item)}
        >
          <Text style={styles.actionIcon}>🔖</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderBlogItem = (item: Extract<SavedItem, { kind: 'blog' }>) => (
    <TouchableOpacity
      key={`${item.kind}-${item.id}`}
      style={[
        styles.blogCard,
        {
          borderRadius: isVerySmall ? 14 : 16,
          marginBottom: isVerySmall ? 12 : 14,
        },
      ]}
      activeOpacity={0.85}
      onPress={() => handleOpen(item)}
    >
      <Image
        source={item.image}
        style={[
          styles.blogImage,
          {
            height: blogImageHeight,
          },
        ]}
        resizeMode="cover"
      />

      <View
        style={[
          styles.blogBottom,
          {
            padding: isVerySmall ? 12 : 14,
          },
        ]}
      >
        <View style={styles.blogBody}>
          <Text
            style={[
              styles.blogTitle,
              {
                fontSize: isVerySmall ? 14 : 15,
                marginBottom: isVerySmall ? 5 : 6,
              },
            ]}
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <Text
            style={[
              styles.blogPreview,
              {
                fontSize: isVerySmall ? 12.5 : 13,
                lineHeight: isVerySmall ? 17 : 18,
              },
            ]}
            numberOfLines={3}
          >
            {item.preview}
          </Text>
        </View>

        <View style={[styles.blogActions, { gap: isVerySmall ? 8 : 10 }]}>
          <TouchableOpacity
            style={[
              styles.iconBtnGreen,
              {
                width: isVerySmall ? 36 : 40,
                height: isVerySmall ? 36 : 40,
                borderRadius: isVerySmall ? 9 : 10,
              },
            ]}
            onPress={() => handleOpen(item)}
          >
            <Text style={styles.iconBtnGreenText}>↗</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionBtnSaved,
              {
                width: isVerySmall ? 36 : 40,
                height: isVerySmall ? 36 : 40,
                borderRadius: isVerySmall ? 9 : 10,
              },
            ]}
            onPress={() => handleRemove(item)}
          >
            <Text style={styles.actionIcon}>🔖</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderStoryItem = (item: Extract<SavedItem, { kind: 'story' }>) => (
    <TouchableOpacity
      key={`${item.kind}-${item.id}`}
      style={[
        styles.storyCard,
        {
          borderRadius: isVerySmall ? 14 : 16,
          padding: isVerySmall ? 14 : 16,
          marginBottom: isVerySmall ? 12 : 14,
        },
      ]}
      activeOpacity={0.85}
      onPress={() => handleOpen(item)}
    >
      <View style={styles.storyBody}>
        <Text
          style={[
            styles.storyTitle,
            {
              fontSize: isVerySmall ? 14 : 15,
              marginBottom: isVerySmall ? 5 : 6,
            },
          ]}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <Text
          style={[
            styles.storyPreview,
            {
              fontSize: isVerySmall ? 12.5 : 13,
              lineHeight: isVerySmall ? 17 : 18,
            },
          ]}
          numberOfLines={3}
        >
          {item.preview}
        </Text>
      </View>

      <View style={[styles.storyActions, { gap: isVerySmall ? 8 : 10 }]}>
        <TouchableOpacity
          style={[
            styles.iconBtnGreen,
            {
              width: isVerySmall ? 36 : 40,
              height: isVerySmall ? 36 : 40,
              borderRadius: isVerySmall ? 9 : 10,
            },
          ]}
          onPress={() => handleOpen(item)}
        >
          <Text style={styles.iconBtnGreenText}>↗</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionBtnSaved,
            {
              width: isVerySmall ? 36 : 40,
              height: isVerySmall ? 36 : 40,
              borderRadius: isVerySmall ? 9 : 10,
            },
          ]}
          onPress={() => handleRemove(item)}
        >
          <Text style={styles.actionIcon}>🔖</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderSavedItem = (item: SavedItem) => {
    if (item.kind === 'rule') return renderRuleItem(item);
    if (item.kind === 'place') return renderPlaceItem(item);
    if (item.kind === 'blog') return renderBlogItem(item);
    return renderStoryItem(item);
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
          data={[]}
          renderItem={null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            {
              paddingTop: Platform.OS === 'android' ? 35 : 15,
              paddingHorizontal: isVerySmall ? 16 : 20,
              paddingBottom: Platform.OS === 'android' ? 160 : 120,
            },
            isEmpty && styles.listEmpty,
          ]}
          ListHeaderComponent={
            <>
              <Text
                style={[
                  styles.heading,
                  {
                    fontSize: isVerySmall ? 24 : isSmall ? 26 : 28,
                    lineHeight: isVerySmall ? 30 : isSmall ? 32 : 34,
                    marginBottom: isVerySmall ? 14 : 16,
                  },
                ]}
              >
                Saved
              </Text>

              {isEmpty ? (
                <View style={styles.emptyWrap}>
                  <View
                    style={[
                      styles.emptyCard,
                      {
                        borderRadius: isVerySmall ? 12 : 14,
                        paddingVertical: isVerySmall ? 16 : 18,
                        paddingHorizontal: isVerySmall ? 14 : 16,
                        marginBottom: isVerySmall ? 20 : 24,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.emptyCardText,
                        {
                          fontSize: isVerySmall ? 14 : 15,
                        },
                      ]}
                    >
                      No saved content.
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.emptyHint,
                      {
                        fontSize: isVerySmall ? 13 : 14,
                        lineHeight: isVerySmall ? 20 : 22,
                      },
                    ]}
                  >
                    Save stories, places, blog posts and rules —{'\n'}
                    they will all appear here.
                  </Text>
                </View>
              ) : (
                savedItems.map((item) => renderSavedItem(item))
              )}
            </>
          }
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
  listEmpty: {
    flexGrow: 1,
  },

  heading: {
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
    textAlign: 'center',
    alignSelf: 'center',
  },

  emptyWrap: {
    flex: 1,
    paddingTop: 4,
  },
  emptyCard: {
    backgroundColor: 'rgba(0,40,25,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  emptyCardText: {
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  emptyHint: {
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  ruleCard: {
    backgroundColor: 'rgba(0,40,25,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  ruleText: {
    fontWeight: '600',
    color: '#ffffff',
  },
  actionRow: {
    flexDirection: 'row',
  },

  placeCard: {
    backgroundColor: 'rgba(0,40,25,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  placeImage: {},
  placeBody: {
    flex: 1,
    paddingHorizontal: 12,
  },
  placeTitle: {
    fontWeight: '700',
    color: '#ffffff',
  },
  placeActions: {
    alignItems: 'center',
  },

  blogCard: {
    backgroundColor: 'rgba(0,40,25,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  blogImage: {
    width: '100%',
  },
  blogBottom: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  blogBody: {
    flex: 1,
    paddingRight: 10,
  },
  blogTitle: {
    fontWeight: '700',
    color: '#ffffff',
  },
  blogPreview: {
    color: 'rgba(255,255,255,0.55)',
  },
  blogActions: {
    alignItems: 'center',
  },

  storyCard: {
    backgroundColor: 'rgba(0,40,25,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  storyBody: {
    flex: 1,
    paddingRight: 10,
  },
  storyTitle: {
    fontWeight: '700',
    color: '#ffffff',
  },
  storyPreview: {
    color: 'rgba(255,255,255,0.55)',
  },
  storyActions: {
    alignItems: 'center',
  },

  actionBtn: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnSaved: {
    backgroundColor: '#d0d0d0',
    borderWidth: 1,
    borderColor: '#d0d0d0',
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
  actionIcon: {
    fontSize: 16,
  },
  iconBtnGreen: {
    backgroundColor: '#d0d0d0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnGreenText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '700',
  },
});