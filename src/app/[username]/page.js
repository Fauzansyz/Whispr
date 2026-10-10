import PublicMessagePage from "@/components/PublicMessagePage";

export default async function UserMessagePage({ params }) {
  const { username } = await params;
  return <PublicMessagePage username={username} />;
}
