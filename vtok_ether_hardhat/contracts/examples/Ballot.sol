//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Ballot {

    struct Voter {
        uint weight;
        uint vote;
        bool voted;
        address delegate;
    }

    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    address public chairperson;

    // 맵핑
    mapping(address => Voter) public voters;

    // 동적 배열
    Proposal[] public proposal;
    
    /*
    function Ballot(byte32[] proposalNames) public {

    }
    */

    function giveRightToVote(address _voter) public {
        // msg.sender가 charperson
        // voted가 false (투표 한적이 없어야 한다)
        // weight가 0이여야 한다.
        require(
            (msg.sender == chairperson) &&
            (voters[_voter].voted == false) &&
            (voters[_voter].weight == 0)
        );

        voters[_voter].weight = 1;
    }

    function delegate(address _to) public {

    }
}