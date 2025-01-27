import "./style.css";

export const BallLoader = () => {
  return (
    <div className="ball-loader">
      <span className="ball-loader_elmnt" style={{ background: "#fff" }}></span>
      <span className="ball-loader_elmnt" style={{ background: "#fff" }}></span>
      <span className="ball-loader_elmnt" style={{ background: "#fff" }}></span>
    </div>
  );
};
