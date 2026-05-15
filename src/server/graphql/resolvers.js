const appVersion = '0.1.0'

export const resolvers = {
  Query: {
    health: () => ({
      ok: true,
      service: 'bzznbyd-weather-assignment',
      version: appVersion,
    }),
    version: () => appVersion,
  },
}
