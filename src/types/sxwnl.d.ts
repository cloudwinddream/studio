
declare module '@/lib/sxwnl' {
  export interface Festival {
    name: string;
    type: 'lunar' | 'solar';
  }

  export interface LunarDateInfo {
    gzYear: string;          // 干支年，例如 "庚子"
    gzMonth: string;         // 干支月，例如 "戊子"
    gzDay: string;           // 干支日，例如 "甲申"
    gzTime: string;          // 干支时 (当前版本库中此字段为空，可能需要额外计算)
    astro: string;           // 星座，例如 "射手座"
    lunarYear: number;       // 农历年数字，例如 2020
    lunarMonth: number;      // 农历月数字，例如 10
    lunarDay: number;        // 农历日数字，例如 17
    isleap: boolean;         // 是否闰月
    lunarMonthName: string;  // 农历月中文名，例如 "十月" 或 "闰十月"
    lunarDayName: string;    // 农历日中文名，例如 "十七"
    lYearName: string;       // 生肖年名称，例如 "鼠年"
    lMonthName: string;      // 农历月中文名（无"闰"字），例如 "十月"
    lDateName: string;       // 农历日中文名，同 lunarDayName
    term: string | null;     // 节气名，例如 "大雪", 如果当天不是节气则为 "" (根据库的实际行为调整，源库返回空字符串)
    huangLiY: string[];      // 黄历宜事数组，例如 ["祭祀", "祈福"]
    huangLiJ: string[];      // 黄历忌事数组，例如 ["开市", "动土"]
    jcName: string;          // 建除十二值日，例如 "建"
    shenSha: string;         // 当日神煞（如青龙、白虎等）
    shenShaType: string;     // 神煞吉凶类型 ('吉', '凶')
    shenShaDesc: string;     // 神煞描述
    pengZu: string;          // 彭祖百忌
    festival: Festival[];    // 当日节日 [{name: "元旦节", type: "solar"}]
    date: string;            // 公历日期 YYYY-MM-DD
    lunarDate: string;       // 农历日期 YYYY-M-D (不补零)
    cnDate: string;          // 中文公历日期，例如 "2020年12月1日"
    cnLunarDate: string;     // 中文农历完整日期，例如 "庚子年 十月十七"
    cnWeek: string;          // 中文星期，例如 "星期二"
    error?: number;          // 错误码 (如果年份超出范围)
  }

  export interface SolarTermDetail {
    day: number;
    name: string;
  }

  export interface SxwnlApi {
    getDay: (year: number, month: number, day: number) => LunarDateInfo;
    getSolarTerm: (year: number, month: number) => SolarTermDetail[];
    getJieQiSj: (year: number, month: number, day: number) => string; // 获取当日节气名称
    // Add other functions from sxwnl if needed
  }

  const sxwnl: SxwnlApi;
  export default sxwnl;
}
