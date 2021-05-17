declare class MiddlewareProgram {
    static handle(name: string): Promise<void>;
    private static nextStep;
    private static generateMiddleware;
}
export default MiddlewareProgram;
//# sourceMappingURL=program.d.ts.map