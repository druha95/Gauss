function gauss(a, b) {

    var arrays = {
        matrixA:[],
        vectorsB:[]
    };


    for(var k=0; k< b.length; k++){
        var max = k;
        for(var i= k+1; i< b.length; i++)
            if(Math.abs(a[i][k])>Math.abs(a[max][k]))
                max =i;

        var tem = a[k];
        a[k] = a[max];
        a[max] = tem;

        var t = b[k];
        b[k] = b[max];
        b[max] = t;

        for(var i = k+1; i< b.length; i++) {
            var factor = a[i][k] / a[k][k];
            b[i] -= factor*b[k];
            for(var j =k; j< b.length; j++){
                a[i][j] -= factor * a[k][j];
                if(isNaN(a[i][j])) {
                    return -1;
                }

            }

            arrays.matrixA.push(copyMatrix(a));
            arrays.vectorsB.push(copyVector(b));
function copyMatrix(matrix) {
    var nm = [];

    for(var i = 0; i < matrix.length; ++i) {
        nm[i] = [];

        for(var j = 0; j < matrix[i].length; ++j) {
            nm[i][j] = matrix[i][j];
        }
    }

    return nm;
}
        }


    }

    arrays.solution = [];
    for(var i = b.length-1; i>=0; i--) {
        var sum = 0;
        for(var j = i+1; j< b.length; j++)
            sum +=a[i][j] * arrays.solution[j];
        arrays.solution[i] = (b[i] - sum)/a[i][i];
    }
    for(var i = 0; i< b.length; i++){
        if(isNaN(arrays.solution[i])){
            return -1;
        }
    }


    return arrays;

}

function copyMatrix(matrix) {
    var nm = [];

    for(var i = 0; i < matrix.length; ++i) {
        nm[i] = [];

        for(var j = 0; j < matrix[i].length; ++j) {
            nm[i][j] = matrix[i][j];
        }
    }

    return nm;
}1

function copyVector(vector){
    var nm = [];

    for(var i =0; i<vector.length; i++){
        nm[i] = vector[i];
    }
}

