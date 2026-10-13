import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// The eye button that shows or hides a password. It only draws the button; whoever uses it owns
// the "shown" state and decides where it sits.
export function PasswordToggle({ shown, onToggle, className = "" }) {
  const Icon = shown ? EyeOff : Eye;
  const label = shown ? "Hide password" : "Show password";

  return (
    <button
      type="button"
      onClick={onToggle}
      // Keeps the cursor (and, on a phone, the keyboard) in the password box when the eye is pressed.
      onMouseDown={(event) => event.preventDefault()}
      aria-label={label}
      title={label}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${className}`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}

// A password box with the eye inside its right-hand end. The visible state lives here, so every box
// starts hidden and goes back to hidden whenever the form holding it is closed and opened again.
// `className` styles the input; leave about 3rem free on its right (pr-12) so text never runs
// underneath the eye.
export function PasswordInput({ className = "", ...inputProps }) {
  const [shown, setShown] = useState(false);

  return (
    <div className="relative">
      <input
        {...inputProps}
        type={shown ? "text" : "password"}
        className={className}
      />

      <PasswordToggle
        shown={shown}
        onToggle={() => setShown((value) => !value)}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#3a3a3a] hover:bg-[#e8f7df]"
      />
    </div>
  );
}
