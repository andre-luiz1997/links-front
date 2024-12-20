interface Objeto {
    [key: string]: any;
}

function removeAcentos(str: string) {
    return str.replace(/\s+/g, ' ').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}


export {};

declare global {
    interface Array<T> {
        /**
         * Ordena um array de objetos com base em uma determinada propriedade.
         * @param arr O array a ser ordenado.
         * @param key A propriedade do objeto a ser usada para ordenação.
         * @param order Ordem: 1: ASC, -1: DESC.
         * @returns O array ordenado.
         */
        orderBy(key?: string, order?: 1 | -1, key2?: string): T[];
    }
}

function getKeyValue(obj: any, key: string | string[]): any {
    if (typeof key === 'string') {
        key = key.split('.');
    }
    if (typeof obj == 'object') {
        if (key.length == 0) return obj;
        const keyAtual = key.shift();
        if (keyAtual) {
            return getKeyValue(obj[keyAtual], key);
        }
    } else {
        if (key.length == 0) return obj;
        return undefined;
    }
}

Array.prototype.orderBy = function (key?: string, order: 1 | -1 = 1, key2?: string) {
    return this.sort((a: Objeto, b: Objeto) => {
        const valorA = key ? getKeyValue(a, key) : a;
        const valorB = key ? getKeyValue(b, key) : b;
        if (typeof valorA === 'string' && typeof valorB === 'string') {
            return removeAcentos(valorA).localeCompare(removeAcentos(valorB), 'pt-BR');
        }
        if (valorA < valorB) {
            return order * -1;
        }
        if (valorA > valorB) {
            return order * 1;
        }
        const valorA2 = key2 ? getKeyValue(a, key2) : a;
        const valorB2 = key2 ? getKeyValue(b, key2) : b;
        if (typeof valorA2 === 'string' && typeof valorB2 === 'string') {
            return removeAcentos(valorA2).localeCompare(removeAcentos(valorB2), 'pt-BR');
        }

        if (valorA2 < valorB2) {
            return order * -1;
        }
        if (valorA2 > valorB2) {
            return order * 1;
        }

        return 0;
    });
};