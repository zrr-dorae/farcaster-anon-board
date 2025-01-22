import { ContextType, useMiniAppContext } from "@/hooks/use-miniapp-context";
import dynamic from "next/dynamic";
import { SafeAreaInsets } from "@/types";

const Demo = dynamic(() => import("@/components/Home"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

interface SafeAreaContainerProps {
  children: React.ReactNode;
  insets?: SafeAreaInsets;
}

const SafeAreaContainer = ({ children, insets }: SafeAreaContainerProps) => (
  <main
    className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3"
    style={{
      marginTop: insets?.top ?? 0,
      marginBottom: insets?.bottom ?? 0,
      marginLeft: insets?.left ?? 0,
      marginRight: insets?.right ?? 0,
    }}
  >
    {children}
  </main>
);

export default function Home() {
  const { type: contextType, context } = useMiniAppContext();
  return contextType === ContextType.Farcaster ? (
    <SafeAreaContainer insets={context.client.safeAreaInsets}>
      <Demo />
    </SafeAreaContainer>
  ) : (
    <SafeAreaContainer>
      <Demo />
    </SafeAreaContainer>
  );
}
