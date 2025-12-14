import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret-key-change-this-in-prod"; // In a real app, use process.env.JWT_SECRET
const key = new TextEncoder().encode(secretKey);

interface SessionPayload {
    user?: { email: string };
    expires?: Date;
    [key: string]: unknown; // Allow other properties from JWTPayload
}

export async function encrypt(payload: SessionPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(input: string): Promise<SessionPayload> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload as SessionPayload;
}

export async function login(formData: FormData) {
    // Verify credentials (this is a mock, replace with DB check if needed)
    // For this task, we are using hardcoded admin credentials as per plan
    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "admin@riadconnect.ma" && password === "admin") {
        // Create the session
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        const session = await encrypt({ user: { email }, expires });

        // Save the session in a cookie
        (await cookies()).set("session", session, { expires, httpOnly: true });
        return true;
    }
    return false;
}

export async function logout() {
    // Destroy the session
    (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;
    try {
        return await decrypt(session);
    } catch {
        return null;
    }
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}
