import Layout from "../../Components/Layout";
import {ReactSession} from 'react-client-session';
import  { Redirect } from 'react-router-dom';
import Secure from "../../Components/Secure";

const SecurePage = () => {
  ReactSession.setStoreType("localStorage")
  const logged = ReactSession.get("logged")
  if(logged == "1"){
    const id = ReactSession.get("id")
    const firstName = ReactSession.get("first_name")
    const lastName = ReactSession.get("last_name")
    return (
        <Layout>
          <Secure id={id} firstName={firstName} lastName={lastName} />
        </Layout>
    );
  }else{
    return <Redirect to='/'  />
  }
};

export default SecurePage;
