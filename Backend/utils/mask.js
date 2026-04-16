export function maskEnv(value, visible = 4) {
  if (!value) return "";
  const maskedPart = "*".repeat(value.length - visible);
  return maskedPart + value.slice(-visible);
}