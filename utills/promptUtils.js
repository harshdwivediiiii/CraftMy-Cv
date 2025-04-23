export function fillPrompt(template, data) {
    return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || '');
  }