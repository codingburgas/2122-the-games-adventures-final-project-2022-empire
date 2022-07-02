import { useStateIfMounted } from "use-state-if-mounted";

function Failback() {
  const [showLoader, setShowLoader] = useStateIfMounted(false);

  setTimeout(() => {
    setShowLoader(true);
  }, 100);

  if (showLoader) {
    return <h1>Loading</h1>;
  } else {
    return <></>;
  }
}

export default Failback;
