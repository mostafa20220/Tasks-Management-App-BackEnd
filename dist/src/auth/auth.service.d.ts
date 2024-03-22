import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/auth/dto/signin.dto';
import { JwtPayloadWithRt, Tokens } from './types/tokens.type';
import { SignupDto } from './dto/signup.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    signin(user: User): Promise<{
        user: ResponseUserDto;
        tokens: Tokens;
    }>;
    signup(signupDto: SignupDto): Promise<{
        user: ResponseUserDto;
        tokens: Tokens;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    refreshTokens(payload: JwtPayloadWithRt): Promise<{
        tokens: Tokens;
    }>;
    generateTokens(id: string): Promise<Tokens>;
    updateRT(userId: string, newRT?: string | null): Promise<void>;
    hashData(data: string): Promise<string>;
    validateUser(singInDto: SignInDto): Promise<User>;
    validateRT(userID: string, rt: string): Promise<boolean>;
}
