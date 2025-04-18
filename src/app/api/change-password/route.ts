import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/usecase/userService';
import bcrypt from "bcryptjs";
import { auth } from '@/lib/auth/auth';
import { getLogger } from "@/lib/log/logUtil";

const logger = getLogger("account");

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect("/login");
  }

  const user = session.user;

  const { oldPassword, newPassword } = await req.json();

  const existingUser = await userService.getUserByEmail(String(user.email));
  if (existingUser === undefined) {
    logger.info("[userHandler] user with this email does not exists.");
    return NextResponse.json({ error: "User with this email does not exists." }, {status: 404});
  }

  const isOldPasswordValid = await bcrypt.compare(oldPassword, existingUser.password);
  if (!isOldPasswordValid) {
    return NextResponse.json({ message: "Old password is incorrect." }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await userService.updateUserPassword(existingUser.email, hashedPassword);

  return NextResponse.json({ message: "Password changed successfully." }, { status: 200 });
}
