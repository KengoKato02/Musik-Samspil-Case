import {
  Controller,
  Param,
  Post,
  UseGuards,
  Request,
  BadRequestException,
  Get,
  Patch,
  Body,
} from "@nestjs/common";
import { ApplicationService } from "./application.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Types } from "mongoose";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApplicationStatus } from "../../utils/types/enums";
import { ApplyForPostDto } from "./dto/application.dto";
import { AuthenticatedRequest } from "../../utils/interfaces/AuthenticatedRequest";

@Controller("application")
@ApiTags("Application")
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post(":postId")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  async applyForPost(
    @Param("postId") postId: string,
    @Request() req: AuthenticatedRequest,
    @Body() applyDto: ApplyForPostDto,
  ) {
    if (!Types.ObjectId.isValid(postId)) {
      throw new BadRequestException("Invalid post ID");
    }
    return this.applicationService.applyForPost(
      postId,
      req.user._id.toString(),
      applyDto.instrument,
      applyDto.message,
    );
  }

  @Get("post/:postId")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  async getApplicationsForPost(@Param("postId") postId: string) {
    if (!Types.ObjectId.isValid(postId)) {
      throw new BadRequestException("Invalid post ID");
    }
    return this.applicationService.getApplicationsForPost(postId);
  }

  @Patch(":applicationId/status")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  async updateApplicationStatus(
    @Param("applicationId") applicationId: string,
    @Body("status") status: ApplicationStatus,
  ) {
    if (!["pending", "approved", "rejected"].includes(status)) {
      throw new BadRequestException("Invalid status");
    }
    return this.applicationService.changeApplicationStatus(applicationId, status);
  }
}
