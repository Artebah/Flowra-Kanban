const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function isEmail(email: string): boolean {
  if (typeof email !== "string" || email.length === 0) {
    return false;
  }

  const MAX_EMAIL_LENGTH = 254;
  if (email.length > MAX_EMAIL_LENGTH) {
    return false;
  }

  return EMAIL_REGEX.test(email);
}
