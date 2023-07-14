export const getIntlMessage = async (locale) => {
  let messages = {};
  if (locale === 'en') {
    const response = await import(`../assets/locales/en.translation.json`);
    messages = response.default;
  }
  else if (locale === 'hu') {
    const response = await import(`../assets/locales/hu.translation.json`);
    messages = response.default;
  }
  return messages;
};
export const getIntlMessageFormatted = (message, values) => {
  return message.replace(/{(\d+)}/g, (_match, index) => {
    return values[index] || '';
  });
};
//# sourceMappingURL=translation.js.map
