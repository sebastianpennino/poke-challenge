import { getRedisClient } from "redisClient";
import { DEFAULT_POKE_IMG } from "~/constants";

/**
 * Fetches the image URL of a Pokemon based on its name.
 *
 * @param {string} name - The name of the Pokemon.
 * @return {Promise<string>} A Promise that resolves to the image URL of the Pokemon.
 * If the image URL is not available, the default image URL is returned.
 * If an error occurs during the fetch or the Pokemon is not found, the default image URL is returned.
 */
export const getPokemonPicFromExternalAPI = async (name: string): Promise<string> => {
  const normalizedName = String(name).toLocaleLowerCase();
  const redis = getRedisClient();

  // Check for image in redis
  const imageBuffer = await redis.hgetBuffer(normalizedName, 'data');
  const imageMimeType = await redis.hget(normalizedName, 'mimeType');
  if (imageBuffer && imageMimeType) {
    // Base64 string of the image
    return `data:${imageMimeType};base64,${Buffer.from(imageBuffer).toString('base64')}`;
  }

  try {
    // throw new Error('Stop calling the external API for now');
    // Public API call
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${normalizedName}`);
    if (response.status === 404) {
      console.error(`Pokemon ${normalizedName} not found`);
      throw new Error('Not found');
    }
    const data = await response.json();
    const image = data?.sprites?.front_default;

    if (image) {
      const extension = image.split('.').pop();
      const mimeType = `image/${extension === 'jpg' ? 'jpeg' : extension}`;
      const response = await fetch(image);
      const blob = await response.blob();
      const buffer = Buffer.from(await blob.arrayBuffer());
      await redis.hset(normalizedName, 'data', buffer);
      await redis.hset(normalizedName, 'mimeType', mimeType);
      await redis.expire(normalizedName, 60 * 60 * 24 * 7);
    }
    return image ? image : DEFAULT_POKE_IMG;
  } catch (error) {
    console.log(`Error fetching image for ${normalizedName} returning the default image`);
    // default image
    return DEFAULT_POKE_IMG;
  }
};

export const fetchAllPokemonPics = async (pokemonNames: string[]): Promise<string[]> => {
  try {
    const fetchPromises = pokemonNames.map(name => getPokemonPicFromExternalAPI(name));
    const results = await Promise.all(fetchPromises);
    return results;
  } catch (error) {
    console.error('Error fetching Pokemon images:', error);
    return [];
  }
};
