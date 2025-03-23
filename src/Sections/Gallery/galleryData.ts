export interface GalleryImage {
  id: number
  src: string
  title: string
  description: string
  orderUrl?: string
  specs: {
    material: {
      shaft: string
      fletching: string
      paper: string
      furubiki: string
      featherProcess: string
      decoration: string
    }
  }
}

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/gallery/1.jpg",
    title: "1. スタンダード黒",
    description: "一番人気の黒羽根を軸にした組み合わせ。どんな糸/和紙や毛引にでもマッチするためカスタマイズもしやすいです。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=52",
    specs: {
      material: {
        shaft: "ジュラシャフト シルバー",
        fletching: "ターキー 黒",
        paper: "F710 糸",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 2,
    src: "/gallery/2.jpg",
    title: "2. とんぼ",
    description: "前向きに進むという意味から、縁起の良いとされるとんぼの羽根の柄を使用した組み合わせの矢に仕上がります。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=53",
    specs: {
      material: {
        shaft: "ジュラシャフト シルバー",
        fletching: "ターキー とんぼ",
        paper: "W115_松葉緑 和紙",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 3,
    src: "/gallery/3.jpg",
    title: "3. 中白 紫",
    description: "弓道で人気のある紫羽根の中白を使用。和紙とシャフトと羽根の全てが調和した矢に仕上がります。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=54",
    specs: {
      material: {
        shaft: "ジュラシャフト 茶",
        fletching: "ターキー 中白 紫",
        paper: "W019_夜菊 和紙",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 4,
    src: "/gallery/4.jpg",
    title: "4. 染色羽根 赤",
    description: "真っ赤な羽根を使用し、派手な色ながらも黒とのコントラストによりとても上品で情熱的な矢に仕上がります。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=55",
    specs: {
      material: {
        shaft: "ジュラシャフト 黒",
        fletching: "ターキー 染色羽根 赤",
        paper: "W142_桜 鎌倉彫 和紙",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 5,
    src: "/gallery/5.jpg",
    title: "5. 夜の鹿",
    description: "幻想的な羽根の柄と和紙の組み合わせで、落ち着いて練習に打ち込む事ができます。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=56",
    specs: {
      material: {
        shaft: "ジュラシャフト 黒",
        fletching: "ターキー 夜の鹿",
        paper: "w180_雪に結晶 シルバー 和紙",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 6,
    src: "/gallery/6.jpg",
    title: "6. 元白 青",
    description: "数あるシャフトと和紙の組み合わせの中で、最も爽やかに仕上がる矢の組み合わせができました。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=57",
    specs: {
      material: {
        shaft: "ジュラシャフト シルバー",
        fletching: "ターキー 元白 青",
        paper: "W008_夜に金鶴 和紙",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 7,
    src: "/gallery/7.jpg",
    title: "7. ゴマ符 深緑",
    description: "深緑の羽根で強いインパクトがありながらも、とても落ち着いた上品な仕上がりになります。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=58",
    specs: {
      material: {
        shaft: "ジュラシャフト シルバー",
        fletching: "ターキー ゴマ符 深緑",
        paper: "F054 糸",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 8,
    src: "/gallery/gallery-1.jpg",
    title: "8. 染色グラデーション茶 元白",
    description: "伝統的な落ち着いた茶色のグラデーションに、和紙でワンポイントをあしらいとてもお洒落に仕上がります。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=59",
    specs: {
      material: {
        shaft: "ジュラシャフト 黒",
        fletching: "ターキー 染色グラデーション茶 元白",
        paper: "W013_水に撫子茶 和紙",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 9,
    src: "/gallery/9.jpg",
    title: "9. 大鳥7 鶯",
    description: "人気の大鳥柄の鶯色と紅葉青緑の和紙の組み合わせは、どの矢よりも心落ち着いて射に望む事ができます。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=60",
    specs: {
      material: {
        shaft: "ジュラシャフト 茶",
        fletching: "ターキー 大鳥7 鶯",
        paper: "W084_紅葉青緑 和紙",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 10,
    src: "/gallery/10.jpg",
    title: "10. 花",
    description: "鮮やかな花の柄の羽根を落ち着いた赤い糸で仕上げた矢は、女性らしさを感じる仕上がりになります。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=61",
    specs: {
      material: {
        shaft: "ジュラシャフト 黒",
        fletching: "ターキー 花",
        paper: "F011 糸",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 11,
    src: "/gallery/11.jpg",
    title: "11. 桜",
    description: "羽根にも和紙にも桜の柄を使用した矢は、淡く美しい組み合わせの矢に仕上がります。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=62",
    specs: {
      material: {
        shaft: "ジュラシャフト 茶",
        fletching: "ターキー 桜",
        paper: "W145_桜ピンク 和紙",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 12,
    src: "/gallery/12.jpg",
    title: "12. 黒鷲染め抜き 蛍",
    description: "高級な黒鷲の羽根に咲矢オリジナル柄の蛍の染め抜きを施した羽根を使用する事で、高級感あふれる仕上がりになります。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=63",
    specs: {
      material: {
        shaft: "1913 黒　ジュラシャフト",
        fletching: "ゴマ符 青",
        paper: "F710 糸",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 13,
    src: "/gallery/13.jpg",
    title: "13. だんぶりこ 黄",
    description: "東北で伝統的に使用されるとんぼをモチーフとした縁起の良い柄を、明るく暖かいオレンジに仕上げた矢です。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=64",
    specs: {
      material: {
        shaft: "ジュラシャフト 茶",
        fletching: "ターキー だんぶりこ 黄",
        paper: "F184 糸",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 14,
    src: "/gallery/14.jpg",
    title: "14. グース 冠鷲",
    description: "グースの羽根を近的に使用し、口割りやや飛びで一段上の射を体験する事ができます。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=65",
    specs: {
      material: {
        shaft: "カーボンシャフト WENEW",
        fletching: "グース 冠鷲",
        paper: "F225 糸",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  },
  {
    id: 15,
    src: "/gallery/15.jpg",
    title: "15. 斜閃 カーキ",
    description: "グースの羽根を近的に使用し、口割りやや飛びで一段上の射を体験する事ができます。",
    orderUrl: "https://sakuya-kyudogu.jp/order_made?rid=66",
    specs: {
      material: {
        shaft: "ジュラシャフト 黒",
        fletching: "ターキー 斜閃 カーキ",
        paper: "W107_緑に黒とんぼ 和紙",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  }
];