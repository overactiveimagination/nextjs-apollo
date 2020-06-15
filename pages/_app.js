import "tailwindcss/dist/base.min.css";
import "tailwindcss/dist/components.min.css";
import "tailwindcss/dist/utilities.min.css";
import Theme from "./../components/Theme";

const App = ({ Component, pageProps }) => (
  <Theme>
    <Component {...pageProps} />
  </Theme>
);

export default App;
