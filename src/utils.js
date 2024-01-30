import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem("loggedin");

  if (!isLoggedIn) {
    const response = redirect(
      `/login?message=You Must Login First.&redirectTo=${pathname}`
    );
    throw response;
  }
  return null;
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
