import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BlogStackParamList } from '../../navigation/BlogNavigator';
import { blogPosts } from '../../data/blog';

const { width, height } = Dimensions.get('window');

export default function BlogList() {
  const navigation = useNavigation<NativeStackNavigationProp<BlogStackParamList>>();

  const isSmall = height < 780;
  const isVerySmall = height < 700;

  const imageHeight = isVerySmall ? width * 0.42 : isSmall ? width * 0.45 : width * 0.48;

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
          data={blogPosts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            {
              paddingTop: Platform.OS === 'android' ? 35 : 15,
              paddingHorizontal: isVerySmall ? 16 : 20,
              paddingBottom: Platform.OS === 'android' ? 160 : 120,
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
              Blog
            </Text>
          }
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    borderRadius: isVerySmall ? 14 : 16,
                    marginBottom: isVerySmall ? 14 : 16,
                  },
                ]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('BlogPost', { id: item.id })}
              >
                <Image
                  source={item.image}
                  style={[
                    styles.cardImage,
                    {
                      height: imageHeight,
                    },
                  ]}
                  resizeMode="cover"
                />

                <View
                  style={[
                    styles.cardBottom,
                    {
                      padding: isVerySmall ? 12 : 14,
                    },
                  ]}
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
                      numberOfLines={2}
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={[
                        styles.cardPreview,
                        {
                          fontSize: isVerySmall ? 12.5 : 13,
                          lineHeight: isVerySmall ? 18 : 19,
                        },
                      ]}
                      numberOfLines={3}
                    >
                      {item.preview}
                    </Text>
                  </View>

                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={[
                        styles.iconBtnGreen,
                        {
                          width: isVerySmall ? 34 : 36,
                          height: isVerySmall ? 34 : 36,
                          borderRadius: isVerySmall ? 9 : 10,
                        },
                      ]}
                      onPress={() => navigation.navigate('BlogPost', { id: item.id })}
                    >
                      <Text style={styles.iconBtnGreenText}>↗</Text>
                    </TouchableOpacity>
                  </View>
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
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5,15,10,0.75)',
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
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardBody: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontWeight: '700',
    color: '#ffffff',
  },
  cardPreview: {
    color: 'rgba(255,255,255,0.55)',
  },
  cardActions: {
    alignItems: 'center',
    justifyContent: 'center',
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