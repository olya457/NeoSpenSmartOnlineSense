import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import OnboardingScreen from './OnboardingScreen';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Onboarding4'>;
};

export default function Onboarding4({ navigation }: Props) {
  return (
    <OnboardingScreen
      step={4}
      image={require('../../assets/images/onboarding_cards.png')}
      title={'Learn\nby examples'}
      description="Real-life situations help you understand how online risks work. By reviewing stories and examples, you gradually form the right reactions."
      buttonLabel="Good"
      onPress={() => navigation.navigate('Onboarding5')}
    />
  );
}