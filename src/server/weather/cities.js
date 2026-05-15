import { CITY_ROUTES, getCityByCode } from '../../shared/cityRoutes'

export const SUPPORTED_CITIES = CITY_ROUTES

export function getSupportedCityByCode(code) {
  return getCityByCode(code)
}
