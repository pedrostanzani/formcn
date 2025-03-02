import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { GitHub } from "@/icons/github";

export function SignInWithGitHub() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button
        type="submit"
        className="h-12 w-full cursor-pointer bg-zinc-800 transition-colors hover:bg-zinc-800/80"
      >
        <GitHub className="fill-white" />
        Continue with GitHub
      </Button>
    </form>
  );
}
