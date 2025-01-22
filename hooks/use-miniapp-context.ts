import { useFrame } from "../components/farcaster-provider";
import { MiniKit } from "@worldcoin/minikit-js";
import { FrameContext } from "@farcaster/frame-core/dist/context";

export enum ContextType {
  Farcaster = "farcaster",
  Worldcoin = "worldcoin",
}

// Define specific types for each context
interface FarcasterContextResult {
  type: ContextType.Farcaster;
  context: FrameContext;
}

interface WorldcoinContextResult {
  type: ContextType.Worldcoin;
  context: MiniKit;
}

interface NoContextResult {
  type: null;
  context: null;
}

// Union type of all possible results
type ContextResult =
  | FarcasterContextResult
  | WorldcoinContextResult
  | NoContextResult;

export const useMiniAppContext = (): ContextResult => {
  // Try to get Farcaster context
  try {
    const farcasterContext = useFrame();
    if (farcasterContext.context) {
      return {
        type: ContextType.Farcaster,
        context: farcasterContext.context,
      } as FarcasterContextResult;
    }
  } catch (e) {
    // Ignore error if not in Farcaster context
  }

  // Check for Worldcoin/MiniKit context
  if (typeof window !== "undefined" && MiniKit.isInstalled()) {
    return {
      type: ContextType.Worldcoin,
      context: MiniKit,
    } as WorldcoinContextResult;
  }

  // No context found
  return {
    type: null,
    context: null,
  } as NoContextResult;
};
