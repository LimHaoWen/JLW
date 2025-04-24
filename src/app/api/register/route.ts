import { NextResponse, NextRequest } from "next/server";
import { userService } from "@/usecase/userService";
import { UserFormInputDTO } from "./dto";
import { getLogger } from "@/lib/log/logUtil";
import { UserAlreadyExistsError } from "@/lib/errors/userErrors";

const logger = getLogger("account");

export async function POST(req: NextRequest) {
  try {
    const user: UserFormInputDTO = await req.json();

    await userService.getUserByEmail(user.email);
    await userService.getUserByUsername(user.username);

    const newUser = await userService.createUser(user.username, user.email, user.password);

    return NextResponse.json({ 
      message: "User created successfully.",
      user: newUser
    }, { 
      status: 201 
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      logger.info("[userHandler] user with this email already exists.");
      return NextResponse.json({ error: "Email is already registered." }, { status: 409 });
    }

    logger.error("[userHandler] unexpected error creating user:" + err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
