import { useAdminAuth } from "../hooks/index";

const WithAdminAuth = (props) => useAdminAuth(props) && props.children;

export default WithAdminAuth;
