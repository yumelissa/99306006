
var city = "\u5357\u6295 \u53f0\u4e2d \u53f0\u5317 \u53f0\u5357 \u53f0\u6771 \u5609\u7fa9 \u57fa\u9686 \u5b9c\u862d \u5c4f\u6771 \u5f70\u5316 \u65b0\u5317\u5e02 \u65b0\u7af9 \u6843\u5712 \u82b1\u84ee \u82d7\u6817 \u96f2\u6797 \u9ad8\u96c4".split(" ");
//key(city),value(county)
var subCity = {
        "\u5357\u6295": ["\u5357\u6295\u5e02"],
        "\u53f0\u4e2d": ["\u897f\u5c6f", "\u77f3\u5ca1", "\u6e05\u6c34", "\u65b0\u793e", "\u5927\u7532"],
        "\u53f0\u5317": ["\u5167\u6e56", "\u65b0\u5e97"],
        "\u53f0\u5357": ["\u5b89\u5e73", "\u4f73\u91cc", "\u9ebb\u8c46", "\u65b0\u5316", "\u7389\u4e95"],
        "\u53f0\u6771": ["\u53f0\u6771\u5e02", "\u95dc\u5c71"],
        "\u5609\u7fa9": ["\u5e03\u888b"],
        "\u57fa\u9686": ["\u4e03\u5835"],
        "\u5b9c\u862d": ["\u5b9c\u862d\u5e02", "\u8607\u6fb3", "\u5357\u6fb3"],
        "\u5c4f\u6771": ["\u5c4f\u6771\u5e02", "\u6771\u6e2f", "\u678b\u5c71"],
        "\u5f70\u5316": ["\u5f70\u5316\u5e02", "\u4e8c\u6797", "\u9e7f\u6e2f"],
        "\u65b0\u5317\u5e02": ["\u6de1\u6c34", "\u9daf\u6b4c", "\u91d1\u5c71", "\u4e09\u829d", "\u842c\u91cc", "\u96d9\u6eaa"],
        "\u65b0\u7af9": ["\u6771\u5340"],
        "\u6843\u5712": ["\u5927\u5712", "\u4e2d\u58e2", "\u89c0\u97f3", "\u9f8d\u6f6d", "\u6843\u5712\u6a5f\u5834"],
        "\u82b1\u84ee": ["\u82b1\u84ee\u5e02"],
        "\u82d7\u6817": ["\u4e09\u7063"],
        "\u96f2\u6797": ["\u6597\u5357", "\u864e\u5c3e"],
        "\u9ad8\u96c4": ["\u5de6\u71df", "\u5ca1\u5c71", "\u9ad8\u96c4\u6a5f\u5834"]
    };
var woeid = {
        "\u4e03\u5835": 2306188,
        "\u4e09\u7063": 2306229,
        "\u4e09\u829d": 2306228,
        "\u4e2d\u58e2": 2306184,
        "\u4e8c\u6797": 2306195,
        "\u4f73\u91cc": 2306193,
        "\u5167\u6e56": 2306179,
        "\u5357\u6295\u5e02": 2306204,
        "\u5357\u6fb3": 2306243,
        "\u53f0\u6771\u5e02": 2306190,
        "\u5927\u5712": 2306209,
        "\u5927\u7532": 2306210,
        "\u5b89\u5e73": 2306182,
        "\u5b9c\u862d\u5e02": 2306198,
        "\u5c4f\u6771\u5e02": 2306189,
        "\u5ca1\u5c71": 2306199,
        "\u5de6\u71df": 2306180,
        "\u5e03\u888b": 2306206,
        "\u5f70\u5316\u5e02": 2306183,
        "\u6597\u5357": 2306212,
        "\u65b0\u5316": 2306217,
        "\u65b0\u5e97": 2306186,
        "\u65b0\u793e": 2306218,
        "\u6771\u5340": 2306185,
        "\u6771\u6e2f": 2306213,
        "\u678b\u5c71": 2306224,
        "\u6843\u5712\u6a5f\u5834": 2306254,
        "\u6de1\u6c34": 2306211,
        "\u6e05\u6c34": 2306194,
        "\u7389\u4e95": 2306232,
        "\u77f3\u5ca1": 2306207,
        "\u82b1\u84ee\u5e02": 2306187,
        "\u842c\u91cc": 2306231,
        "\u8607\u6fb3": 2306208,
        "\u864e\u5c3e": 2306250,
        "\u897f\u5c6f": 2306181,
        "\u89c0\u97f3": 2306200,
        "\u91d1\u5c71": 2306223,
        "\u95dc\u5c71": 2306227,
        "\u96d9\u6eaa": 2306251,
        "\u9ad8\u96c4\u6a5f\u5834": 2306255,
        "\u9daf\u6b4c": 2306214,
        "\u9e7f\u6e2f": 2306201,
        "\u9ebb\u8c46": 2306203,
        "\u9f8d\u6f6d": 2306202
    };
var Init = function() {
        var items = [], i, j;
        for (i in woeid) 
            items.push('<div class="btn btn-link" id="' + woeid[i] + '">' + i + "</div>");
        $("#list_items").append(items);
        var items = [];
        for (j in city) items.push("<option>" + city[j] + "</option>");
        $("#city").append(items);
        $("#city").trigger("change");
    };
var updateWeather = function(i) {
        $.getJSON("http://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid=" + i, {}, function(i) {
            var result = i.query.results.channel.item,
                title = result.title,
                location = result.lat + "," + result["long"],
                temp = result.pubDate,
                text = result.condition.temp,
                date = result.condition.text;
            $("#result #title").text(title);
            $("#result #location").text(location);
            $("#result #temp").text(temp + "\u2109");
            $("#result #text").text(text);
            $("#result #date").text(date);
        })
    };

$("#list_items").on("click", "div.btn.btn-link", function(i) {
    updateWeather(i.target.id);
});

//change subCity
$("#city").change(function() {
    var a = $(this).find(":selected").text(),
        d = woeid[subCity[a][0]],
        b,
        c = [];
    for (b in subCity[a]) c.push("<option>" + subCity[a][b] + "</option>");
    $("#county").children().remove();
    $("#county").append(c);
    updateWeather(d);
});
$("#county").change(function() {
    var i = $(this).find(":selected").text();
    updateWeather(woeid[i])
}); 