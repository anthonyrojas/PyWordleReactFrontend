import React, {useContext, useEffect} from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { fetchUserProfile } from '../../Actions/AuthActions';
import ProfileAttributeDisplay from './ProfileAttributeDisplay';

type Props = {}

export default function Profile({}: Props) {
    const attributeNames=["FirstName", "LastName", "Email", "ID"];
    const {globalState, dispatch} = useContext(AuthContext);
    useEffect(() => {
        // fetch the profile
        fetchUserProfile(dispatch);
    }, [])
    return (
        <div className="w-full my-4 flex flex-row flex-wrap justify-center content-center items-center justify-items-center">
            <ProfileAttributeDisplay 
                loading={globalState.fetchingUser}
                attributeName='Username'
                attributeValue={globalState.profile?.Username}
            />
            {
                attributeNames.map((attrName, i) => {
                    return(
                        <ProfileAttributeDisplay 
                            loading={globalState.fetchingUser}
                            attributeName={attrName}
                            attributeValue={globalState.profile?.UserAttributes[attrName]}
                        />
                    )
                })
            }
        </div>
    )
}