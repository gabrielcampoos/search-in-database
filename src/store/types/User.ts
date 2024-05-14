export interface UserDto {
	id: string;
	name: string;
	email: string;
	cpf: string;
	phone: string;
}

export interface FilterUserDto {
	name?: string;
	email?: string;
	cpf?: string;
	phone?: string;
}
