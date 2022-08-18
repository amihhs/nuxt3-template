export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

export const rand = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
