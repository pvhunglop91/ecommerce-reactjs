import Head from "./component/Layout/Head";
import Footer from "./component/Layout/Footer";
import MenuLeft from "./component/Layout/MenuLeft";
import Script from "./component/Layout/Script";
import {useLocation} from "react-router-dom"
function App(props) {
  const location = useLocation()
  let params1 = location.pathname;
  return (
      <>
          <Head/>
          <section>
              <div className="container">
                  <div className="row">
                    {params1.includes("account") ? '' : <MenuLeft/>}
                    {props.children}
                  </div>
              </div>
          </section>
          <Footer/>
          <Script/>
      </>
  );
}

export default App;
