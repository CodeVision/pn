export const generate = (min: number, max: number): number => {
  return min + Math.floor(Math.random() * (max + 1 - min))
}
