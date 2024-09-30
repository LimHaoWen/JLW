import { Role } from "@prisma/client";

export type User = {
    user_id: number;
    username: string;
    email: string;
    password: string;
    role_type: Role
}