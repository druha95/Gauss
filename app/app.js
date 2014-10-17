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

function copyVector(vector){
    var nm = [];

    for(var i =0; i<vector.length; i++){
        nm[i] = vector[i];
    }

    return nm;
}

$(document).ready(function(){

    window.tmp = 0;

    $(".buttonForCreating").on('click', function() {
        $("#answers").html("");
        $('#inputData').html("");
        var rows = $("#countOfRows").val();
        rows = parseInt(rows);
        if(isNaN(rows)){
            $("#answers").append($("<div />").html("Sorry, it is not a number").addClass("text-warning lead"));
            $('.results').css("display","none");
            return false;
        }
        if(rows<2){
            rows = 2;
        }
        if(rows >7){
            rows = 7;
        }
        window.tmp = rows;


        var table = $('<table />');
        for(var i = 0; i<rows; i++){
            var tr = $('<tr />');
            for(var j=0; j<rows+2; j++) {
                var td = $('<td />');
                if(j==rows){
                    td.append($("<div />").addClass("divide"));
                }
                else{
                    var input = $('<input />').addClass("coeficients"+i).attr("value", "1");
                    if(j== rows+1){
                        input.addClass("coeficients"+(rows+1));
                    }
                    td.append(input);
                }


                tr.append(td);
            }
            table.append(tr);
        }
        $('#inputData').append(table);
        $('.results').css("display","block") ;
    });






    $(".results")[0].addEventListener('click', function() {
        $("#answers").html("");
        var matrix = new Array();
        for(var i =0; i<window.tmp; i++){
            matrix[i] = new Array();
            var j=0;
            var name = ".coeficients"+ i;
            $(name).each(function() {
                matrix[i][j] = $(this).val();
                j++;

            });
        }

        for(var i=0; i<window.tmp; i++){
            for(var j=0; j<window.tmp; j++){
                matrix[i][j] = parseFloat(matrix[i][j]);
                if(isNaN(matrix[i][j])){
                    $("#answers").append($("<div />").html("Sorry, it is not a number").addClass("text-warning lead"));
                    return false;
                }
            }
        }

        var vectorB = new Array();
        var number = window.tmp+1;
        var name = ".coeficients" + number;
        var k=0;

        $(name).each(function(){
            vectorB[k] = $(this).val();
            k++;
        });

        for(var i =0; i<window.tmp; i++){
            vectorB[i] = parseFloat(vectorB[i]);
            if(isNaN(vectorB[i])){
                $("#answers").append($("<div />").html("Sorry, it is not a number").addClass("text-warning lead"));
                $('.results').css("display","none");
                return false;
            }
        }

        var nm = copyMatrix(matrix);
        var nv = copyVector(vectorB);
        var obj = gauss(nm, nv);
        if(obj == -1){
            $("#answers").append($("<div />").html("Sorry, Check your matrix").addClass("text-warning lead"));
            return;
        }
        else{
            for(var i =0; i<obj.matrixA.length; i++){
                printMatrix(obj.matrixA[i], obj.vectorsB[i]);
            }
            printAnswers(obj);
            return;
        }
    });


    function printMatrix(c, d){

        var table = $("<table />").addClass("table");
        for(var i = 0; i<window.tmp; i++){
            var tr = $("<tr />");
            for(var j = 0; j<window.tmp+2; j++) {
                var  td = $("<td />");
                if(j == window.tmp){
                    tr.append(td).addClass("text-info lead");
                    continue;
                }
                else if(j == window.tmp+1){
                    td.html(d[i].toPrecision(4));
                    tr.append(td).addClass("text-info lead");
                    continue;
                }
                td.html(c[i][j].toPrecision(4));
                tr.append(td).addClass("text-info lead");

            }
            table.append(tr);
        }

        $("#answers").append(table);
        var br = $("<br />");
        $("#answers").append(br);

    }

    function printAnswers(obj) {
        var div = $("<div />");
        var text = "";
        for(var i = 0; i<window.tmp; i++){
            text += "x"+ (i+1) + "=";
            text += obj.solution[i].toPrecision(4)+ " ";

        }
        div.html(text).addClass("text-success lead");
        $("#answers").append(div);
    }



});


