export async function fetchFromAPI(endpoint, language, page = 1, params = {}) {
  const URL = process.env.NEXT_PUBLIC_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY_READ;

  const queryParams = new URLSearchParams({
    language,
    page,
    ...params,
  });

  try {
    const res = await fetch(`${URL}${endpoint}?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to load data from API:`, error);
    throw error;
  }
}
