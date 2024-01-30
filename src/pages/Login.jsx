import {
  useLoaderData,
  useActionData,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";
  try {
    const data = await loginUser(email, password);
    localStorage.setItem("loggedin", true);
    const response = redirect(pathname);
    /*     response.body = true; */
    return response;
  } catch (err) {
    return err;
  }
}

function Login() {
  const message = useLoaderData();
  const error = useActionData();
  const navigation = useNavigation();

  function fakeLogOut() {
    localStorage.removeItem("loggedin");
    window.location.reload();
  }

  return (
    <>
      <div className="login-container">
        {localStorage.getItem("loggedin") ? (
          <>
            <h1 className>You are already logged in.</h1>
            <button onClick={fakeLogOut} className="logOutBtn">
              Log out
            </button>
          </>
        ) : (
          <>
            <h1>Sign in to your account</h1>
            {message && <h3 className="red">{message}</h3>}
            {error && <h3 className="red">{error.message}</h3>}
            <Form className="login-form" method="post" replace>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={"b@b.com"}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={"p123"}
              />
              <button disabled={navigation.state === "submitting"}>
                {navigation.state === "submitting" ? "Logging in..." : "Login"}
              </button>
            </Form>
          </>
        )}
      </div>
    </>
  );
}
export default Login;
