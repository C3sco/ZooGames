import "./loading.css";

function Loading(props) {
  const {
    size = "3rem",
    borderWidth = "0.5em",
    spinnerColor = "#6060ff",
    backgroundColor = "rgba(86, 86, 86, 0.1)",
    style = {},
  } = props;

  const loaderStyle = {
    width: size,
    height: size,
    borderColor: backgroundColor,
    borderWidth,
    borderLeftColor: spinnerColor,
    ...style,
  };

  return (
    <div className="loading-spinner">
      <br></br>
      <div
        className="loading-spinner__spinner"
        style={loaderStyle}
      />
      CARICAMENTO....
    </div>
  );
}

export default Loading;