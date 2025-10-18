export function getRandonNumber() {
    return new Date().getTime();
}

export function getRandonEmail() {
    return `panta-${getRandonNumber()}@test.com`
}