const { buildModule } = require("@nomicfoundation/ignition-core");

module.exports = buildModule("MyTokenAndStaking", (m) => {
  const initialSupply = m.getParameter("initialSupply", "1000000000000000000000000"); // 1,000,000 MTK (18 decimals)
  const myToken = m.contract("MyToken", [initialSupply]);
  const staking = m.contract("Staking", [myToken]);
  return { myToken, staking };
}); 