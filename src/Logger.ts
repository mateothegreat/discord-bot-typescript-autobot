export class Logger {

    public static log(...args: any) {

        console.log(`${ new Date().toISOString() }: ${ args }`);

    }

}
