import { PrismaClient, TransactionType } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { id: 1, name: "Food & Dining", type: TransactionType.expense, color: "#FF6B6B" },
  { id: 2, name: "Transportation", type: TransactionType.expense, color: "#4ECDC4" },
  { id: 3, name: "Housing", type: TransactionType.expense, color: "#45B7D1" },
  { id: 4, name: "Entertainment", type: TransactionType.expense, color: "#96CEB4" },
  { id: 5, name: "Healthcare", type: TransactionType.expense, color: "#FFEAA7" },
  { id: 6, name: "Shopping", type: TransactionType.expense, color: "#DDA0DD" },
  { id: 7, name: "Salary", type: TransactionType.income, color: "#98D8C8" },
  { id: 8, name: "Freelance", type: TransactionType.income, color: "#F7DC6F" },
  { id: 9, name: "Investment", type: TransactionType.income, color: "#BB8FCE" },
  { id: 10, name: "Other", type: TransactionType.expense, color: "#85C1E9" }
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: category,
      create: category
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
