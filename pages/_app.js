import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import NavBar from "../components/navbar";
import { useRouter } from "next/router";
import store from "../../../React/blogtor/src/store";
import { Provider } from "react-redux";
import Layout from "../components/layout";
import { Hydrate } from "react-query";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);
  let notShowNavbarIfDashboard = router.pathname
    .split("/")
    .includes("dashboard");
  let notShowNavbarIfSignup = router.pathname.split("/").includes("signup");
  let notShowNavbarIfLogin = router.pathname.split("/").includes("login");

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          {notShowNavbarIfDashboard ||
          notShowNavbarIfSignup ||
          notShowNavbarIfLogin ||
          router.route === "/_error" ? (
            ""
          ) : (
            <NavBar />
          )}
          {getLayout(
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
