/**
 *----basicAs-----
 * t1:消瘦 70
 * n: 正常 90
 * f1:超重 65
 * f2:肥胖 60
 * ---------------
 */
var analysis = {
    basicAs: function(sex, weight, height) {
        var standardWeight, ratio, result;
        switch (sex) {
            case "男":
                standardWeight = parseFloat(height) - 105;
                break;
            case "女":
                standardWeight = parseFloat(height) - 107.5;
                break;
        }
        ratio = parseFloat(weight) - standardWeight;
        if (ratio < 0) {
            if (Math.abs(parseFloat(weight) - standardWeight <= 0.1)) result = 'n';
            else result = 't1';
        } else {
            if (parseFloat(weight) - standardWeight <= 0.1) result = 'n';
            else if (parseFloat(weight) - standardWeight <= 0.2 && parseFloat(weight) - standardWeight > 0.1) result = 'f1';
            else result = 'f2';
        };
        return result;
    },
    basicToScore: function(result) {
        var score;
        switch (result) {
            case "t1":
                score = 70;
                break;
            case "n":
                score = 90;
                break;
            case "f1":
                score = 65;
                break;
            case "f2":
                score = 60;
                break;
        }
        return score;
    },
    scoreToMsg: function(score) {
        var msg;
        switch (parseInt(score)) {
            case 70:
                msg = "少挑嘴，多出蔬菜和肉.";
                break;
            case 90:
                msg = "你现在保持的很好，请继续.";
                break;
            case 65:
                msg = "你超重了，快注意饮食和运动.";
                break;
            case 60:
                msg = "请疯狂的运动减肥和控制饮食.";
                break;
        }
        return msg;
    }
};
module.exports = analysis;
