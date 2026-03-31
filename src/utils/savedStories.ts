import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_STORIES_KEY = 'saved_stories_ids';

export async function getSavedStoryIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(SAVED_STORIES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.log('getSavedStoryIds error:', error);
    return [];
  }
}

export async function isStorySaved(id: string): Promise<boolean> {
  const ids = await getSavedStoryIds();
  return ids.includes(id);
}

export async function toggleSavedStory(id: string): Promise<string[]> {
  try {
    const ids = await getSavedStoryIds();
    const updated = ids.includes(id)
      ? ids.filter((item) => item !== id)
      : [...ids, id];

    await AsyncStorage.setItem(SAVED_STORIES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.log('toggleSavedStory error:', error);
    return [];
  }
}