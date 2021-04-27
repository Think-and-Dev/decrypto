// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "./zeppelin/token/ERC20/ERC20BurnableUpgradeable.sol";
import "./zeppelin/token/ERC20/ERC20PausableUpgradeable.sol";
import "./zeppelin/token/ERC20/ERC20Upgradeable.sol";
import "./zeppelin/proxy/Initializable.sol";
import "./zeppelin/access/AccessControlUpgradeable.sol";
import "./zeppelin/utils/ContextUpgradeable.sol";
import "./zeppelin/math/SafeMathUpgradeable.sol";

// Remove this comment
// Context => get the sender an de data
// Access => implement and validate the rols access

contract ERC20Decrypto is
    Initializable,
    ContextUpgradeable,
    AccessControlUpgradeable,
    ERC20BurnableUpgradeable,
    ERC20PausableUpgradeable
{
    using SafeMathUpgradeable for uint256;

    /**
     * @dev Base fee to apply to a transfer
     */
    uint256 public basisPointsRate = 0;

    /**
     * @dev Minter rol
     */
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /**
     * @dev Pauser rol
     */
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    /**
     * @dev Pauser rol
     */
    bytes32 public constant FEE_ROLE = keccak256("FEE_ROLE");

    /**
     * @dev Account owner of feed
     */
    address private _ownerFee;

    /**
     * @dev Emitted when `newFeeds` are sets
     *
     */
    event FeesChange(uint256 feeBasisPoints);

    /**
     * @dev Emitted when owner fee set
     *
     */
    event OwnerFeeChange(address oldOwnerFee, address newOwnerFee);

    // /**
    //  * @dev initialize contract -- proxy
    //  */
    function initialize(
        string memory name,
        string memory symbol,
        address owner
    ) public virtual initializer {
        __ERC20Decrypto_init(name, symbol, owner);
    }

    /**
     * @dev Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE` and `PAUSER_ROLE` to the
     * account that deploys the contract.
     */

    //TODO add address admin
    function __ERC20Decrypto_init(
        string memory name,
        string memory symbol,
        address owner
    ) internal initializer {
        require(owner != address(0), "ERC20: owner coudl not be 0");
        //ini context
        __Context_init_unchained();
        //ini access control
        __AccessControl_init_unchained();
        //ini basic info erc20 -- 18 decimals
        __ERC20_init_unchained(name, symbol);
        //ini burnegable (empty)
        //TODO see if remove
        __ERC20Burnable_init_unchained();
        //ini pausable -- set pause to false
        __Pausable_init_unchained();
        //ini erc20Pausable (empty)
        //TODO see if remove
        __ERC20Pausable_init_unchained();
        //set necessary rols
        __ERC20Decrypto_init_unchained(name, symbol, owner);
    }

    /**
     * @dev Set admin, minter, fee and pauser rols by sender
     * Emit RoleAdminChanged and RoleGranted (pauser and minter)
     */

    function __ERC20Decrypto_init_unchained(
        string memory name,
        string memory symbol,
        address owner
    ) internal initializer {
        //set admin rol -- Emit RoleAdminChanged
        _setupRole(DEFAULT_ADMIN_ROLE, owner);

        //set minter, pauser and fee rol -- Emit RoleGranted
        _setupRole(MINTER_ROLE, owner);
        _setupRole(PAUSER_ROLE, owner);
        _setupRole(FEE_ROLE, owner);
    }

    /**
     * @dev Creates `amount` new tokens for `to`.
     *
     * Requirements:
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(address to, uint256 amount) public virtual {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "ERC20: must have minter role to mint"
        );
        _mint(to, amount);
    }

    /**
     * @dev Pauses all token transfers.
     *
     * Requirements:
     * - the caller must have the `PAUSER_ROLE`.
     */
    function pause() public virtual {
        require(
            hasRole(PAUSER_ROLE, _msgSender()),
            "ERC20: must have pauser role to pause"
        );
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     *
     * Requirements:
     * - the caller must have the `PAUSER_ROLE`.
     */
    function unpause() public virtual {
        require(
            hasRole(PAUSER_ROLE, _msgSender()),
            "ERC20: must have pauser role to unpause"
        );
        _unpause();
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    /**
     * @dev Set basic and max fee
     *
     * Emits a {FeesChange} event.
     * Requirements:
     * - `recipient` cannot be the zero address.
     * - the caller newBasisPoints not been mayor than 20.
     * - the caller must have the `FEE_ROLE`.
     */

    function setFee(uint256 newBasisPoints) public virtual {
        require(
            hasRole(FEE_ROLE, _msgSender()),
            "ERC20: must have fee role to setFees"
        );
        // Ensure transparency by hardcoding limit beyond which fees can never be added
        require(
            newBasisPoints < 20,
            "ERC20: newBasisPoints must not been mayor than 20"
        );
        //set new values
        basisPointsRate = newBasisPoints;
        //emit event
        FeesChange(basisPointsRate);
    }

    /**
     * @dev Set owner fee
     *
     * Emits a {OwnerFeeChange} event.
     * Requirements:
     * - `newAddressOwnerFee` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     * - the caller must have the `ADMIN_ROLE`.
     */
    function setOwnerFee(address newAddressOwnerFee) public virtual {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "ERC20: must have admin role to setOwnerFee"
        );
        // Ensure transparency by hardcoding limit beyond which fees can never be added
        require(
            newAddressOwnerFee != address(0),
            "ERC20: newAddressOwnerFee could not be 0"
        );
        //set old owner
        address oldOwner = _ownerFee;
        //set new owner
        _ownerFee = newAddressOwnerFee;
        //emit event
        OwnerFeeChange(oldOwner, _ownerFee);
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual override {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        //set fee
        uint256 fee = (amount.mul(basisPointsRate)).div(10000);
        //value - fee
        uint256 sendAmount = amount.sub(fee);
        //sub amount in sender balance
        _balances[sender] = _balances[sender].sub(
            amount,
            "ERC20: transfer amount exceeds balance"
        );
        //add sendAmount in recipent balance
        _balances[recipient] = _balances[recipient].add(sendAmount);
        //validate fee
        if (fee > 0) {
            _balances[_ownerFee] = _balances[_ownerFee].add(fee);
            Transfer(sender, _ownerFee, fee);
        }
        emit Transfer(sender, recipient, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20Upgradeable, ERC20PausableUpgradeable) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
