import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <main className="glass-card animate-float flex w-full max-w-2xl flex-col items-center gap-12 text-center sm:items-start sm:text-left">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Image
            className="drop-shadow-lg"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />
          <span className="text-2xl font-bold opacity-50">+</span>
          <div className="text-2xl font-black tracking-tighter text-pink-500 drop-shadow-sm">
            YUMMY THEME
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 sm:items-start">
          <h1 className="leading-tight">
            Welcome to your Sweet Dashboard
          </h1>
          <p className="max-w-md text-lg font-medium leading-relaxed opacity-80">
            This project has been upgraded with a high-colorful, yummy-themed CSS stylesheet. 
            Enjoy smooth animations, 3D effects, and a soothing candy palette.
          </p>
          
          <div className="w-full">
            <input 
              type="text" 
              placeholder="Type something yummy..." 
              className="input-soft"
            />
          </div>
        </div>

        <div className="flex flex-col w-full gap-4 sm:flex-row sm:justify-start">
          <a
            className="btn-yummy group"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel logo"
              width={18}
              height={18}
              className="invert"
            />
            Deploy Now
          </a>
          <a
            className="btn-yummy btn-fresh"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
