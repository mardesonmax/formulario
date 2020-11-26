class CPF {
    static validate(cpf) {
        const cpfLimpo = cpf.replace(/\D+/g, '');

        if (typeof cpfLimpo === "undefined") return false;
        if (cpfLimpo.length !== 11) return false;
        if (CPF.isSequence(cpfLimpo)) return false;

        const cpfParcial = cpfLimpo.slice(0, -2);
        const digito1 = CPF.digit(cpfParcial);
        const digito2 = CPF.digit(cpfParcial + digito1);

        const newCPF = cpfParcial + digito1 + digito2;

        return newCPF === cpfLimpo;
    }

    static digit(cpfParcial) {
        const cpfArray = cpfParcial.split('');
        let contador = cpfArray.length + 1;
        const total = cpfArray.reduce((ac, value) => {
            ac += (+value * contador);
            contador--;
            return ac;
        }, 0)

        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito);
    }

    static isSequence(cpf) {
        const sequencia = cpf[0].repeat(cpf.length);
        return sequencia === cpf;
    }
}

// return CPF.validate('295.405.320-86');