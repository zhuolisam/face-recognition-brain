import React,{ useState} from 'react';

const Register = ({onRouteChange,loadUser}) => {
    const [registerEmail, setRegisterEmail] = useState(
        {email:'',
        password: '',
        name: ''
    });


const onSubmitRegister = () => {
  // console.log(registerEmail);
    fetch('https://rocky-meadow-29133.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: registerEmail.email,
        password: registerEmail.password,
        name: registerEmail.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          loadUser(user);
          onRouteChange('home');
        }
      })
      .catch(err => console.log(err));
  }

return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={e => setRegisterEmail({
                    ...registerEmail,
                    name: e.target.value
                })}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={e => setRegisterEmail({
                    ...registerEmail,
                    email: e.target.value
                })}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={e => setRegisterEmail({
                    ...registerEmail,
                    password: e.target.value
                })}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitRegister}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
          <div className="lh-copy mt3">
            <p  onClick={() => onRouteChange('signin')} className="f6 link dim black db pointer">Sign In</p>
          </div>
        </div>
      </main>
    </article>
  );
}

export default Register;