import { PrismaClient } from "@prisma/client";
// https://github.com/prisma/prisma/issues/5050
// single instance share entire app
export const prisma = new PrismaClient();