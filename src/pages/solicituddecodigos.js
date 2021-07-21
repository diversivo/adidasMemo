
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { navigate } from 'gatsby';

import { clrIlTxt, copyTextToClipboard, sha256 } from '../components/utils';
import Logo from '../assets/svg/AdidasLogo.svg';


const GeneratorLogin = ({ location }) => {

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const userChange = (e) => {
    setUser(e.target.value);
  };

  const passChange = (e) => {
    setPass(e.target.value);
  };

  const check = async () => {
    const hashpass = await sha256(pass);
    if(hashpass === '2de3b553327b7a7025b4b0993cb23366ddadc1fbbeb34ef1b8126a640d266a45'){
      navigate('/generator', {
        state: { user },
      });
    }
  };

  return (<Layout>
    <SEO title="Generator" />
    <div className="container flex-fdc-fc-fs">
      <div className="txt-center">
        <Logo className="max-w-56" />
      </div>
      <div>¿Cuanto sabes de nosotras?</div>
      <form>
        <label>Usuario</label>
        <input type="text" onChange={userChange} />
        <label>Contraseña</label>
        <input type="password" onChange={passChange} />
        <div>
          <input
            // style={{ ...clrIlTxt('wht', 50), backgroundColor: '#005EA1', border: 0 }}
            type="button"
            value="INGRESAR"
            className="btn btn--primary"
            onClick={check}
          />
        </div>
      </form>
    </div>
  </Layout >);
}


export default GeneratorLogin;