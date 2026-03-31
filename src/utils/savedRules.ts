
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'saved_rules';

export async function getSavedRuleIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function toggleSavedRule(id: string): Promise<string[]> {
  try {
    const current = await getSavedRuleIds();
    const updated = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}