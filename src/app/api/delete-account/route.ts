import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/usecase/userService";
import { usernameDTO } from "./dto";
import { auth } from "@/lib/auth";
import { getLogger } from "@/lib/logUtil";

const logger = getLogger("account");

export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.redirect("/login");
      }

    const user: usernameDTO = await req.json();

    const existingUser = await userService.getUserByUsername(user.username);
    
    if (existingUser === undefined) {
      logger.info("[userHandler] user with this email does not exists.");
      return NextResponse.json({ error: "User with this email does not exists." }, { status: 404 });
    }
    
    const deletedUser = await userService.deleteUserByEmail(existingUser.email);

    return NextResponse.json({ message: "User successfully deleted."},{ status: 200 });
}