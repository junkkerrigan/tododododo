import { db } from "@/src/db";
import { App } from "@/src/components/App/App";
import { EssentialsContextProvider } from "@/src/contexts/EssentialsContext";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default async function Home() {
  const todos = await db.todo.findMany();

  return (
    <EssentialsContextProvider>
      <App todos={todos} />
    </EssentialsContextProvider>
  );
}
