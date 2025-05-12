import keyAvatarImg from "../../assets/key-avatar.jpeg";

export function Header() {
  return (
    <header className="mt-8 rounded-2xl py-8 px-6 h-20 bg-white border border-zinc-200 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/favicon.png"
          alt="Nascent Logo"
          className="rounded-xl size-10"
        />
        <div className="flex flex-col">
          <span className="font-semibold leading-tight">Nascent</span>
          <span className="text-sm text-zinc-500">Frontend Test</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={keyAvatarImg}
          alt="Key Yu Wan"
          className="rounded-full size-10"
        />
        <div className="flex flex-col">
          <span className="font-medium size-sm leading-snug">Key Yu Wan</span>
          <span className="text-xs text-zinc-400">keyflcbyuwan@gmail.com</span>
        </div>
      </div>
    </header>
  );
}
