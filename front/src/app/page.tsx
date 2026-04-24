import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const headersList = await headers();
  const headerPathname = headersList.get("x-pathname") ?? "";
  if (!headerPathname) redirect("/home");
};

export default Page;
