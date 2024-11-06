import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthEntity } from "./entity/auth.entity";
import { LoginDto } from "./dto/login.dto";
import { SignUpDto } from "./dto/signup.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("signup")
  @ApiOkResponse({ type: AuthEntity })
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
