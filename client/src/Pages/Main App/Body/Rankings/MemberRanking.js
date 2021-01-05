import { Box, styled, Typography } from '@material-ui/core';

export default function MemberRanking(props) {

    return (
        <MemberRankingBody>
            <RankingNumber>
                {props.rankingNumber}.
            </RankingNumber>

            <MemberDetailsSection>
                <MemberUserName>
                    {props.username}
                </MemberUserName>
                <MemberLevel>
                    Level {props.level} ({props.points} points)
                </MemberLevel>
            </MemberDetailsSection>
        </MemberRankingBody>
    );
}

const MemberRankingBody = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center'
});

const RankingNumber = styled(Typography)({
    color: 'white',
    margin: '30px',
    fontSize: '20px',
    fontWeight: 'bold'
});

const MemberDetailsSection = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    margin: '30px'
});

const MemberUserName = styled(Typography)({
    color: 'white',
    fontSize: '20px'
});

const MemberLevel = styled(Typography)({
    color: 'green'
});