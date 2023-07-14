const getIntlMessage = async (locale) => {
  let messages = {};
  if (locale === 'en') {
    const response = await import('./en.translation.js');
    messages = response.default;
  }
  else if (locale === 'hu') {
    const response = await import('./hu.translation.js');
    messages = response.default;
  }
  return messages;
};

export { getIntlMessage as g };

//# sourceMappingURL=translation.js.map