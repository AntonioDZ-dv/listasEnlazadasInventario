class Producto {
    constructor(codigo, nombreProducto, cantidad, costo) {
        this.codigo = codigo;
        this.nombreProducto = nombreProducto;
        this.cantidad = cantidad;
        this.costo = costo;
        this.sig = null; 
    }

    info() {
        return "Codigo: " + this.codigo + ", Producto: " + this.nombreProducto + ", Cantidad: " + this.cantidad + ", Costo: " + this.costo;
    }

    infoHtml() {
        return `
            <div class="producto-card" style="border: 1px solid #ccc; margin: 5px 0; padding: 5px;">
                <p><strong>Código:</strong> ${this.codigo} | <strong>Producto:</strong> ${this.nombreProducto} | <strong>Cantidad:</strong> ${this.cantidad} | <strong>Costo:</strong> $${this.costo}</p>
            </div>
        `;
    }
}

class Inventario {
    constructor() {
        this.primero = null;
    }

    agregate(nuevo, otroNodo) {
        if (otroNodo.sig == null)
            otroNodo.sig = nuevo;
        else
            this.agregate(nuevo, otroNodo.sig);
    }

    agregar(nuevo) {
        if (this.primero == null)
            this.primero = nuevo;
        else
            this.agregate(nuevo, this.primero);
    }

    agregarInicio(nuevo) {
        nuevo.sig = this.primero;
        this.primero = nuevo;
    }

    insertar(nuevo, posicion) {
        if (posicion <= 0 || this.primero == null) {
            this.agregarInicio(nuevo);
            return;
        }

        let aux = this.primero;
        let index = 0;

        while (aux.sig != null && index < posicion - 1) {
            aux = aux.sig;
            index++;
        }

        nuevo.sig = aux.sig;
        aux.sig = nuevo;
    }

    buscar(codigo) {
        let aux = this.primero;
        while (aux != null) {
            if (aux.codigo == codigo) {
                return aux;
            }
            aux = aux.sig;
        }
        return null;
    }

    eliminar(codigo) {
        if (this.primero == null) return null;

        if (this.primero.codigo == codigo) {
            let eliminado = this.primero;
            this.primero = this.primero.sig;
            eliminado.sig = null;
            return eliminado;
        }

        let aux = this.primero;
        while (aux.sig != null) {
            if (aux.sig.codigo == codigo) {
                let eliminado = aux.sig;
                aux.sig = aux.sig.sig;
                eliminado.sig = null;
                return eliminado;
            }
            aux = aux.sig;
        }
        return null;
    }

    extraerPrimero() {
        if (this.primero == null) {
            return null;
        }
        let aux = this.primero;
        this.primero = this.primero.sig;
        aux.sig = null;
        return aux;
    }

    listar() {
        let aux = this.primero;
        let resultado = "";
        while (aux != null) {
            resultado += aux.infoHtml();
            aux = aux.sig;
        }
        return resultado;
    }

    listarInverso() {
        let aux = this.primero;
        let arr = [];
        while (aux != null) {
            arr.push(aux);
            aux = aux.sig;
        }

        let resultado = "";
        for (let i = arr.length - 1; i >= 0; i--) {
            resultado += arr[i].infoHtml();
        }
        return resultado;
    }
}