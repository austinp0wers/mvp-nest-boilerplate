import * as bcrypt from 'bcrypt';

export async function validatePasswordHash(
  password: string | undefined,
  hash: string | undefined,
): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }
  return await bcrypt.compare(password, hash);
}
