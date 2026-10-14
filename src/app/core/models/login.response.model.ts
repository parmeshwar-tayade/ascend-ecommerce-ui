import { RoleResponse } from "./role.response.model";

export interface LoginResponse {
userId: number;
firstName: string;
lastName: string;
email: string;
phoneNumber: string;
roles: RoleResponse[];
}