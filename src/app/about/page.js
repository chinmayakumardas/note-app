import { useRouter } from "next/router";

export default function AboutPage() {
  const router=useRouter();
  return (
    <main className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-cyan-400 mb-4">👨‍💻 About Me</h1>
      <p className="text-gray-300 leading-relaxed max-w-2xl">
        Im a passionate full stack developer from India with expertise in building high-quality, scalable SaaS platforms.
        I specialize in microfrontend architecture, event-driven systems, and production-grade Next.js applications.
    
    <button onClick={() =>router.back()} className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors">
BAck to home</button>
    <button onClick={() =>router.push("/about")} className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors">
 About</button>
 
      </p>
    </main>
  )
}
