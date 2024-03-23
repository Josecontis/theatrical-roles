import React, { useState } from "react";
import { animated, useSpring } from "react-spring";

function Circle({ label, startX, startY, endX, endY, intermediatePoints }) {
  const props = useSpring({
    from: { left: startX, top: startY },
    to: async (next) => {
      if (intermediatePoints && intermediatePoints.length > 0) {
        for (const point of intermediatePoints) {
          await next({ left: point.x, top: point.y });
        }
      } else {
        await next({ left: endX, top: endY });
      }
    },
    config: { duration: 2000 },
  });

  return (
    <animated.div
      style={{
        ...props,
        position: "absolute",
        background: "blue",
        borderRadius: "50%",
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {label}
    </animated.div>
  );
}

function App() {
  const [circles, setCircles] = useState([
    {
      id: 1,
      name: "Moulinex",
      startX: 0,
      startY: 0,
      endX: 200,
      endY: 200,
      intermediatePoints: [
        { x: 50, y: 50 },
        { x: 100, y: 100 },
        { x: 150, y: 150 },
      ],
    },
    {
      id: 2,
      name: "Stefano",
      startX: 0,
      startY: 0,
      endX: 300,
      endY: 300,
      intermediatePoints: [
        { x: 100, y: 100 },
        { x: 200, y: 200 },
        { x: 300, y: 300 },
      ],
    },
    // Aggiungi qui altre coordinate dei cerchi
  ]);
  const [start, setStart] = useState(false);
  const [newCircleName, setNewCircleName] = useState("");
  const [newCircleStartX, setNewCircleStartX] = useState(0);
  const [newCircleStartY, setNewCircleStartY] = useState(0);

  const moveCircle = (id, startX, startY, endX, endY) => {
    setCircles(
      circles.map((circle) =>
        circle.id === id ? { ...circle, startX, startY, endX, endY } : circle
      )
    );
  };
  const addCircle = () => {
    const id = Math.max(...circles.map((c) => c.id)) + 1;
    setCircles([
      ...circles,
      {
        id,
        name: newCircleName,
        startX: newCircleStartX,
        startY: newCircleStartY,
        endX: newCircleStartX,
        endY: newCircleStartY,
      },
    ]);
    setNewCircleName(""); // Resetta il campo del nome del cerchio dopo l'aggiunta
    setNewCircleStartX(0); // Resetta il campo startX dopo l'aggiunta
    setNewCircleStartY(0); // Resetta il campo startY dopo l'aggiunta
  };

  const removeCircle = (id) => {
    setCircles(circles.filter((circle) => circle.id !== id));
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <button onClick={() => setStart(!start)}>Avvia animazioni</button>
        <button onClick={addCircle}>Aggiungi cerchio</button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",
          }}
        >
          <input
            type="text"
            value={newCircleName}
            onChange={(e) => setNewCircleName(e.target.value)}
            placeholder="Nome del cerchio"
          />
          <label>
            startX:
            <input
              type="number"
              value={newCircleStartX}
              onChange={(e) => setNewCircleStartX(Number(e.target.value))}
            />
          </label>
          <label>
            startY:
            <input
              type="number"
              value={newCircleStartY}
              onChange={(e) => setNewCircleStartY(Number(e.target.value))}
            />
          </label>

          {circles.map((circle) => (
            <div key={circle.id}>
              <h3>
                Cerchio {circle.id}{" "}
                <button onClick={() => removeCircle(circle.id)}>Rimuovi</button>
              </h3>
              <label>
                startX:
                <input
                  type="number"
                  value={circle.startX}
                  onChange={(e) =>
                    moveCircle(
                      circle.id,
                      Number(e.target.value),
                      circle.startY,
                      circle.endX,
                      circle.endY
                    )
                  }
                />
              </label>
              <label>
                startY:
                <input
                  type="number"
                  value={circle.startY}
                  onChange={(e) =>
                    moveCircle(
                      circle.id,
                      circle.startX,
                      Number(e.target.value),
                      circle.endX,
                      circle.endY
                    )
                  }
                />
              </label>
              <label>
                endX:
                <input
                  type="number"
                  value={circle.endX}
                  onChange={(e) =>
                    moveCircle(
                      circle.id,
                      circle.startX,
                      circle.startY,
                      Number(e.target.value),
                      circle.endY
                    )
                  }
                />
              </label>
              <label>
                endY:
                <input
                  type="number"
                  value={circle.endY}
                  onChange={(e) =>
                    moveCircle(
                      circle.id,
                      circle.startX,
                      circle.startY,
                      circle.endX,
                      Number(e.target.value)
                    )
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          background: "lightgrey",
        }}
      >
        {circles.map((circle) => (
          <Circle
            key={circle.id}
            startX={circle.startX}
            startY={circle.startY}
            endX={circle.endX}
            endY={circle.endY}
            label={circle.name}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
