import "../styles/globals.css";
import Layout from "../components/Layout";
import store from "../components/redux/store";
import { Provider } from "react-redux";
import { StyledEngineProvider } from '@mui/material/styles';
import {SessionProvider} from 'next-auth/react'
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StyledEngineProvider>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </StyledEngineProvider>
    </SessionProvider>
  )
  
}

export default MyApp