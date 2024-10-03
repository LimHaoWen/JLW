import { NextResponse, NextRequest } from "next/server";
import { userService } from "@/usecase/userService";
import { UserFormInputDTO } from "./dto";
import { getLogger } from "@/lib/logUtil";

const logger = getLogger("account");

export async function POST(req: NextRequest) {
  try {
    const user: UserFormInputDTO = await req.json();

    const existingUser = await userService.getUserByEmail(user.email);
    
    if (existingUser !== undefined) {
      logger.info("[userHandler] user with this email already exists.")
      return NextResponse.json({ error: "User with this email already exists." }, { status: 400 });
    }

    const existingUsername = await userService.getUserByUsername(user.username);
    if (existingUsername !== undefined) {
      logger.info("[userHandler] username already exists.")
      return NextResponse.json({ error: "Username already exists." }, { status: 400 });
    }


    const newUser = await userService.createUser(user.username, user.email, user.password);

    return NextResponse.json({ 
      message: "User created successfully.",
      user: newUser
    }, { status: 201 });
  } catch (error) {
    logger.error("[userHandler] unexpected error creating user:" + error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
