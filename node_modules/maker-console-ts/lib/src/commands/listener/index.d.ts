declare class ListenerCommand {
    static handle(program: {
        command: (arg0: string) => {
            (): any;
            new (): any;
            description: {
                (arg0: string): {
                    (): any;
                    new (): any;
                    action: {
                        (arg0: (listenername: any) => void): any;
                        new (): any;
                    };
                };
                new (): any;
            };
        };
    }): Promise<void>;
}
export default ListenerCommand;
//# sourceMappingURL=index.d.ts.map