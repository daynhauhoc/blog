export const noobPromise = () => new Promise((resolve) => resolve(1))
export const timeoutPromise = (milisec = 2000) => new Promise((resolve) => {
  setTimeout(() => resolve(), milisec)
})
