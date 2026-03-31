import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import OnboardingScreen from './OnboardingScreen';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Onboarding2'>;
};

export default function Onboarding2({ navigation }: Props) {
  return (
    <OnboardingScreen
      step={2}
      image={require('../../assets/images/onboarding_shield.png')}
      title={'Notice\nhidden risks'}
      description="Not all threats look obvious. Some messages, sites or offers are specifically designed to look familiar and inspire trust. Attention to detail helps avoid mistakes."
      buttonLabel="Next"
      onPress={() => navigation.navigate('Onboarding3')}
    />
  );
}