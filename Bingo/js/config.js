const BingoConfig = {
  storageKey: "bingoGameState",
  defaultConfig: {
    rows: 5,
    cols: 5,
    min: 1,
    max: 75,
    gameType: "number",
    targetLines: 5
  },
  dataPaths: {
    emt: "data/emt.json",
    ships: "data/ships.json"
  }
};

window.BingoFallbackEmtWords = [
  {
    "text": "高醫",
    "icon": "fa-hospital"
  },
  {
    "text": "阮綜合醫院",
    "icon": "fa-hospital"
  },
  {
    "text": "大同醫院",
    "icon": "fa-hospital"
  },
  {
    "text": "下雨天協勤",
    "icon": "fa-cloud-rain"
  },
  {
    "text": "內科OHCA",
    "icon": "fa-heart-pulse"
  },
  {
    "text": "Trauma OHCA",
    "icon": "fa-user-injured"
  },
  {
    "text": "聖功醫院",
    "icon": "fa-hospital"
  },
  {
    "text": "長庚醫院",
    "icon": "fa-hospital"
  },
  {
    "text": "榮民總醫院",
    "icon": "fa-hospital"
  },
  {
    "text": "車上CPR",
    "icon": "fa-car-side"
  },
  {
    "text": "凱旋醫院",
    "icon": "fa-hospital"
  },
  {
    "text": "民生醫院",
    "icon": "fa-hospital"
  },
  {
    "text": "遇到精神病患",
    "icon": "fa-brain"
  },
  {
    "text": "強制送醫使用約束帶",
    "icon": "fa-link"
  },
  {
    "text": "解鎖燒燙傷",
    "icon": "fa-fire"
  },
  {
    "text": "火警救護",
    "icon": "fa-fire-extinguisher"
  },
  {
    "text": "小飛俠",
    "icon": "fa-helicopter"
  },
  {
    "text": "晴天娃娃",
    "icon": "fa-sun"
  },
  {
    "text": "打撈",
    "icon": "fa-water"
  },
  {
    "text": "明顯死亡(屍僵屍腐)",
    "icon": "fa-skull"
  },
  {
    "text": "明顯死亡(頭首分離)",
    "icon": "fa-skull-crossbones"
  },
  {
    "text": "急產接生",
    "icon": "fa-baby"
  },
  {
    "text": "脫襪式傷口",
    "icon": "fa-bandage"
  },
  {
    "text": "低血糖",
    "icon": "fa-droplet"
  },
  {
    "text": "低血壓",
    "icon": "fa-heart-pulse"
  },
  {
    "text": "瀕死式呼吸",
    "icon": "fa-lungs"
  },
  {
    "text": "耳漏鼻漏",
    "icon": "fa-head-side-mask"
  },
  {
    "text": "執行辛辛那提異常",
    "icon": "fa-brain"
  },
  {
    "text": "EKG",
    "icon": "fa-wave-square"
  },
  {
    "text": "血糖",
    "icon": "fa-droplet"
  },
  {
    "text": "備IV",
    "icon": "fa-syringe"
  },
  {
    "text": "上頸圈",
    "icon": "fa-user-shield"
  },
  {
    "text": "翻身上長背板",
    "icon": "fa-bed"
  },
  {
    "text": "破門",
    "icon": "fa-door-open"
  },
  {
    "text": "正確使用器材給氧",
    "icon": "fa-mask-ventilator"
  },
  {
    "text": "BVM給氧",
    "icon": "fa-mask-ventilator"
  },
  {
    "text": "進階呼吸道給氧",
    "icon": "fa-lungs"
  },
  {
    "text": "架設LUCAS",
    "icon": "fa-heart-circle-bolt"
  },
  {
    "text": "使用電動擔架",
    "icon": "fa-bed-pulse"
  },
  {
    "text": "使用搬運椅",
    "icon": "fa-wheelchair"
  },
  {
    "text": "使用傳統擔架",
    "icon": "fa-bed"
  },
  {
    "text": "抽吸式護木",
    "icon": "fa-kit-medical"
  },
  {
    "text": "斷肢",
    "icon": "fa-hand"
  },
  {
    "text": "發燒",
    "icon": "fa-temperature-high"
  },
  {
    "text": "急性心肌梗塞(MI)",
    "icon": "fa-heart-crack"
  },
  {
    "text": "慢性阻塞性肺病(COPD)",
    "icon": "fa-lungs"
  },
  {
    "text": "非OHCA GCS 3分",
    "icon": "fa-brain"
  },
  {
    "text": "一氧化碳中毒",
    "icon": "fa-smog"
  },
  {
    "text": "線上派遣",
    "icon": "fa-headset"
  },
  {
    "text": "醫師線上指導",
    "icon": "fa-user-doctor"
  },
  {
    "text": "酒醉路倒",
    "icon": "fa-wine-bottle"
  },
  {
    "text": "吸毒過量",
    "icon": "fa-pills"
  },
  {
    "text": "自殘",
    "icon": "fa-hand-fist"
  },
  {
    "text": "同時有3個以上傷患",
    "icon": "fa-people-group"
  },
  {
    "text": "獨自評估患者",
    "icon": "fa-user"
  },
  {
    "text": "獨自處置患者",
    "icon": "fa-user-check"
  },
  {
    "text": "頭部外傷 GCS小於15",
    "icon": "fa-head-side-virus"
  },
  {
    "text": "骨盆不穩定",
    "icon": "fa-bone"
  }
];

window.BingoFallbackShips = [
  {
    "code": "A",
    "name": "航空母艦",
    "size": 5,
    "className": "ship-carrier",
    "badgeClassName": "badge-carrier"
  },
  {
    "code": "B",
    "name": "戰艦",
    "size": 4,
    "className": "ship-battle",
    "badgeClassName": "badge-battle"
  },
  {
    "code": "C",
    "name": "驅逐艦",
    "size": 3,
    "className": "ship-destroyer",
    "badgeClassName": "badge-destroyer"
  },
  {
    "code": "S",
    "name": "潛艇",
    "size": 2,
    "className": "ship-submarine",
    "badgeClassName": "badge-submarine"
  },
  {
    "code": "P",
    "name": "巡邏艇",
    "size": 2,
    "className": "ship-patrol",
    "badgeClassName": "badge-patrol"
  }
];
