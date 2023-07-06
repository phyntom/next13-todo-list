import { PrismaClient } from '@prisma/client';

let globalPrisma = global as unknown as { prisma: PrismaClient | undefined };
let prisma = new PrismaClient();

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient({ log: ['query', 'info'] });
} else {
	if (!globalPrisma.prisma) {
		globalPrisma.prisma = new PrismaClient({ log: ['query', 'info'] });
	}
	prisma = globalPrisma.prisma;
}
export default prisma;
