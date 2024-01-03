type shutdownFunc = () => Promise<void>;
export const handleShutdown = (logic: shutdownFunc) => {
  const shutdown = async () => {
    console.log("Shutting down");
    await logic();
    process.exit(0)
  }

  process.on('SIGTERM', shutdown);
  // process.on('SIGKILL', shutdown);
  process.on('SIGINT', shutdown);
}

