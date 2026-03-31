
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'saved_places';

export async function getSavedPlaceIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function toggleSavedPlace(id: string): Promise<string[]> {
  try {
    const current = await getSavedPlaceIds();
    const updated = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}