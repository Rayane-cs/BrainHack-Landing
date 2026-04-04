import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #000101 0%, #041830 60%, #000101 100%)" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-[#3ed2ff15] rounded-full blur-[100px] pointer-events-none" />

      <span className="text-[#3ed2ff20] leading-none mb-6" style={{ fontSize: "clamp(100px, 25vw, 200px)" }}>
        404
      </span>
      <h1 className="text-[#fafdff] text-2xl md:text-3xl mb-3 text-center">Page Not Found</h1>
      <p className="text-[#7fa6bd] text-sm md:text-base text-center max-w-[400px] mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => setLocation("/")}
        className="bg-[#3ed2ff] text-[#000101] px-8 py-3 rounded-[50px] hover:bg-[#5ddcff] transition-colors cursor-pointer"
      >
        Back to Home
      </button>
    </div>
  );
}
