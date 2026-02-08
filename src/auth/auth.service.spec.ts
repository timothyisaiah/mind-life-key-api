import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

describe("AuthService", () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeEach(() => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn()
      }
    } as unknown as PrismaService;

    jwt = {
      signAsync: jest.fn()
    } as unknown as JwtService;

    service = new AuthService(prisma, jwt);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("registers a new user and returns token", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue({ id: "user-1", email: "a@b.com" });
    jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed" as never);
    (jwt.signAsync as jest.Mock).mockResolvedValue("token");

    const result = await service.register({ email: "a@b.com", password: "password123" });

    expect(prisma.user.create).toHaveBeenCalled();
    expect(result).toEqual({ accessToken: "token", userId: "user-1" });
  });

  it("rejects invalid login", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(
      service.login({ email: "missing@b.com", password: "password123" })
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it("rejects wrong password", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "user-1",
      email: "a@b.com",
      passwordHash: "hash"
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

    await expect(
      service.login({ email: "a@b.com", password: "wrong" })
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
