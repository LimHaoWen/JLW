import { Role } from "@prisma/client"

export interface CreatedUserInfoDTO {
    username: string,
    email: string,
    role_type: Role
}