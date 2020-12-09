import { styled, Box, Avatar, Typography, Paper, InputBase, IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'
import { useEffect, useState } from "react";

export default function JoinGroup(props) {

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        props.setTitle('Join Group');
        props.setBackButtonNav(true);
    });

    const searchGroupName = (groupname) => {
        // database stuff here
    }

    return (
        <SelectableGroupsSection> 

            <SearchBar> 
                <SearchInput placeholder='Search by group name' onChange={(event) => {setSearchValue(event.target.value)}}/>
                <IconButton onClick={() => {searchGroupName(searchValue)}}>
                    <SearchIcon/>
                </IconButton>
            </SearchBar>

            <GroupIcon src='/images/group-icons/image.png'>
            </GroupIcon>
            <GroupName>
                Group Name
            </GroupName>

            <GroupIcon src='/images/group-icons/image.png'>
            </GroupIcon>
            <GroupName>
                Group Name
            </GroupName>

            <GroupIcon src='/images/group-icons/image.png'>
            </GroupIcon>
            <GroupName>
                Group Name
            </GroupName>

        </SelectableGroupsSection>
    );
}

const SelectableGroupsSection = styled(Box)({
    backgroundColor: 'black',
    textAlign: 'center',
    fontSize: '40px',
    fontWeight: 'bold',
});

const GroupIcon = styled(Avatar)({
    margin: '20px auto',
    height: '250px',
    width: '250px',
    display: 'flex',
    flexDirection: 'column',
});

const GroupName = styled(Typography)({
    marginBottom: '50px',
    color: 'white',
    fontSize: '30px',
    fontWeight: 'bold'
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