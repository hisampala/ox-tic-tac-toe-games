import { PrismaClient } from '@ox/repository';

export const prismaService = new PrismaClient({ errorFormat: "pretty", log: ["error", "warn", "info"] })

prismaService.$connect().then(() => console.log("database connected"))
