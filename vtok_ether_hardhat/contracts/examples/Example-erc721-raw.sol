pragma solidity ^0.8.0;

interface IERC165 {
    function supportInterface(bytes4 interfaceID) external view returns (bool);
}

interface IERC721 is IERC165 {
    function balanceOf(address owner) external view returns (uint balance);

    function ownerOf(uint tokenId) external view returns (address owner);

    function safeTransferFrom(address from, address to, uint tokenId) external;

    function safeTransferFrom(address from, address to, uint tokenId, bytes calldata data) external;

    function TransferFrom(address from, address to, uint tokenId) external;

    function approve(address to, uint tokenId) external;

    function getApproved(uint tokenId) external view returns (address operator);

    function setApprovalForAll(address operator, bool _approved) external;

    function isApprovedForAll(address owner, address operator) external view returns (bool);
}

interface IERC721Receiver {
    function onERC721Received(address operator, address from, uint tokenId, bytes calldata data)
            external returns (bytes4);
}

library Address {
    function isContract(address account) internal view returns (bool) {
        uint size;
        assembly {
            size := extcodesize(account)
        }

        return size > 0;
    }
}

contract ERC721 is IERC721 {
    using Address for address;

    event Transfer(address indexed form, address indexed to, uint indexed tokenId);
    event Approval(address indexed owner, address indexed operator, uint indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    // TokenID -> Owner address
    mapping(uint => address) private _owners;

    // owner addresss -> Token Blaance
    mapping(address => uint) private _balances;

    // tokenID -> approval address
    mapping(uint => address) private _tokenApprovals;

    // setApprovalForAll를 통해서 셋팅 
    // addr1 -> approve addr에게 궈한 부여
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    function supportInterface(bytes4 interfaceId) external pure override returns (bool) {

        return interfaceId == type(IERC721).interfaceId ||
                interfaceId == type(IERC165).interfaceId;
    }

    function balanceOf(address owner) external view override returns (uint) {
        require(owner != address(0), "onwer = zero address");
        return _balances[owner];
    }

    function ownerOf(uint tokenId) external override view returns (address owner) {
        owner = _owners[tokenId];
        require(owner != address(0), "token doesn't exists");

        return owner;
    }

    function isApprovedForAll(address owner, address operator) external view override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    function setApprovalForAll(address operator, bool approved) external override {
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function getApproved(uint tokenId) external view override returns (address) {
        require(_owners[tokenId] != address(0), "token doesn't exist");
        return _owners[tokenId];
    }

    function _approve(address owner, address to, uint tokenId) private {
        _tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }

    function approve(address to, uint tokenId) external override {
        address owner = _owners[tokenId];
        require(msg.sender == owner || _operatorApprovals[owner][msg.sender],
                "not owner nor approved for all");

        _approve(msg.sender, to, tokenId);
    }

    function _isApprovedOrOwner(address owner, address spender, uint tokenId) private view returns (bool) {
        return (spender == owner ||
                _tokenApprovals[tokenId] == spender ||
                _operatorApprovals[owner][spender]);
    }

    function _transfer(address owner, address from, address to, uint tokenId) private {
        require(from == owner, "not owner");
        require(to != address(0), "transfer to the zero address");

        // approve 권한 해체
        _approve(owner, address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function TransferFrom(address from, address to, uint tokenId) external override {
        address owner = this.ownerOf(tokenId);
        require(
            _isApprovedOrOwner(owner, msg.sender, tokenId),
            "not owner nor approved"
        );

        _transfer(owner, from, to, tokenId);
    }

    function _checkOrERC721Received(address from, address to, uint tokenId, bytes memory _data)
            private returns (bool) {

        if(to.isContract()) {
            return IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, _data)
                == IERC721Receiver.onERC721Received.selector;
        }
        else {
            return true;
        }
    }

    function _safeTransfer(address owner, address from, address to, uint tokenId, bytes memory _data) private {
        _transfer(owner, from, to, tokenId);
        require(_checkOrERC721Received(from, to, tokenId, _data), "not ERC721Receiver");
    }

    function safeTransferFrom(address from, address to, uint tokenId, bytes memory _data)
        public override {
        
        address owner = this.ownerOf(tokenId);
        require(
            _isApprovedOrOwner(owner, msg.sender, tokenId), 
            "not owner nor approved"
        );

        _safeTransfer(owner, from, to, tokenId, _data);
    }

    function safeTransferFrom(address from, address to, uint tokenId) external override {
        safeTransferFrom(from, to, tokenId, "");
    }

    function mint(address to, uint tokenId) external {
        require(to != address(0), "mint to zero address");
        require(_owners[tokenId] == address(0), "token already minted");

        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);
    }

    function burn(uint tokenId) external {
        address owner = _owners[tokenId];

        _approve(owner, address(0), tokenId);
        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }
}