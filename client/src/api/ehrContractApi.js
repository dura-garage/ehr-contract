import { ethers } from "ethers";

import ehrArtifact from "../constants/ehr.json";
import contractAddress from "../constants/contract-address.json";


const provider = new ethers.providers.Web3Provider(
    window.ethereum
);

// for get functions
const ehr = new ethers.Contract(
    contractAddress.ehr,
    ehrArtifact.abi,
    provider
);

// for external functions
const signer = provider.getSigner()
const contractMethod = new ethers.Contract(
    contractAddress.ehr,
    ehrArtifact.abi,
    signer
)

export { ehr, contractMethod };
