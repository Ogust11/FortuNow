import { defineConfig } from '@prisma/internals';
import { join } from 'path';

export default defineConfig({
  schema: join(__dirname, './schema.prisma'),
});
