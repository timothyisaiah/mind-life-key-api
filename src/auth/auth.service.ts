import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new BadRequestException("Email already registered");
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: { email: dto.email, passwordHash }
    });

    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
    return { accessToken: token, userId: user.id };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    if (!user.passwordHash) {
      throw new UnauthorizedException("Use Google login for this account");
    }

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.issueToken(user.id, user.email);
  }

  async validateGoogleUser(profile: { id: string; email: string }) {
    const existingByGoogle = await this.prisma.user.findUnique({
      where: { googleId: profile.id }
    });
    if (existingByGoogle) {
      return existingByGoogle;
    }

    const existingByEmail = await this.prisma.user.findUnique({
      where: { email: profile.email }
    });
    if (existingByEmail) {
      return this.prisma.user.update({
        where: { id: existingByEmail.id },
        data: { googleId: profile.id }
      });
    }

    return this.prisma.user.create({
      data: {
        email: profile.email,
        googleId: profile.id,
        passwordHash: null
      }
    });
  }

  async issueToken(userId: string, email: string) {
    const token = await this.jwt.signAsync({ sub: userId, email });
    return { accessToken: token, userId };
  }
}
