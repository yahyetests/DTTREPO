
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create an account</h1>
        <p className="text-sm text-slate-500">Start your journey with Takween Tutors</p>
      </div>
      
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Doe" required />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="name@example.com" type="email" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="role">I am a</Label>
          <select 
            id="role" 
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            <option value="student">Student / Parent</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" type="password" required />
        </div>

        <Button className="w-full btn-secondary" type="submit">
          Create Account
        </Button>
      </form>

      <div className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <a href="/login" className="text-secondary font-semibold hover:underline">
          Log in
        </a>
      </div>
    </div>
  );
}
