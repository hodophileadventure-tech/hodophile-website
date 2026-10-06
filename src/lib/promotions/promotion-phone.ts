export function normalizePromotionPhone(phone: string): string | null {
  const trimmedPhone = phone.trim();
  const digits = trimmedPhone.replace(/\D/g, "");

  if (trimmedPhone.startsWith("+") && digits.length >= 8 && digits.length <= 15) {
    return `+${digits}`;
  }

  if (digits.startsWith("00") && digits.length >= 10 && digits.length <= 17) {
    return `+${digits.slice(2)}`;
  }

  if (digits.length === 11 && digits.startsWith("03")) {
    return `+92${digits.slice(1)}`;
  }

  if (digits.length === 12 && digits.startsWith("92")) {
    return `+${digits}`;
  }

  return null;
}
