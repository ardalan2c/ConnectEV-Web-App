export function localBusinessJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ConnectEV Inc.',
    url: siteUrl,
    areaServed: ['Toronto','North York','Scarborough','Etobicoke','Mississauga','Brampton','Vaughan','Markham','Richmond Hill'],
    telephone: '+1-000-000-0000',
    priceRange: '$'
  };
}

export function serviceJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'EV Charger Installation',
    provider: { '@type': 'Organization', name: 'ConnectEV Inc.' },
    areaServed: 'Greater Toronto Area',
    url: siteUrl
  };
}