/**
 * Delays the execution of code for a specified number of milliseconds.
 * 🔴 NOTE: Mostly used for local testing (simulation of network delays).
 *
 * usage (inside async function):
 * await sleep(3000);
 *
 * @param {number} ms - The number of milliseconds to delay the execution.
 * @return {Promise<void>} A promise that resolves after the specified delay.
 */
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
