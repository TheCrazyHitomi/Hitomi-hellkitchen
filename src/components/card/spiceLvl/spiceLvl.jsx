const SpiceLvlScale = ({ spiceLvlValue }) => {

    const scale = {
      1: "#93D408",
      2: "#FEC907",
      3: "#FE8707",
      4: "#FE0707"
  };
    return (
          <div
            style={{
                position: "absolute",
                top: "15px",
                right: "-10px",
                width: "5rem",
                height: "2rem",
                display: "flex",
                alignItems: "start",
                justifyContent: "start",
                paddingLeft: "0.8rem",
                borderRadius: "1.5rem 0 0 0",
                fontSize: "1.2em",
                color: "white",
                zIndex: 100,
                backgroundColor: spiceLvlValue ? scale[spiceLvlValue] : null,
            }}
          >
          {spiceLvlValue ? 
            <img src={`src/assets/images/chilli.svg`} 
            style={{
                width: "2rem",
                height: "2rem",
                padding: "0.2rem",

            }}/> : null}
          </div>
  );
};
export default SpiceLvlScale;