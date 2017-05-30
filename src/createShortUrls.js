const request = require('request-promise-native')

const createErrorDescription = (code, err) => {
  switch (code) {
    case 400:
      return 'Bad Request'
    case 401:
      return 'Unauthorized: Be sure you configured the intergration to use a valid API key.'
    case 403:
      return `Invalid Request: ${err.source} ${err.message}`
    case 404:
      return `Not Found: ${err.source} ${err.message}`
    case 503:
      return 'Short URL service currently under maintenance. Retry later.'
    default:
      return 'Unexpected error connecting to Rebrandly APIs'
  }
}

const createError = (sourceUrl, err) => {
  const errorDescription = createErrorDescription(err.statusCode, JSON.parse(err.body))
  return new Error(`Cannot create short URL for "${sourceUrl}": ${errorDescription}`)
}

const createShortUrlFactory = (apikey) => (options) => new Promise((resolve, reject) => {
  const body = {
    destination: options.url,
    domain: options.domain ? { fullName: options.domain } : undefined,
    slashtag: options.slashtag ? options.slashtag : undefined
  }

  const req = request({
    url: 'https://api.rebrandly.com/v1/links',
    method: 'POST',
    headers: {
      apikey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body, null, 2),
    resolvedWithFullResponse: true
  })

  req
    .then((response) => {
      const result = JSON.parse(response.body)
      resolve(result)
    })
    .catch((err) => {
      reject(createError(options.url, err.response))
    })
})

const createShortUrlsFactory = (apikey) => (urls, domain, slashtags) => {
  const structuredUrls = urls.map(url => ({ url, domain, slashtag: undefined }))
  if (Array.isArray(slashtags)) {
    slashtags.forEach((slashtag, i) => (structuredUrls[i].slashtag = slashtag))
  }

  const requestPromise = structuredUrls.map(createShortUrlFactory(apikey))
  return Promise.all(requestPromise)
}

module.exports = createShortUrlsFactory
