import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { PrismaService } from "../../prisma/prisma.service";
import { AuthEntity } from "./entity/auth.entity";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email: ${email} was not found`);
    }

    if (!user.password) {
      throw new Error("User does not have a set password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Incorrect password");
    }

    const accessToken = this.jwtService.sign({ userId: user.id });
    return { accessToken };
  }

  async signUp(signUpDto: SignUpDto): Promise<AuthEntity> {
    const { email } = signUpDto;
    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (userExists) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...signUpDto,
        password: hashedPassword,
      },
    });

    const accessToken = this.jwtService.sign({ userId: user.id });
    return { accessToken };
  }
}