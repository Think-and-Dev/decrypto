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
    address public addressFee;

    /**
     * @dev Multiplier for Split
     */
    uint256 public splitMultiplier = 1;

    /**
     * @dev Divider for Split
     */
    uint256 public splitDivider = 1;

    /**
     * @dev Emitted when `newFeeds` are sets
     *
     */
    event FeesChange(uint256 oldFeeBasisPoints, uint256 feeBasisPoints);

    /**
     * @dev Emitted when owner fee set
     *
     */
    event AddressFeeChange(address oldOwnerFee, address newOwnerFee);

    /**
     * @dev Emitted when apply split
     *
     */
    event SplitChange(
        uint256 oldSplitMultiplier,
        uint256 newSplitMultiplier,
        uint256 oldSplitDivider,
        uint256 newSplitDivider
    );

    /**
     * @dev initialize contract -- proxy
     */
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
        addressFee = owner;
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
        uint256 splitValue = _underlyingValue(amount);
        _mint(to, splitValue);
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
     * @dev Set basic and max fee
     *
     * Emits a {FeesChange} event.
     * Requirements:
     * - `recipient` cannot be the zero address.
     * - the caller newBasisPoints not been mayor than 1000 (10%).
     * - the caller must have the `FEE_ROLE`.
     */

    function setFee(uint256 newBasisPoints) public virtual {
        require(
            hasRole(FEE_ROLE, _msgSender()),
            "ERC20: must have fee role to setFees"
        );
        // Ensure transparency by hardcoding limit beyond which fees can never be added
        require(
            newBasisPoints < 1000,
            "ERC20: newBasisPoints must not been mayor than 1000"
        );
        //set old basisPointRate
        uint256 oldBasisPointRate = basisPointsRate;
        //set new values
        basisPointsRate = newBasisPoints;
        //emit event
        emit FeesChange(oldBasisPointRate, basisPointsRate);
    }

    /**
     * @dev Set owner fee
     *
     * Emits a {AddressFeeChange} event.
     * Requirements:
     * - `newAddressFee` cannot be the zero address.
     * - the caller must have the `ADMIN_ROLE`.
     */
    function setAddressFee(address newAddressFee) public virtual {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "ERC20: must have admin role to setOwnerFee"
        );
        // Ensure transparency by hardcoding limit beyond which fees can never be added
        require(
            newAddressFee != address(0),
            "ERC20: newAddressFee could not be 0"
        );
        //set old owner
        address oldOwner = addressFee;
        //set new owner
        addressFee = newAddressFee;
        //emit event
        emit AddressFeeChange(oldOwner, addressFee);
    }

    /**
     * @dev Set split
     *
     * Emits a {SplitChange} event.
     * Requirements:
     * - the caller must have the `ADMIN_ROLE`.
     */
    function split() public virtual {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "ERC20: must have admin role to split"
        );
        _setSplit(splitMultiplier.mul(2), splitDivider);
    }

    /**
     * @dev Set halve split
     *
     * Emits a {SplitChange} event.
     * Requirements:
     * - the caller must have the `ADMIN_ROLE`.
     */
    function reverseSplit() public virtual {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "ERC20: must have admin role to reverseSplit"
        );
        _setSplit(splitMultiplier, splitDivider.mul(2));
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return _formattedValue(_balances[account]);
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return _formattedValue(_allowances[owner][spender]);
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue)
        public
        virtual
        override
        returns (bool)
    {
        // uint256 splitValue = _underlyingValue(addedValue);
        uint256 formattedValue =
            _formattedValue(_allowances[_msgSender()][spender]);
        _approve(
            _msgSender(),
            spender,
            formattedValue.add(addedValue)
            // _allowances[_msgSender()][spender].add(splitValue)
        );
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue)
        public
        virtual
        override
        returns (bool)
    {
        // uint256 splitValue = _underlyingValue(subtractedValue);
        uint256 formattedValue =
            _formattedValue(_allowances[_msgSender()][spender]);

        _approve(
            _msgSender(),
            spender,
            formattedValue.sub(
                subtractedValue,
                "ERC20: decreased allowance below zero"
            )
        );
        return true;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return _formattedValue(_totalSupply);
    }

    /**
     * @dev Destroys `amount` tokens from the caller.
     *
     * See {ERC20-_burn}.
     */
    function burn(uint256 amount) public virtual override {
        uint256 splitAmount = _underlyingValue(amount);
        _burn(_msgSender(), splitAmount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     *
     * See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     */
    function burnFrom(address account, uint256 amount) public virtual override {
        uint256 udnerlyingAmount = _underlyingValue(amount);
        uint256 decreasedAllowance =
            allowance(account, _msgSender()).sub(
                amount,
                "ERC20: burn amount exceeds allowance"
            );
        //TODO send approv with out underlying
        _approve(account, _msgSender(), decreasedAllowance);
        _burn(account, udnerlyingAmount);
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * Requirements:
     *
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        _transfer(sender, recipient, amount);
        uint256 underlyingAmount = _underlyingValue(amount);
        uint256 formattedAmount =
            _formattedValue(
                _allowances[sender][_msgSender()].sub(
                    underlyingAmount,
                    "ERC20: transfer amount exceeds allowance"
                )
            );
        _approve(sender, _msgSender(), formattedAmount);
        return true;
    }

    /**
     * @dev Get the underlying value of the split
     *
     */
    function _underlyingValue(uint256 value) internal view returns (uint256) {
        return value.mul(splitDivider).div(splitMultiplier);
    }

    /**
     * @dev Get the formatted value of the split
     *
     */
    function _formattedValue(uint256 value) internal view returns (uint256) {
        return value.mul(splitMultiplier).div(splitDivider);
    }

    /**
     * @dev Set split divider and multiplier
     *
     * Emits a {SplitChange} event.
     * Requirements:
     * - `newSplitMultiplier` cannot be the zero.
     * - `newSplitDivider` cannot be the zero.
     * - the caller must have the `ADMIN_ROLE`.
     */
    function _setSplit(uint256 newSplitMultiplier, uint256 newSplitDivider)
        public
        virtual
    {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "ERC20: must have admin role to _setSplit"
        );
        // Ensure transparency by hardcoding limit beyond which fees can never be added
        require(
            newSplitMultiplier != 0,
            "ERC20: newSplitMultiplier could not be 0"
        );
        require(newSplitDivider != 0, "ERC20: newSplitDivider could not be 0");
        //set old owner
        uint256 oldMultiplier = splitMultiplier;
        uint256 oldDivider = splitDivider;
        //set new owner
        splitMultiplier = newSplitMultiplier;
        splitDivider = newSplitDivider;
        //emit event
        emit SplitChange(
            oldMultiplier,
            newSplitMultiplier,
            oldDivider,
            newSplitDivider
        );
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

        //calculate unerlying amount
        uint256 splitAmount = _underlyingValue(amount);
        //set fee
        uint256 fee = (splitAmount.mul(basisPointsRate)).div(10000);
        //value - fee
        uint256 sendAmount = splitAmount.sub(fee);
        //sub amount in sender balance
        _balances[sender] = _balances[sender].sub(
            splitAmount,
            "ERC20: transfer amount exceeds balance"
        );
        //add sendAmount in recipent balance
        _balances[recipient] = _balances[recipient].add(sendAmount);
        //validate fee
        if (fee > 0) {
            _balances[addressFee] = _balances[addressFee].add(fee);
            emit Transfer(sender, addressFee, fee);
        }
        emit Transfer(sender, recipient, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20Upgradeable, ERC20PausableUpgradeable) {
        uint256 splitAmount = _underlyingValue(amount);
        super._beforeTokenTransfer(from, to, splitAmount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual override {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        uint256 splitAmount = _underlyingValue(amount);
        _allowances[owner][spender] = splitAmount;
        emit Approval(owner, spender, amount);
    }
}
