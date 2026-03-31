
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'saved_blog';

export async function getSavedBlogIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function toggleSavedBlog(id: string): Promise<string[]> {
  try {
    const current = await getSavedBlogIds();
    const updated = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}