declare class Console {
    /**
     * Run Maker commands
     * @param {Array} commands
     * @param {Array} kernel
     */
    static run(commands: any, kernel: any): Promise<void>;
    checkCommandName(name: string): void;
    private static processMakerCommands;
    private static processUserCommand;
    private static buildCommandWithArguments;
    private static checkCommadsLength;
    private static checkKernelLength;
}
export default Console;
//# sourceMappingURL=index.d.ts.map