import { signIn } from "@/actions/auth/sign-in";
import { Button } from "@/components/ui/button";
import { GitHub } from "@/icons/github";

export function SignInWithGitHub() {
  return (
    <form
      action={signIn}
    >
      <Button
        type="submit"
        className="h-12 w-full bg-zinc-800 transition-colors hover:bg-zinc-800/80"
      >
        <GitHub className="fill-white" />
        Continue with GitHub
      </Button>
    </form>
  );
}
