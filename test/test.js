/**
 * Created by andrew on 16.10.14.
 */
module("Gauss");


test('test', function(){
    var testMatrix = [["3213", "fgbgfx"], ["fakl", "vld"]];
    var testVectorB = ["1", "2"];
    gauss(testMatrix, testVectorB);
    ok(false, "All good");

});
