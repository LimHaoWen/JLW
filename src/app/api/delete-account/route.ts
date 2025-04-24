import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/usecase/userService";
import { usernameDTO } from "./dto";
import { auth } from "@/lib/auth/auth";
import { getLogger } from "@/lib/log/logUtil";
import { NotFoundError } from "@/lib/errors/genericErrors";

const logger = getLogger("account");

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.redirect("/login");
      }

    const user: usernameDTO = await req.json();

    const existingUser = await userService.getUserByUsername(user.username);
    
    const _ = await userService.deleteUserByEmail(existingUser.email);

    return NextResponse.json({ 
      message: "User successfully deleted."
    },{
      status: 200 
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      logger.info("[userHandler] user with this email does not exists.");
      return NextResponse.json({ error: "User with this email does not exists." }, { status: 404 });
    }

    logger.error("[userHandler] unexpected error creating user:" + err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}