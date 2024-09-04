

import { useContext } from "react";
import { GlobalUserContext } from "../App";
export default function CandidateDashboardPage(){
    const globalUser = useContext(GlobalUserContext);

    return(

        <>
            <h1>Candidate Dashboard Page</h1>
            <pre>globalUser: {JSON.stringify(globalUser.globalUser.data.userId)}</pre>

        </>
    );

}