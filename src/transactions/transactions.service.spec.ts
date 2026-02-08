import { Prisma } from "@prisma/client";
import { TransactionsService } from "./transactions.service";
import { PrismaService } from "../prisma/prisma.service";

describe("TransactionsService", () => {
  let service: TransactionsService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = {
      transaction: {
        create: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn()
      },
      $transaction: jest.fn(async (queries) => Promise.all(queries as any))
    } as unknown as PrismaService;

    service = new TransactionsService(prisma);
  });

  it("creates a transaction with Decimal amount", async () => {
    (prisma.transaction.create as jest.Mock).mockResolvedValue({ id: "tx-1" });

    await service.create("user-1", {
      description: "Lunch",
      amount: "12.50",
      categoryId: 1,
      date: "2026-01-31",
      type: "expense"
    });

    const call = (prisma.transaction.create as jest.Mock).mock.calls[0][0];
    expect(call.data.amount).toBeInstanceOf(Prisma.Decimal);
  });

  it("applies filters and pagination", async () => {
    (prisma.transaction.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.transaction.count as jest.Mock).mockResolvedValue(0);

    const result = await service.findAll("user-1", {
      page: 2,
      limit: 10,
      startDate: "2026-01-01",
      endDate: "2026-01-31",
      categoryId: 3,
      type: "expense"
    });

    expect(prisma.transaction.findMany).toHaveBeenCalled();
    expect(result.pagination).toEqual({ page: 2, limit: 10, total: 0 });
  });
});
