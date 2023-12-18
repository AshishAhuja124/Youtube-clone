import Body from "./components/Body";
import Head from "./components/Head";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/VideosSection/WatchPage";
import Demo from "./components/Demo";
import Demo2 from "./components/Demo2";

const Layout = () => {
  return (
    <>
      <Head />
      <Body />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainContainer />
      },
      {
        path: '/watch',
        element: <WatchPage />
      },

      {
        path: '/demo',
        element: (
          <>
            <Demo />
            <Demo2 />
          </>
        )
      }
    ]
  }
])

function App() {
  return (
    <Provider store={appStore}>
        <RouterProvider router={appRouter} />
    </Provider>

  );
}

export default App;
