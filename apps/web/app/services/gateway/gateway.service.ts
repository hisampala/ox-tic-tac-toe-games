import wretch from 'wretch';

const BASE_URL_API_END_POINT = process.env.NEXT_PUBLIC_BASE_API_URL

// T = type return
// R = type aggruement
const post = <T, R = object>(path: string, item: R) => wretch(`${BASE_URL_API_END_POINT}`).post(item, path).json<T>()
const get = <T>(path: string) => wretch(`${BASE_URL_API_END_POINT}${path}`).get().json<T>()
const put = <T, R = object>(path: string, id: string, item: R) => wretch(`${BASE_URL_API_END_POINT}${id}`).put(item, path).json<T>()
const remove = <T>(path: string, id: string) => wretch(`${BASE_URL_API_END_POINT}/${path}${id}`).delete().json<T>()
export const gatewayService = { post, get, put, remove }