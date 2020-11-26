class Form {
    constructor() {
        this.form = document.querySelector('.form');
        this.input = this.form.querySelectorAll('input');
        this.inputStyle();
        this.eventos();
    }

    inputStyle() {

        this.input.forEach((input) => {
            function verifiClass(e) {
                const parent = e.target.parentElement;

                if (e.target.value) return;

                parent.classList.toggle("remove");
            }

            input.addEventListener("focusin", e => {
                verifiClass(e);
            });

            input.addEventListener("focusout", e => {
                verifiClass(e);
            });
        });
    }

    eventos() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();

            this.chekForm();
        });
    }

    //Checando se pode enviar o formulário
    chekForm() {
        for (let small of this.form.querySelectorAll('.input-error')) {
            small.remove();
        }

        if (this.isValid() && this.checkPass()) {
            alert('Formulário enviado...');
            this.form.submit();
        }
    }

    //Gerando nova mensagem de erro
    newError(campo, msg) {
        const parent = campo.parentElement;
        const small = document.createElement('small');
        small.innerHTML = msg;
        small.classList.add('input-error');
        parent.append(small);
    }

    //Contando os caracteres
    caracter(campo, label) {
        let valid = true;
        if (campo.value.length < 3) {
            this.newError(campo, `"${label}" deve conter no mínimo 3 caracteres.`);
            valid = false;
        }
        return valid;
    }

    //Verificando se as senhas são iguais
    checkPass() {
        let valid = true;
        const senha = this.form.querySelector('#senha');
        const repSenha = this.form.querySelector('#rep-senha');

        if (senha.value !== repSenha.value) {
            this.newError(senha, 'Senhas diferentes.');
            this.newError(repSenha, 'Senhas direfentes.');
            valid = false;
        }
        return valid;
    }

    isValid() {
        let valid = true;

        this.input.forEach(input => {
            const parent = input.parentElement;
            const label = parent.querySelector('label').innerText;

            if (!input.value) {
                this.newError(input, `"${label}" não pode esta vazio.`);
                valid = false;
            }

            if (input.name === 'cpf') {
                const isValidCPF = CPF.validate(input.value);

                if (!isValidCPF) {
                    this.newError(input, `"${label}" esta inválido.`);
                    valid = false;
                }
            }

            if (input.name === 'nome') valid = this.caracter(input, label);
            if (input.name === 'sobrenome') valid = this.caracter(input, label);
            if (input.name === 'usuario') valid = this.caracter(input, label);
            if (input.name === 'senha') valid = this.caracter(input, label);
        })

        return valid;
    }
}

const form = new Form();