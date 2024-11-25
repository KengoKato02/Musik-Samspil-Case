import { Injectable, Logger, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UserEntity } from "./entity/user.entity";
import { ObjectId } from "mongodb";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "@prisma/client";
import { OnboardingDto } from "./dto/onboarding.dto";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  private async validateAndGetUser(userId: string): Promise<User> {
    if (!userId) {
      throw new BadRequestException("User id not found in request");
    }

    const objectId = new ObjectId(userId);
    const user = await this.prisma.user.findUnique({
      where: { id: objectId.toString() },
    });

    if (!user) {
      throw new NotFoundException(`User with id: ${userId} was not found`);
    }
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    this.logger.log(`Retrieved ${users.length} users`);
    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with email: ${email} was not found`);
    }
    return user;
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.validateAndGetUser(userId);
    return user;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!userId) {
      throw new BadRequestException("User ID is required");
    }

    const objectId = new ObjectId(userId);
    const user = await this.prisma.user.findUnique({
      where: { id: objectId.toString() },
    });

    if (!user) {
      throw new NotFoundException(`User with id: ${userId} was not found`);
    }

    return this.prisma.user.update({
      where: { id: objectId.toString() },
      data: updateUserDto,
    });
  }

  async getOnboardingStatus(userId: string): Promise<{ onboarded: boolean }> {
    const user = await this.validateAndGetUser(userId);
    const isOnboarded = !!(user.phone_number && user.instrument);
    return { onboarded: isOnboarded };
  }

  async completeOnboarding(userId: string, onboardingDto: OnboardingDto): Promise<User> {
    if (!userId) {
      throw new BadRequestException("User id not found in request");
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { ...onboardingDto },
    });
  }
}
