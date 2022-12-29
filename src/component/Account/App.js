import MenuLeft from "./MenuLeft";
function App(props) {

  return (
      <>
                    <MenuLeft/>
                    {props.children}
      </>
  );
}
export default App;