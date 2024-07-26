
export const defaultImageRoute = "/assets/images/unknown_pic.png";

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

    return image ? image : defaultImageRoute;
  } catch (error) {
    console.log(`Error fetching image for ${normalizedName} returning the default image`);
    // default image
    return defaultImageRoute;
  }
};
