import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Scaffold-ETH Projects";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Node positions for the network
  const nodes = [
    { x: 80, y: 100 },
    { x: 200, y: 180 },
    { x: 120, y: 280 },
    { x: 280, y: 120 },
    { x: 350, y: 220 },
    { x: 180, y: 380 },
    { x: 320, y: 350 },
    { x: 420, y: 140 },
    { x: 480, y: 280 },
    // Right side
    { x: 720, y: 80 },
    { x: 850, y: 150 },
    { x: 780, y: 250 },
    { x: 920, y: 100 },
    { x: 1000, y: 200 },
    { x: 880, y: 320 },
    { x: 1050, y: 350 },
    { x: 750, y: 400 },
    { x: 950, y: 450 },
    { x: 1100, y: 280 },
    { x: 1120, y: 450 },
  ];

  // Connections between nodes (indices)
  const connections = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 5],
    [4, 6],
    [3, 7],
    [4, 8],
    [6, 8],
    [9, 10],
    [10, 11],
    [9, 12],
    [10, 12],
    [10, 13],
    [11, 14],
    [13, 14],
    [11, 16],
    [14, 15],
    [14, 17],
    [15, 18],
    [13, 18],
    [15, 19],
    [17, 19],
  ];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Connection lines */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          viewBox="0 0 1200 630"
        >
          {connections.map(([from, to], i) => (
            <line
              key={i}
              x1={nodes[from].x}
              y1={nodes[from].y}
              x2={nodes[to].x}
              y2={nodes[to].y}
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: node.x - 4,
              top: node.y - 4,
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: i % 3 === 0 ? "rgba(6, 182, 212, 0.6)" : "rgba(59, 130, 246, 0.5)",
            }}
          />
        ))}

        {/* Triangle shapes */}
        <div
          style={{
            position: "absolute",
            left: "60px",
            top: "80px",
            width: 0,
            height: 0,
            borderLeft: "40px solid transparent",
            borderRight: "40px solid transparent",
            borderBottom: "70px solid rgba(59, 130, 246, 0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "100px",
            top: "60px",
            width: 0,
            height: 0,
            borderLeft: "50px solid transparent",
            borderRight: "50px solid transparent",
            borderBottom: "85px solid rgba(6, 182, 212, 0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "150px",
            bottom: "100px",
            width: 0,
            height: 0,
            borderLeft: "35px solid transparent",
            borderRight: "35px solid transparent",
            borderBottom: "60px solid rgba(59, 130, 246, 0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "180px",
            bottom: "80px",
            width: 0,
            height: 0,
            borderLeft: "45px solid transparent",
            borderRight: "45px solid transparent",
            borderBottom: "75px solid rgba(6, 182, 212, 0.07)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            zIndex: 10,
          }}
        >
          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: "96px",
              fontWeight: "bold",
              color: "#f8fafc",
              letterSpacing: "-0.03em",
            }}
          >
            Scaffold-ETH Projects
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: "flex",
              fontSize: "36px",
              color: "#64748b",
              letterSpacing: "-0.01em",
            }}
          >
            Open source projects built with Scaffold-ETH
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6)",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
