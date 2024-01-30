import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <h1>Error: {error.message}</h1>
      <pre>
        {error.status} - {error.statusText}
      </pre>{" "}
      {/*display if only status and status text are available */}
    </>
  );
}

export default Error;
