declare class SqlRollUpProgram {
    static handle(name: string): Promise<void>;
    private static runNextMigration;
    /**
     * Run the specified migration that has not yet been run
     * @param {String} name
     */
    private static runSpecifiedMigration;
}
export default SqlRollUpProgram;
//# sourceMappingURL=program.d.ts.map