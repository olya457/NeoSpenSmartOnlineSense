import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import OnboardingScreen from './OnboardingScreen';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Onboarding1'>;
};

export default function Onboarding1({ navigation }: Props) {
  return (
    <OnboardingScreen
      step={1}
      image={require('../../assets/images/onboarding_brain.png')}
      title={'Be Careful\nOnline'}
      description="The Internet provides access to a large amount of information, but not everything on it is safe. This space will help you better understand the risks, take your time and make informed decisions."
      buttonLabel="Continue"
      onPress={() => navigation.navigate('Onboarding2')}
    />
  );
}