export function getWhatsappHref(value?: string | null) {
  if (!value) {
    return null;
  }

  let digits = value.replace(/\D/g, '');

  if (!digits) {
    return null;
  }

  if (digits.startsWith('0') && digits.length === 11) {
    digits = `20${digits.slice(1)}`;
  }

  return `https://wa.me/${digits}`;
}
