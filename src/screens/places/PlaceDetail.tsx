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
import { PlacesStackParamList } from '../../navigation/PlacesNavigator';
import { places } from '../../data/places';
import { getSavedPlaceIds, toggleSavedPlace } from '../../utils/savedPlaces';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<PlacesStackParamList, 'PlaceDetail'>;
  route: RouteProp<PlacesStackParamList, 'PlaceDetail'>;
};

export default function PlaceDetail({ navigation, route }: Props) {
  const place = places.find((p) => p.id === route.params.id);
  const [saved, setSaved] = useState(false);

  const isSmall = height < 780;
  const isVerySmall = height < 700;

  const imageHeight = isVerySmall ? width * 0.5 : isSmall ? width * 0.53 : width * 0.55;

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      getSavedPlaceIds().then((ids) => {
        if (mounted) {
          setSaved(ids.includes(place?.id ?? ''));
        }
      });

      return () => {
        mounted = false;
      };
    }, [place?.id])
  );

  if (!place) return null;

  const handleToggleSave = async () => {
    const updated = await toggleSavedPlace(place.id);
    setSaved(updated.includes(place.id));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: `${place.name}, ${place.location}`,
        message: `${place.name}, ${place.location}\n${place.coordinatesLabel}\n\n${place.description}`,
      });
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

      <SafeAreaView style={styles.safeArea}>
        <View
          style={[
            styles.header,
            {
              paddingTop: 15,
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
            Places of knowledge
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
              <Text style={styles.actionIcon}>🔖</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scroll,
            {
              paddingHorizontal: isVerySmall ? 16 : 20,
              paddingBottom: 120,
            },
          ]}
        >
          <Image
            source={place.image}
            style={[
              styles.image,
              {
                height: imageHeight,
                borderRadius: isVerySmall ? 14 : 16,
                marginBottom: isVerySmall ? 14 : 16,
              },
            ]}
            resizeMode="cover"
          />

          <Text
            style={[
              styles.name,
              {
                fontSize: isVerySmall ? 18 : isSmall ? 19 : 20,
                marginBottom: 6,
              },
            ]}
          >
            {place.name}, {place.location}
          </Text>

          <Text
            style={[
              styles.coords,
              {
                fontSize: isVerySmall ? 12.5 : 13,
                marginBottom: isVerySmall ? 14 : 16,
              },
            ]}
          >
            {place.coordinatesLabel}
          </Text>

          <Text
            style={[
              styles.description,
              {
                fontSize: isVerySmall ? 14 : 15,
                lineHeight: isVerySmall ? 22 : 24,
              },
            ]}
          >
            {place.description}
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
  },

  scroll: {},
  image: {
    width: '100%',
    overflow: 'hidden',
  },
  name: {
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  coords: {
    color: '#00ff88',
    fontWeight: '500',
    textAlign: 'center',
  },
  description: {
    color: 'rgba(255,255,255,0.74)',
  },
});