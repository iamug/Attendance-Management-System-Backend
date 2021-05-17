declare class SqlRollUpCommand {
    static handle(program: {
        command: (arg0: string) => {
            (): any;
            new (): any;
            alias: {
                (arg0: string): {
                    (): any;
                    new (): any;
                    description: {
                        (arg0: string): {
                            (): any;
                            new (): any;
                            action: {
                                (arg0: (migrationName: string) => void): any;
                                new (): any;
                            };
                        };
                        new (): any;
                    };
                };
                new (): any;
            };
        };
    }): Promise<void>;
}
export default SqlRollUpCommand;
//# sourceMappingURL=index.d.ts.map