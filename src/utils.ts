export function randomNumber(to: number = 1, from: number = 0) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

export async function sleep(ms: number = 1000) {
  return new Promise<void>((res) => setTimeout(() => res(), ms));
}

export function randomFromList(array: any[] = []) {
  return array[randomNumber(array.length - 1)];
}
