import Ora from "ora";
declare class BaseCommand {
    static progress(): {
        (options?: string | Ora.Options | undefined): Ora.Ora;
        promise(action: PromiseLike<unknown>, options?: string | Ora.Options | undefined): Ora.Ora;
    };
    static error<T>(err: T): Promise<void>;
    static success<T>(message: T): Promise<void>;
    static warning<T>(message: T): void;
    static checkFileExists(file: string): Promise<boolean>;
    static checkFolderExists(name: string): boolean;
}
export default BaseCommand;
//# sourceMappingURL=baseCommand.d.ts.map