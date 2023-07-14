const getIntlMessage = async (locale) => {
  let messages = {};
  if (locale === 'en') {
    const response = await import('./en.translation-9040786e.js');
    messages = response.default;
  }
  else if (locale === 'hu') {
    const response = await import('./hu.translation-6cbd0fba.js');
    messages = response.default;
  }
  return messages;
};
const getIntlMessageFormatted = (message, values) => {
  return message.replace(/{(\d+)}/g, (_match, index) => {
    return values[index] || '';
  });
};

export { getIntlMessage as g };

//# sourceMappingURL=translation-219ef791.js.map