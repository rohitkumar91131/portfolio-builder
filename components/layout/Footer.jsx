export default function Footer() {
  return (
    <footer className="py-12 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black text-center">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
            P
          </div>
          <span className="text-lg font-bold tracking-tight">Portfolio</span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
          The easiest way to build, manage, and deploy your developer portfolio. No coding required.
        </p>

        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-blue-600 transition">Twitter</a>
          <a href="#" className="hover:text-blue-600 transition">GitHub</a>
          <a href="#" className="hover:text-blue-600 transition">Discord</a>
        </div>

        <div className="text-xs text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
