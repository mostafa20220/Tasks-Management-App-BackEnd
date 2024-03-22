import { AuthService } from './auth.service';
import { User } from 'src/users/user.schema';
import { JwtPayloadWithRt, Tokens } from './types/tokens.type';
import { SignupDto } from './dto/signup.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signin(user: User): Promise<{
        user: ResponseUserDto;
        tokens: Tokens;
    }>;
    signup(signupDto: SignupDto): Promise<{
        user: ResponseUserDto;
        tokens: Tokens;
    }>;
    logout(id: string): Promise<{
        message: string;
    }>;
    refreshToken(payload: JwtPayloadWithRt): Promise<{
        tokens: Tokens;
    }>;
}
