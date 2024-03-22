import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/tokens.type';
declare const jwtStrategy_base: new (...args: any[]) => Strategy;
export declare class jwtStrategy extends jwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<any>;
}
export {};
