type shutdownFunc = () => Promise<void>;
export declare const handleShutdown: (logic: shutdownFunc) => void;
export {};
