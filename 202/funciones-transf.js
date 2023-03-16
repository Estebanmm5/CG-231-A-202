/**
 * Traslacion: Construye la matriz de traslacion THREEJS para el vector de traslacion vt y la retorna
 * ENTRADAS: vt = Vector de traslacion (arreglo de enteros)
 * SALIDAS: matrizT = Matriz de traslacion 
 */
function Traslacion(vt){
    var matrizT = new THREE.Matrix4();
    matrizT.set(1, 0, 0, vt[0],
            0, 1, 0, vt[1],
            0, 0, 1, vt[2],
            0, 0, 0, 1);
        
    return matrizT;
}
/**
 * rotacion: Construye la matriz de rotacion THREEJS y la retorna
 * ENTRADAS: ar = angulo de rotacion (entero)
 *          eje = eje sobre el que rota la figura (string) 
 * SALIDAS: Matriz de rotacion 
 */
function rotacion(ar, eje){
    var matrizR = new THREE.Matrix4();
    let rad = ar * Math.PI / 180;
    [cs, sn] = [Math.cos(rad), Math.sin(rad)];
    switch(eje){
        case 'y':
		matrizR.set(cs,  0, sn, 0,
        		0, 1, 0, 0, 
				-sn, 0, cs, 0,
				0, 0, 0, 1);
                return matrizR;
                break;
        case 'x':
            matrizR.set(1, 0, 0, 0,
                0, cs, -sn, 0,
                0, sn, cs, 0,
                0, 0, 0, 1);
                return matrizR;
                break;
        case 'z':
            matrizR.set(cs, -sn, 0, 0,
                sn, cs, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);
                return matrizR;
                break;  
    }      
}
/**
 * RotacionReal: Aplica el angulo de rotación ar al objeto fig
 * ENTRADAS: fig = objeto tipo THREE.LINE que representa el objeto grafico
 *           posini = posicion inicial de fig
 *           ar = angulo de rotacion (entero)
 *           eje = eje sobre el que rota fig (string)
 * SALIDAS: objeto rotado
 */
function RotacionReal(fig, posini, ar, eje){
    tr = [-posini[0], -posini[1], -posini[2]]; //vector para llevar al origen
    fig.applyMatrix(Traslacion(tr));//traslacion al origen
    switch (eje){
        case 'y': fig.applyMatrix(rotacion(ar, 'y'));
                break;
        case 'x': fig.applyMatrix(rotacion(ar, 'x'));
                break;
        case 'z': fig.applyMatrix(rotacion(ar, 'z'));
                break;
    }
    fig.applyMatrix(Traslacion(posini));//traslacion a posicion inicial
}
/**
 * Escalado: Construye la matriz de escalado THREEJS para el vector vs y la retorna
 * ENTRADAS: vs = Vector de Escalado (arreglo de enteros)
 * SALIDAS: matrizS = Matriz de Escalado
 */
function Escalado(vs) {
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
            0, vs[1], 0, 0,
            0, 0, vs[2], 0,
            0, 0, 0, 1);
    return matrizS;

}
/**
 * EscaladoReal: Aplica el vector de Escalado vs al objeto fig
 * ENTRADAS: fig = objeto tipo THREE.LINE que representa el objeto grafico
 *           posini = posicion inicial de fig
 *           vs = Vector de Escalado (arreglo de enteros)

 * SALIDAS: objeto escalado
 * 
 */
function EscaladoReal(fig, posini, vs){
    tr = [-posini[0], -posini[1], -posini[2]]; //vector para llevar al origen
    fig.applyMatrix(Traslacion(tr));//traslacion al origen
    fig.applyMatrix(Escalado(vs)); //escalado de la figura
    fig.applyMatrix(Traslacion(posini));//traslacion a posicion inicial
}




