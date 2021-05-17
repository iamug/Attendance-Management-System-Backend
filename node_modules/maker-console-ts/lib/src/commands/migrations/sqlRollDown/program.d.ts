declare class SqlRollDownProgram {
    static handle(name: string): Promise<void>;
    private static undoLastMigraation;
    /**
     * Undo the specified migration that was run
     * @param {String} name
     */
    private static undoSpecifiedMigration;
}
export default SqlRollDownProgram;
//# sourceMappingURL=program.d.ts.map