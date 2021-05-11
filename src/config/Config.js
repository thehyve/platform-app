// function which returns the provided variable if it is not null and not an
// empty string, otherwise it will return a default value
function getNonEmptyVarOrDefault(variable, defaultVal) {
  if (typeof variable !== 'undefined' && variable !== null && variable !== '') {
    return variable;
  } else {
    return defaultVal;
  }
}

// Configuration Object
export const config = {
  googleTagManagerID: window.configGoogleTagManagerID ?? null,
  urlApi: getNonEmptyVarOrDefault(
    process.env.REACT_APP_URL_API,
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql'
  ),
  urlApiBeta: getNonEmptyVarOrDefault(
    process.env.REACT_APREACT_APP_URL_API_BETAP_URL_API,
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql'
  ),
  contactEmailLabel: getNonEmptyVarOrDefault(
    process.env.REACT_APP_CONTACT_EMAIL_LABEL,
    'helpdesk@opentargets.org'
  ),
  contactEmailAddress: getNonEmptyVarOrDefault(
    process.env.REACT_APP_CONTACT_EMAIL_ADDRESS,
    'helpdesk@opentargets.org'
  ),
};
