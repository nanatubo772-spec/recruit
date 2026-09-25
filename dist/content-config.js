// 01・02・03の表示内容は、このファイルだけを編集すれば変更できます。
// 文字列は引用符の中、項目の追加・削除は配列（[ ... ]）の中で行ってください。
window.NANATSUBO_CONTENT = {
  section01: {
    heading: ["人と、ごはん。", "この店のいいところ。"],
    description: "一緒に働く人のこと。仕事終わりのごはんのこと。毎日の楽しみが、ここにはあります。",
    cards: [
      {
        number: "01",
        label: "お店のこと",
        title: "明るくて、話しやすい。",
        body: "困ったときに声をかけやすい、気取らない雰囲気のお店です。"
      },
      {
        number: "02",
        label: "まかないのこと",
        title: "働いたあとの楽しみ。",
        body: "しっかり食べられる、まかない付き。お腹も満たして帰れます。"
      }
    ]
  },

  section02: {
    heading: "お店のようす",
    description: "写真で、少しだけのぞいてみてください。",
    photos: [
      {
        src: "shop-first-floor.png",
        alt: "木のテーブルと掲示物が並ぶ店内",
        caption: "木のテーブルが並ぶ店内"
      },
      {
        src: "shop-second-floor.png",
        alt: "複数のテーブル席がある店内",
        caption: "テーブル席"
      },
      {
        src: "shop-exterior.png",
        alt: "看板と提灯が並ぶお店の外観",
        caption: "お店の外観"
      }
    ]
  },

  section03: {
    heading: ["働き方は、", "相談できます。"],
    description: "短時間から始めたい方も、土日に入りたい方も歓迎。希望の働き方を電話で相談できます。",
    shopName: "鉄板焼き ななつぼ 井土ヶ谷店",
    status: "スタッフ募集中",
    conditions: [
      { label: "仕事内容", value: "接客を中心とした店舗業務" },
      { label: "時給", value: "確認中", highlight: true },
      { label: "勤務時間", value: "18:00〜23:00", note: "1日3時間〜、週2日でもOK" },
      { label: "シフト", value: "希望シフト制", note: "土・日勤務、Wワーク歓迎" },
      { label: "応募条件", value: "年齢・経験・男女不問", note: "学生・フリーター・主婦（夫）、20代〜50代歓迎" },
      { label: "待遇", value: "まかない付き" },
      { label: "勤務地", value: "神奈川県横浜市南区南太田4-2-1", note: "ご近所の方歓迎" }
    ],
    contact: {
      heading: "電話で応募・相談する",
      description: "「求人ページを見た」と伝えるとスムーズです。まずは気軽にお電話ください。",
      applicationLabel: "応募受付",
      applicationPhone: "045-334-7811",
      shopLabel: "店舗へ問い合わせる",
      shopPhone: "045-308-7411",
      note: "面接時は写真付き履歴書をご持参ください。"
    }
  }
};
