import workPool from 'workerpool' //
let pool = workPool.pool()
let i = 1
export const getUUID = () => {
  i++
  return i //
}
export const workerRun = async <T = any>(fn, ...args): Promise<T> => {
  return new Promise((resolve, reject) => {
    //
    pool
      .exec(fn, [...args])
      .then((res) => resolve(res))
      .catch((err) => reject(err)) //
  }) //
}
