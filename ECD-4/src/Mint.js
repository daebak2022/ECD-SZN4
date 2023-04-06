import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "./abi.json";

export default function Mint() {
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: "0xe1d02a0b38d34ef2ada0c1d1c8a4db4da77ec507",
    abi: abi,
    functionName: "safeMint",
    args: [address],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <button className="border border-black px-4 py-2 mt-2" onClick={write}>
      Mint
    </button>
  );
}