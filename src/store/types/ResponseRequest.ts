import { UserDto } from './User';

export type ResponseUserDto = {
	success: boolean;
	message: string;
	data?: UserDto[];
};
