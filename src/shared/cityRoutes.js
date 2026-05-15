export const CITY_ROUTES = [
  {
    code: 'SEOUL',
    path: 'Seoul',
    name: 'Seoul',
    country: 'KR',
    latitude: 37.5665,
    longitude: 126.978,
  },
  {
    code: 'TOKYO',
    path: 'Tokyo',
    name: 'Tokyo',
    country: 'JP',
    latitude: 35.6762,
    longitude: 139.6503,
  },
  {
    code: 'PARIS',
    path: 'Paris',
    name: 'Paris',
    country: 'FR',
    latitude: 48.8566,
    longitude: 2.3522,
  },
  {
    code: 'LONDON',
    path: 'London',
    name: 'London',
    country: 'GB',
    latitude: 51.5072,
    longitude: -0.1276,
  },
]

export function getCityByCode(code) {
  return CITY_ROUTES.find((city) => city.code === code) || null
}

export function getCityByPath(path) {
  return CITY_ROUTES.find((city) => city.path === path) || null
}
