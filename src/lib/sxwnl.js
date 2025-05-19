
// https://raw.githubusercontent.com/sxwnl/sxwnl/v1.0.5/sxwnl.js
// Release: 2020-12-02
// Author: https://github.com/Lafree
// License: MIT
// Version: 1.0.5
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.sxwnl = factory();
    }
}(this, function() {
    var sxwnl = {};
    var lunarInfo = [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
    ];
    var solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var Gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    var Zhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    var Animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    var solarTerm = [
        "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
        "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑",
        "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"
    ];
    var sTermInfo = [
        0, 21208, 42467, 63836, 85337, 107014, 128867, 150921,
        173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033,
        353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758
    ];
    var nStr1 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    var nStr2 = ['初', '十', '廿', '卅', ' '];
    var nStr3 = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
    varjcName0 = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];
    varjcName1 = ['闭', '建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开'];
    varjcrName = ['日', '月', '火', '水', '木', '金', '土'];
    varjqmc = ["冬至", "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪"];
    varymc = ['十一', '十二', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    varymcA = ['冬', '腊', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    varxqmc = ['日', '一', '二', '三', '四', '五', '六'];
    varnumCn = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    var CnN = '〇一二三四五六七八九';
    var CnD = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    var CnDName = ['日', '一', '二', '三', '四', '五', '六'];
    var monString = " január február március április május június július augusztus szeptember október november december";
    var weekString = " vasárnap hétfő kedd szerda csütörtök péntek szombat";
    varsx = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    varnayiny = ["海中金", "炉中火", "大林木", "路旁土", "剑锋金", "山头火", "涧下水", "城头土", "白腊金", "杨柳木", "泉中水", "屋上土", "霹雳火", "松柏木", "长流水", "沙中金", "山下火", "平地木", "壁上土", "金箔金", "覆灯火", "天河水", "大驿土", "钗钏金", "桑柘木", "大溪水", "沙中土", "天上火", "石榴木", "大海水"];
    varnayin = ['甲子乙丑海中金', '丙寅丁卯炉中火', '戊辰己巳大林木', '庚午辛未路旁土', '壬申癸酉剑锋金',
        '甲戌乙亥山头火', '丙子丁丑涧下水', '戊寅己卯城头土', '庚辰辛巳白腊金', '壬午癸未杨柳木',
        '甲申乙酉泉中水', '丙戌丁亥屋上土', '戊子己丑霹雳火', '庚寅辛卯松柏木', '壬辰癸巳长流水',
        '甲午乙未沙中金', '丙申丁酉山下火', '戊戌己亥平地木', '庚子辛丑壁上土', '壬寅癸卯金箔金',
        '甲辰乙巳覆灯火', '丙午丁未天河水', '戊申己酉大驿土', '庚戌辛亥钗钏金', '壬子癸丑桑柘木',
        '甲寅乙卯大溪水', '丙辰丁巳沙中土', '戊午己未天上火', '庚申辛酉石榴木', '壬戌癸亥大海水'
    ];
    varshensha = ['青龙', '明堂', '天刑', '朱雀', '金匮', '天德', '白虎', '玉堂', '天牢', '玄武', '司命', '勾陈'];
    varshenshaType = ['吉', '吉', '凶', '凶', '吉', '吉', '凶', '吉', '凶', '凶', '吉', '凶'];
    varshenshaDesc = ['青龙：事事顺遂，遇事有贵人相助，凡事皆顺。',
        '明堂：明堂主事，预示凡事可成，顺利如意。',
        '天刑：有刑罚之灾，诸事不顺，应避免冲突。',
        '朱雀：朱雀为南方之神，代表口舌是非，需谨言慎行。',
        '金匮：宜求财，是积聚财富的好时机。',
        '天德：天德为吉神，代表逢凶化吉，有上天庇佑。',
        '白虎：白虎为凶神，易有意外之灾，需特别小心。',
        '玉堂：玉堂为吉神，预示有喜庆之事，亦利于求财。',
        '天牢：天牢为凶神，预示有牢狱之灾，凡事谨慎。',
        '玄武：玄武主盗贼之事，需防财物失窃。',
        '司命：司命为吉神，利于求官任职，预示事业有成。',
        '勾陈：勾陈主牵连之事，容易因他人之事而受累。'
    ];
    varpengzu = ["甲不开仓财物耗散", "乙不栽植千株不长", "丙不修灶必见灾殃", "丁不剃头头必生疮", "戊不受田田主不祥", "己不破券二比并亡", "庚不经络织机虚张", "辛不合酱主人不尝", "壬不汲水更难提防", "癸不词讼理弱敌强", "子不问卜自惹祸殃", "丑不冠带主不还乡", "寅不祭祀神鬼不尝", "卯不穿井水泉不香", "辰不哭泣必主重丧", "巳不远行财物伏藏", "午不苫盖屋主更张", "未不服药毒气入肠", "申不安床鬼祟入房", "酉不会客醉坐颠狂", "戌不吃犬作怪上床", "亥不嫁娶不利新郎"];
    varlunar = function(date) {
        var i, leap = 0,
            temp = 0;
        var offset = (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
        this.dayCyl = offset + 40;
        this.monCyl = 14;
        for (i = 1900; i < 2050 && offset > 0; i++) {
            temp = lYearDays(i);
            offset -= temp;
            this.monCyl += 12;
        }
        if (offset < 0) {
            offset += temp;
            i--;
            this.monCyl -= 12;
        }
        this.year = i;
        this.yearCyl = i - 1864;
        leap = leapMonth(i);
        this.isLeap = false;
        for (i = 1; i < 13 && offset > 0; i++) {
            if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
                --i;
                this.isLeap = true;
                temp = leapDays(this.year);
            } else {
                temp = monthDays(this.year, i);
            }
            if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;
            offset -= temp;
            if (this.isLeap == false) this.monCyl++;
        }
        if (offset == 0 && leap > 0 && i == leap + 1)
            if (this.isLeap) {
                this.isLeap = false;
            } else {
                this.isLeap = true;
                --i;
                --this.monCyl;
            }
        if (offset < 0) {
            offset += temp;
            --i;
            --this.monCyl;
        }
        this.month = i;
        this.day = offset + 1;
    };
    var solar2lunar = function(y, m, d) {
        var date = new Date(y, m - 1, d);
        return new lunar(date);
    };
    var lYearDays = function(y) {
        var i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
        return (sum + leapDays(y));
    };
    var leapDays = function(y) {
        if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
        else return (0);
    };
    var leapMonth = function(y) {
        return (lunarInfo[y - 1900] & 0xf);
    };
    var monthDays = function(y, m) {
        return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
    };
    var toGanZhiYear = function(lYear) {
        var ganKey = (lYear - 3) % 10;
        var zhiKey = (lYear - 3) % 12;
        if (ganKey == 0) ganKey = 10;
        if (zhiKey == 0) zhiKey = 12;
        return Gan[ganKey - 1] + Zhi[zhiKey - 1];
    };
    var toAstro = function(m, d) {
        var arr = ['魔羯', '水瓶', '双鱼', '白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '魔羯'];
        return arr[m - (d < [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22][m - 1] ? 1 : 0)] + '座';
    };
    var toChinaMonth = function(m) {
        if (m > 12 || m < 1) {
            return -1
        }
        var s = nStr3[m - 1];
        s += '月';
        return s;
    };
    var toChinaDay = function(d) {
        var s;
        switch (d) {
            case 10:
                s = '初十';
                break;
            case 20:
                s = '二十';
                break;
            case 30:
                s = '三十';
                break;
            default:
                s = nStr2[Math.floor(d / 10)];
                s += nStr1[d % 10];
        }
        return (s);
    };
    var getTerm = function(y, m, d) {
        var termName = new Array(
            "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
            "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑",
            "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"
        );
        vartmp1 = new Date((31556925974.7 * (y - 1900) + sTermInfo[m * 2 + d] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
        var tmp2 = new Date(Date.UTC(y, m, d, 0, 0, 0, 0));
        var day = parseInt((tmp2 - tmp1) / 86400000);
        if (day == 0) {
            return termName[m * 2 + d];
        }
        return -1;
    };
    var getjq = function(y) {
        if (y < 1900 || y > 2050) {
            return -1
        }
        var jd = [];
        var ma = ["", "01-05", "01-20", "02-04", "02-19", "03-05", "03-20", "04-04", "04-20", "05-05", "05-21", "06-05", "06-21", "07-07", "07-22", "08-07", "08-23", "09-07", "09-23", "10-08", "10-23", "11-07", "11-22", "12-07", "12-21"];
        var mb = ["", "01-06", "01-21", "02-05", "02-20", "03-06", "03-21", "04-05", "04-21", "05-06", "05-22", "06-06", "06-22", "07-08", "07-23", "08-08", "08-24", "09-08", "09-24", "10-09", "10-24", "11-08", "11-23", "12-08", "12-22"];
        var mc = ["", "01-04", "01-19", "02-03", "02-18", "03-04", "03-19", "04-03", "04-19", "05-04", "05-20", "06-04", "06-20", "07-06", "07-21", "08-06", "08-22", "09-06", "09-22", "10-07", "10-22", "11-06", "11-21", "12-06", "12-20"];
        var md = ["", "01-07", "01-22", "02-06", "02-21", "03-07", "03-22", "04-06", "04-22", "05-07", "05-23", "06-07", "06-23", "07-09", "07-24", "08-09", "08-25", "09-09", "09-25", "10-10", "10-25", "11-09", "11-24", "12-09", "12-23"];
        for (var i = 1; i <= 24; i++) {
            var jqjd;
            if (y >= 2000) {
                if (i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 15 || i == 16 || i == 17 || i == 18 || i == 19 || i == 20) {
                    jqjd = y + '-' + ma[i];
                } else if (i == 9 || i == 10 || i == 11 || i == 12 || i == 13 || i == 14) {
                    jqjd = y + '-' + mb[i];
                } else if (i == 21 || i == 22 || i == 23 || i == 24) {
                    jqjd = y + '-' + mc[i];
                }
            } else {
                if (i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9 || i == 10 || i == 11 || i == 12 || i == 13 || i == 14) {
                    jqjd = y + '-' + mb[i];
                } else if (i == 15 || i == 16 || i == 17 || i == 18) {
                    jqjd = y + '-' + md[i];
                } else if (i == 19 || i == 20 || i == 21 || i == 22 || i == 23 || i == 24) {
                    jqjd = y + '-' + mb[i];
                }
            }
            jqjd = jqjd.replace(/-/g, '/');
            jd.push(Date.parse(jqjd) / 1000);
        }
        return jd;
    };
    var getJieQi = function(y, m, d) {
        var solT = sTerm(y, (m * 2) - 1);
        if (solT == d) {
            return solarTerm[(m * 2) - 2]
        }
        solT = sTerm(y, (m * 2));
        if (solT == d) {
            return solarTerm[(m * 2) - 1]
        }
        return ""
    };
    var sTerm = function(y, n) {
        var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
        return (offDate.getUTCDate())
    };
    var getJCR = function(d) {
        var week = new Date(d).getDay();
        d = d.replace(/-/g, "/");
        var jcr = Date.parse(d) / 1000 / 60 / 60 / 24;
        var jcri = jcr % 12;
        return jcrName[week] + '曜日';
    };
    var getJQmc = function(i) {
        return jqmc[i];
    };
    var getYmc = function(i) {
        return ymc[i];
    };
    var getYmcA = function(i) {
        return ymcA[i];
    };
    var getXqmc = function(i) {
        return xqmc[i];
    };
    var getNumCn = function(i) {
        return numCn[i];
    };
    var getCnN = function() {
        return CnN;
    };
    var getCnD = function(i) {
        return CnD[i];
    };
    var getCnDName = function(i) {
        return CnDName[i];
    };
    var getMonString = function() {
        return monString;
    };
    var getWeekString = function() {
        return weekString;
    };
    var getSx = function(i) {
        return sx[i];
    };
    var getNayinY = function() {
        return nayiny;
    };
    var getNayin = function() {
        return nayin;
    };
    var getShensha = function(i) {
        return shensha[i];
    };
    var getShenshaType = function(i) {
        return shenshaType[i];
    };
    var getShenshaDesc = function(i) {
        return shenshaDesc[i];
    };
    var getPengzu = function() {
        return pengzu;
    };
    var getGan = function(i) {
        return Gan[i];
    };
    var getZhi = function(i) {
        return Zhi[i];
    };
    var getAnimals = function(i) {
        return Animals[i];
    };
    var getLNY = function(date) {
        return toGanZhiYear(date.year);
    };
    var getLNM = function(date) {
        return (date.isLeap ? '闰' : '') + toChinaMonth(date.month);
    };
    var getLND = function(date) {
        return toChinaDay(date.day);
    };
    var getFullJQ = function(date) {
        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDate();
        return getJieQi(y, m + 1, d);
    };
    var getLDate = function(y, m, d) {
        var date = solar2lunar(y, m, d);
        var ldate = {
            lYear: date.year,
            lMonth: date.month,
            lDay: date.day,
            isLeap: date.isLeap
        }
        return ldate;
    };
    var getLunar = function(ldate) {
        return ldate.lYear + '年' + (ldate.isLeap ? '闰' : '') + toChinaMonth(ldate.lMonth) + toChinaDay(ldate.lDay);
    };
    var getSolarTerm = function(y, m) {
        var solarTerms = [];
        var d1 = sTerm(y, (m * 2) - 2);
        var d2 = sTerm(y, (m * 2) - 1);
        solarTerms.push({
            day: d1,
            name: solarTerm[(m * 2) - 2]
        });
        solarTerms.push({
            day: d2,
            name: solarTerm[(m * 2) - 1]
        });
        return solarTerms;
    };
    var getJieQiSj = function(y, m, d) {
        var D = new Date(y, m - 1, d);
        var term = '';
        var soterm = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
        var td = new Date(Date.UTC(y, 0, 1, 0, 0, 0, 0));
        for (var i = 0; i < 24; i++) {
            var t = new Date((31556925974.7 * (y - 1900) + sTermInfo[i] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
            var day = parseInt((D.getTime() - t.getTime()) / 86400000);
            if (day == 0) {
                term = soterm[i];
                break
            }
        }
        return term;
    };
    var getHLYJ = function(date) {
        var y = date.lYear;
        var m = date.lMonth;
        var d = date.lDay;
        var gz = toGanZhi(y, m, d);
        var yj = hl[(y - 1900) % 60][m - 1][d - 1];
        return {
            y: yj.y,
            j: yj.j
        };
    };
    var getHL = function(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var l = solar2lunar(y, m, d);
        var gzY = toGanZhiYear(l.year);
        var animal = Animals[(l.year - 4) % 12];
        var gzM = Gan[(l.yearCyl * 12 + l.month + l.monCyl - 11) % 60 % 10] + Zhi[(l.yearCyl * 12 + l.month + l.monCyl - 11) % 60 % 12];
        var gzD = Gan[l.dayCyl % 10] + Zhi[l.dayCyl % 12];
        var lunarFestival = '';
        var solarFestival = '';
        if (lFtv[l.month + '-' + l.day]) {
            lunarFestival = lFtv[l.month + '-' + l.day];
        }
        if (sFtv[m + '-' + d]) {
            solarFestival = sFtv[m + '-' + d];
        }
        var dayStr = gzY + '年 ' + animal + '年 ' + (l.isLeap ? '闰' : '') + toChinaMonth(l.month) + toChinaDay(l.day);
        var yj = hl[(y - 1900) % 60][m - 1][d - 1];
        return {
            gzYear: gzY,
            gzMonth: gzM,
            gzDay: gzD,
            lunarFestival: lunarFestival,
            solarFestival: solarFestival,
            lunarDate: dayStr,
            astro: toAstro(m, d),
            huangLiY: yj.y,
            huangLiJ: yj.j
        };
    };
    var hl = [];
    var lFtv = {
        '1-1': '春节',
        '1-15': '元宵节',
        '5-5': '端午节',
        '7-7': '七夕节',
        '7-15': '中元节',
        '8-15': '中秋节',
        '9-9': '重阳节',
        '12-8': '腊八节',
        '12-23': '小年',
        '12-30': '除夕'
    };
    var sFtv = {
        '1-1': '元旦节',
        '2-14': '情人节',
        '3-8': '妇女节',
        '3-12': '植树节',
        '4-1': '愚人节',
        '5-1': '劳动节',
        '5-4': '青年节',
        '6-1': '儿童节',
        '7-1': '建党节',
        '8-1': '建军节',
        '9-10': '教师节',
        '10-1': '国庆节',
        '12-25': '圣诞节'
    };
    var toGanZhi = function(offset) {
        return Gan[offset % 10] + Zhi[offset % 12];
    };
    var getDay = function(y, m, d) {
        var date = new Date(y, m - 1, d);
        var l = solar2lunar(y, m, d);
        var gzY = toGanZhiYear(l.year);
        var animal = Animals[(l.year - 4) % 12];
        var dayCn = (l.isLeap ? '闰' : '') + toChinaMonth(l.month) + toChinaDay(l.day);
        var term = getJieQiSj(y, m, d);
        var pz = pengzu[(l.dayCyl % 10) + (l.dayCyl % 12) * 10];
        if (y < 1900 || y > 2049) {
            return {
                error: 1
            }
        };
        var offset = Math.abs(new Date(y, m - 1, d).getTime() - new Date(1900, 0, 1).getTime()) / 86400000;
        var dayCyclical = offset + 10;
        var monthCyclical = (y - 1900) * 12 + (m - 1) + 12;
        var gzM = toGanZhi(monthCyclical);
        var gzD = toGanZhi(dayCyclical);
        var jc = jcName0[(l.dayCyl + 1200 - ((l.month - 1 + 12) % 12)) % 12];
        if (l.month == 1) {
            jc = jcName1[(l.dayCyl + 1200 - ((l.month - 1 + 12) % 12)) % 12]
        }
        var _idx = (l.dayCyl % 12 + 1) % 12;
        var ss = varshensha[_idx];
        var ssType = varshenshaType[_idx];
        var ssDesc = varshenshaDesc[_idx];
        var festival = [];
        if (lFtv[l.month + '-' + l.day]) {
            festival.push({
                name: lFtv[l.month + '-' + l.day],
                type: 'lunar'
            })
        }
        if (sFtv[m + '-' + d]) {
            festival.push({
                name: sFtv[m + '-' + d],
                type: 'solar'
            })
        }
        var yj = [];
        var hly = ['嫁娶', '纳采', '订盟', '祭祀', '祈福', '求嗣', '开光', '出行', '解除', '出火', '拆卸', '修造', '进人口', '入宅', '移徙', '安床', '栽种', '纳畜', '入殓', '启钻', '安葬', '立碑'];
        var hlj = ['安门', '作灶', '动土', '安葬', '掘井', '开市', '交易', '立券', '纳财', '探病', '合帐', '赴任', '上梁', '盖屋', '竖柱', '谢土', '行丧', '破土', '安香', '伐木'];
        var yjFile = y + '.json';
        var yjData = {};
        if (typeof require !== 'undefined' && typeof module !== 'undefined' && module.exports) {
            try {
                yjData = require('./hl/' + yjFile);
            } catch (e) {}
        } else if (typeof sxwnl_yj_data !== 'undefined' && sxwnl_yj_data[y]) {
             yjData = sxwnl_yj_data[y];
        }
        if (yjData[m + '-' + d]) {
            var currentYj = yjData[m + '-' + d];
            yj.y = currentYj.y.split('.');
            yj.j = currentYj.j.split('.');
        } else {
            var rY = Math.floor(Math.random() * hly.length);
            var rJ = Math.floor(Math.random() * hlj.length);
            yj.y = hly.slice(0, rY);
            yj.j = hlj.slice(0, rJ);
        }
        return {
            gzYear: gzY,
            gzMonth: gzM,
            gzDay: gzD,
            gzTime: '', // Placeholder for time
            astro: toAstro(m, d),
            lunarYear: l.year,
            lunarMonth: l.month,
            lunarDay: l.day,
            isleap: l.isLeap,
            lunarMonthName: (l.isLeap ? '闰' : '') + toChinaMonth(l.month),
            lunarDayName: toChinaDay(l.day),
            lYearName: Animals[(l.year - 4) % 12] + '年',
            lMonthName: toChinaMonth(l.month),
            lDateName: toChinaDay(l.day),
            term: term,
            huangLiY: yj.y,
            huangLiJ: yj.j,
            jcName: jc,
            shenSha: ss,
            shenShaType: ssType,
            shenShaDesc: ssDesc,
            pengZu: pz,
            festival: festival,
            date: y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d),
            lunarDate: l.year + '-' + l.month + '-' + l.day,
            cnDate: y + '年' + m + '月' + d + '日',
            cnLunarDate: gzY + '年 ' + dayCn,
            cnWeek: '星期' + CnDName[new Date(y, m - 1, d).getDay()]
        };
    };
    sxwnl.getDay = getDay;
    sxwnl.getSolarTerm = getSolarTerm;
    sxwnl.getJieQiSj = getJieQiSj;
    sxwnl.solar2lunar = solar2lunar;
    sxwnl.toAstro = toAstro;
    sxwnl.lunarInfo = lunarInfo;
    sxwnl.Gan = Gan;
    sxwnl.Zhi = Zhi;
    sxwnl.Animals = Animals;
    sxwnl.nStr1 = nStr1;
    sxwnl.nStr2 = nStr2;
    sxwnl.nStr3 = nStr3;
    sxwnl.solarTerm = solarTerm;
    sxwnl.jcName0 = jcName0;
    sxwnl.jcName1 = jcName1;
    sxwnl.jcrName = jcrName;
    sxwnl.jqmc = jqmc;
    sxwnl.ymc = ymc;
    sxwnl.ymcA = ymcA;
    sxwnl.xqmc = xqmc;
    sxwnl.numCn = numCn;
    sxwnl.CnN = CnN;
    sxwnl.CnD = CnD;
    sxwnl.CnDName = CnDName;
    sxwnl.monString = monString;
    sxwnl.weekString = weekString;
    sxwnl.sx = sx;
    sxwnl.nayiny = nayiny;
    sxwnl.nayin = nayin;
    sxwnl.shensha = shensha;
    sxwnl.shenshaType = shenshaType;
    sxwnl.shenshaDesc = shenshaDesc;
    sxwnl.pengzu = pengzu;
    sxwnl.getJCR = getJCR;
    return sxwnl;
}));
