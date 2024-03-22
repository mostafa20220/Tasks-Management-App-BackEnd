import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        users: ResponseUserDto[];
    }>;
    getProfile(id: string): Promise<{
        user: ResponseUserDto;
    }>;
    UpdateProfile(id: string, updateUserDto: UpdateUserDto): Promise<{
        user: ResponseUserDto;
    }>;
    removeProfile(id: string): Promise<{
        message: string;
    }>;
}
