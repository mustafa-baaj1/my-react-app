export function getRequestedPath(locationState) {
  const requestedLocation = locationState?.from

  if (!requestedLocation?.pathname || !requestedLocation.pathname.startsWith('/')) return '/'
  if (requestedLocation.pathname === '/login' || requestedLocation.pathname === '/register') return '/'

  return `${requestedLocation.pathname}${requestedLocation.search ?? ''}${requestedLocation.hash ?? ''}`
}
