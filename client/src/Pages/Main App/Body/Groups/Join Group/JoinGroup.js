import { styled, Box, Paper, InputBase, IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import CustomAjax from "../../../../../CustomAjax";
import { setBackButton } from "../../../../../Redux/Actions/ChangeHeaderNavigation";
import changeTitle from "../../../../../Redux/Actions/ChangeTitle";
import verifyToken from "../../../Helper Functions/verifyToken";
import JoinableGroup from './JoinableGroup'

export default function JoinGroup() {

    const [searchValue, setSearchValue] = useState('');
    const [availableGroups, setAvailableGroups] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const token = useSelector((state) => {return state.tokenState});

    verifyToken(token, history);

    dispatch(changeTitle('Join Group'));
    dispatch(setBackButton());

    const getGroups = (groupname) => {
        const data = { groupname: groupname }

        const ajax = new CustomAjax();

        ajax.post('http://localhost:2727/api/groups/join-group/search', data, true);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            setAvailableGroups(response.groups);
        });
    }

    const displayAvailableGroups = () => {
        return availableGroups.map((availableGroup) => {
            return (
                <JoinableGroup groupname={availableGroup.group_name} groupImage={availableGroup.group_picture}/>
            );
        });
    }

    return (
        <SelectableGroupsSection> 

            <SearchBar> 
                <SearchInput placeholder='Search by group name' onChange={(event) => {setSearchValue(event.target.value)}}/>
                <IconButton onClick={() => {getGroups(searchValue)}}>
                    <SearchIcon/>
                </IconButton>
            </SearchBar>

           {displayAvailableGroups()}

        </SelectableGroupsSection>
    );
}

const SelectableGroupsSection = styled(Box)({
    backgroundColor: 'black',
    textAlign: 'center',
    fontSize: '40px',
    fontWeight: 'bold',
});

const SearchBar = styled(Paper)({
    width: '50%',
    margin: '20px auto',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'white',
});

const SearchInput = styled(InputBase)({
    marginLeft: '10px',
    flex: '1'
});