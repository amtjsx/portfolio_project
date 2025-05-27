export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background with Column Line Transitions */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-30">
          {/* Vertical scanning lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`vertical-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-400/40 to-transparent animate-scan-vertical"
              style={{
                left: `${(i + 1) * 12.5}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: "4s",
              }}
            ></div>
          ))}

          {/* Horizontal scanning lines */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`horizontal-${i}`}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent animate-scan-horizontal"
              style={{
                top: `${(i + 1) * 16.66}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: "5s",
              }}
            ></div>
          ))}
        </div>

        {/* Column Transition Effects */}
        <div className="absolute inset-0">
          {/* Moving column highlights */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`column-${i}`}
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent dark:via-cyan-400/10 animate-column-slide"
              style={{
                left: `${i * 20}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: "8s",
              }}
            ></div>
          ))}
        </div>

        {/* Flowing Line Patterns */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Diagonal flowing lines */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`diagonal-${i}`}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-indigo-300/30 to-transparent dark:via-indigo-400/20 animate-diagonal-flow"
              style={{
                top: `${i * 20}%`,
                transform: "rotate(15deg)",
                transformOrigin: "center",
                animationDelay: `${i * 0.8}s`,
                animationDuration: "6s",
              }}
            ></div>
          ))}
        </div>

        {/* Matrix-style cascading lines */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={`cascade-${i}`}
              className="absolute w-0.5 bg-gradient-to-b from-green-400/0 via-green-400/30 to-green-400/0 dark:from-green-300/0 dark:via-green-300/20 dark:to-green-300/0 animate-cascade"
              style={{
                left: `${Math.random() * 100}%`,
                height: "200px",
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Pulsing connection nodes */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`node-${i}`}
              className="absolute w-2 h-2 bg-blue-400/40 dark:bg-blue-300/30 rounded-full animate-pulse-node"
              style={{
                left: `${20 + (i % 4) * 20}%`,
                top: `${25 + Math.floor(i / 4) * 50}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {/* Connection lines radiating from nodes */}
              <div className="absolute inset-0">
                <div className="absolute w-16 h-px bg-gradient-to-r from-blue-400/20 to-transparent top-1 left-2 animate-connection-line"></div>
                <div
                  className="absolute w-px h-16 bg-gradient-to-b from-blue-400/20 to-transparent left-1 top-2 animate-connection-line"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Sweeping highlight effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5 w-32 animate-sweep"></div>
      </div>


      <div className="relative z-10 w-full max-w-xl p-4">
        {children}

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>© 2024 Portfolio Admin. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
