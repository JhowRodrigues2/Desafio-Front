import React, { useEffect, useState } from "react";
import "./App.css";

interface IClickedProps {
  clientX: number;
  clientY: number;
}

function App() {
  const [clickedPoints, setClickedPoints] = useState<IClickedProps[]>([]);
  const [undoPoints, setUndoPoints] = useState<IClickedProps[]>([]);

  function getCordenates(e: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY }: IClickedProps = e;

    setClickedPoints([...clickedPoints, { clientX, clientY }]);
    console.log(clickedPoints);
  }

  const handleUndo = () => {
    const newClickedPoint = [...clickedPoints];
    const undoPoint = newClickedPoint.pop();
    setClickedPoints(newClickedPoint);
    if (!undoPoint) return;
    setUndoPoints([...undoPoints, undoPoint]);
  };

  const handleRedo = () => {
    const newUndoPoints = [...undoPoints];
    const redoPoint = newUndoPoints.pop();
    setUndoPoints(newUndoPoints);
    if (!redoPoint) return;
    setClickedPoints([...clickedPoints, redoPoint]);
  };
  return (
    <>
      <button onClick={handleUndo} disabled={clickedPoints.length === 0}>
        Undo
      </button>
      <button onClick={handleRedo} disabled={undoPoints.length === 0}>
        Redo
      </button>
      <div className="App" onClick={getCordenates}>
        {clickedPoints.map((clickPoint, index) => {
          return (
            <div
              className="clickPoint"
              key={index}
              style={{
                left: clickPoint.clientX,
                top: clickPoint.clientY,
                position: "absolute",
                borderRadius: "50%",
                background: "blueviolet",
                width: "10px",
                height: "10px",
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
}

export default App;
