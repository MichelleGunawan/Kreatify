import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/ssr/server";

export default async function PrivatePage() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    const user_metadata = data.user?.user_metadata;
    if (error || !data?.user) {
        redirect("/login");
    }

    return (
        <p>
            Hello {user_metadata ? user_metadata.name : "null"}{" "}
            {data.user.email}
        </p>
    );
}
