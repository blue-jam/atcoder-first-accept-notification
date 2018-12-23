export async function sleep(delay: number, result: any) {
    return new Promise(resolve => {
        setTimeout(() => resolve(result), delay);
    });
}
