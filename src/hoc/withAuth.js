import { useAuth } from "../hooks/index";

const WithAuth = (props) => useAuth(props) && props.children;

export default WithAuth;
