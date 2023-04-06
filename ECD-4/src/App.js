import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Mint from "./Mint.js";

function App() {
  return (
    <div className="p-10 bg-blue-500">
      <ConnectButton />
      <Mint />
    </div>
  );
}

export default App;