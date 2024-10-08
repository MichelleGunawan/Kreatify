"use client";
import { login, signup } from "./actions";
import { createClient } from "@/utils/supabase/ssr/client";

export default function LoginPage() {
    const supabase = createClient();
    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${
                    location.origin
                }/auth/callback?next=${"/talent"}`,
            },
        });
    };

    return (
        <form>
            <label htmlFor="email">Full Name:</label>
            <input id="full_name" name="full_name" type="name" required />
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <button formAction={login}>Log in</button>
            <button formAction={signup}>Sign up</button>
            <button onClick={handleLogin}>Log in with Google</button>
        </form>
    );
}
