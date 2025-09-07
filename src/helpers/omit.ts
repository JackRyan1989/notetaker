export default function omit(key: string, obj: { [key]: unknown }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: _omitted, ...rest } = obj;
  return rest;
}
