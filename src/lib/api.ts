// lib/api.ts

export async function fetchPageDetails(pageId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch page details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching page details:', error);
    return null;
  }
}