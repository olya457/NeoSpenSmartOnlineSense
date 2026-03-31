import React, { useCallback, useState } from 'react';
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PlacesStackParamList } from '../../navigation/PlacesNavigator';
import { places } from '../../data/places';
import { getSavedPlaceIds, toggleSavedPlace } from '../../utils/savedPlaces';

const { width, height } = Dimensions.get('window');

export default function PlacesList() {
  const navigation = useNavigation<NativeStackNavigationProp<PlacesStackParamList>>();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const isSmall = height < 780;
  const isVerySmall = height < 700;

  const imageWidth = isVerySmall ? width * 0.34 : isSmall ? width * 0.36 : width * 0.38;
  const imageHeight = imageWidth * 0.62;

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      getSavedPlaceIds().then((ids) => {
        if (mounted) setSavedIds(ids);
      });

      return () => {
        mounted = false;
      };
    }, [])
  );

  const handleToggleSave = async (id: string) => {
    const updated = await toggleSavedPlace(id);
    setSavedIds(updated);
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
          data={places}
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
              Places of knowledge
            </Text>
          }
          renderItem={({ item }) => {
            const isSaved = savedIds.includes(item.id);

            return (
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    borderRadius: isVerySmall ? 14 : 16,
                    marginBottom: isVerySmall ? 12 : 14,
                  },
                ]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('PlaceDetail', { id: item.id })}
              >
                <Image
                  source={item.image}
                  style={[
                    styles.cardImage,
                    {
                      width: imageWidth,
                      height: imageHeight,
                      borderTopLeftRadius: isVerySmall ? 14 : 16,
                      borderBottomLeftRadius: isVerySmall ? 14 : 16,
                    },
                  ]}
                  resizeMode="cover"
                />

                <View style={styles.cardBody}>
                  <Text
                    style={[
                      styles.cardName,
                      {
                        fontSize: isVerySmall ? 13.5 : 14,
                        lineHeight: isVerySmall ? 18 : 20,
                      },
                    ]}
                    numberOfLines={2}
                  >
                    {item.name},
                  </Text>

                  <Text
                    style={[
                      styles.cardLocation,
                      {
                        fontSize: isVerySmall ? 13.5 : 14,
                        lineHeight: isVerySmall ? 18 : 20,
                      },
                    ]}
                    numberOfLines={2}
                  >
                    {item.location}
                  </Text>
                </View>

                <View
                  style={[
                    styles.cardActions,
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
                        width: isVerySmall ? 34 : 36,
                        height: isVerySmall ? 34 : 36,
                        borderRadius: isVerySmall ? 9 : 10,
                      },
                    ]}
                    onPress={() => navigation.navigate('PlaceDetail', { id: item.id })}
                  >
                    <Text style={styles.iconBtnGreenText}>↗</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.iconBtnGhost,
                      isSaved && styles.iconBtnSaved,
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
                        styles.iconBtnGhostText,
                        isSaved && styles.iconBtnSavedText,
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
    borderColor: 'rgba(0,255,136,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardImage: {},
  cardBody: {
    flex: 1,
    paddingHorizontal: 12,
  },
  cardName: {
    fontWeight: '700',
    color: '#ffffff',
  },
  cardLocation: {
    fontWeight: '700',
    color: '#ffffff',
  },
  cardActions: {
    alignItems: 'center',
  },
  iconBtnGreen: {
    backgroundColor: '#00ff88',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnGreenText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '700',
  },
  iconBtnGhost: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnSaved: {
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
  iconBtnGhostText: {
    fontSize: 16,
    opacity: 0.55,
  },
  iconBtnSavedText: {
    opacity: 1,
  },
});