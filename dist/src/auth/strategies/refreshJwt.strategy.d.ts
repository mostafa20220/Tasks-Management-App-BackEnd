import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { JwtPayloadWithRt } from '../types/tokens.type';
declare const RefreshJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshJwtStrategy extends RefreshJwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(req: Request, payload: JwtPayloadWithRt): Promise<any>;
}
export {};
