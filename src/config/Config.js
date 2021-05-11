// Configuration Object
export const config = {
  googleTagManagerID: window.configGoogleTagManagerID ?? null,
  urlApi:
    process.env.REACT_APP_URL_API ||
    'https://api.platform.opentargets.org/api/v4/graphql',
  urlApiBeta:
    process.env.REACT_APP_URL_API_BETA ||
    'https://api.platform.opentargets.org/api/v4/graphql',
  contactEmailLabel:
    process.env.REACT_APP_CONTACT_EMAIL_LABEL || 'helpdesk@opentargets.org',
  contactEmailAddress:
    process.env.REACT_APP_CONTACT_EMAIL_ADDRESS || 'helpdesk@opentargets.org',
};
